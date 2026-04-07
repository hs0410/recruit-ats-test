import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { isValidToken } from '@/lib/auth'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const SYSTEM_PROMPT = `당신은 10년 경력의 시니어 채용 컨설턴트입니다. 채용공고(JD)와 이력서를 비교 분석하여 매칭률을 산출합니다.

## 분석 방법
1. 채용공고에서 요구사항(필수/우대)을 추출합니다
2. 이력서에서 해당 요구사항의 충족 여부를 판단합니다
3. 키워드 매칭을 분석합니다
4. 구체적인 개선 제안을 제시합니다

## 점수 기준
- 매칭률은 실제 충족도를 반영하여 현실적으로 산출하세요
- 필수 요구사항 미충족 시 큰 감점
- 우대사항은 가점 요소로 처리
- 절대로 점수를 후하게 주지 마세요

## 출력 형식 (반드시 JSON만 출력)

{
  "matchPercent": 0~100,
  "grade": "S|A+|A|B+|B|C+|C|D",
  "summary": "2-3문장 종합 요약",
  "requirements": [
    { "text": "요구사항 내용", "status": "met|partial|unmet", "detail": "판단 근거 1문장" }
  ],
  "matchedKeywords": ["이력서에 포함된 JD 키워드"],
  "missingKeywords": ["이력서에 빠진 핵심 키워드"],
  "recommendedKeywords": [
    { "keyword": "키워드명", "reason": "추가해야 하는 이유 1문장" }
  ],
  "suggestions": [
    { "text": "구체적 이력서 수정 제안", "priority": "높음|중간|낮음" }
  ],
  "competitiveness": {
    "percentile": "상위 XX%",
    "comment": "경쟁력 분석 2문장",
    "improvedPercentile": "수정 후 예상 상위 XX%",
    "improvementPoint": "+XX%p"
  }
}`

export async function POST(request: NextRequest) {
  // 토큰 검증
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token || !isValidToken(token)) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  // Rate Limit (IP당 분당 10회)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json({ error: '요청이 너무 많습니다. 1분 후 다시 시도해주세요.' }, { status: 429 })
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const { jd, resume } = await request.json()

    if (!jd || jd.trim().length < 10) {
      return NextResponse.json({ error: '채용공고 내용이 너무 짧습니다.' }, { status: 400 })
    }
    if (!resume || resume.trim().length < 10) {
      return NextResponse.json({ error: '이력서 내용이 너무 짧습니다.' }, { status: 400 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: SYSTEM_PROMPT },
                { text: `아래 채용공고와 이력서를 비교 분석해주세요.\n\n=== 채용공고 ===\n${jd}\n\n=== 이력서 ===\n${resume}` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', errorData)
      return NextResponse.json({ error: 'AI 분석 중 오류가 발생했습니다.' }, { status: 500 })
    }

    const data = await response.json()
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!resultText) {
      return NextResponse.json({ error: 'AI 응답을 받지 못했습니다.' }, { status: 500 })
    }

    const analysis = JSON.parse(resultText)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Resume match analysis error:', error)
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
