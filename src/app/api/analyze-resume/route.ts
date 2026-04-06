import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const SYSTEM_PROMPT = `당신은 채용 전문가 AI입니다. 이력서 텍스트를 분석하여 아래 JSON 형식으로 정확히 응답하세요.
반드시 JSON만 출력하고, 다른 텍스트는 포함하지 마세요.

{
  "name": "이름",
  "currentCompany": "현재 회사 (없으면 '미기재')",
  "currentRole": "현재 직무",
  "yearsOfExperience": 숫자,
  "education": "최종학력 (예: 서울대학교 컴퓨터공학과 학사)",
  "summary": "2-3문장 요약",
  "skills": [
    { "name": "기술명", "level": "expert|advanced|intermediate|beginner" }
  ],
  "radar": [
    { "label": "기술력", "value": 0~100 },
    { "label": "경력", "value": 0~100 },
    { "label": "리더십", "value": 0~100 },
    { "label": "커뮤니케이션", "value": 0~100 },
    { "label": "문화적합도", "value": 0~100 },
    { "label": "성장가능성", "value": 0~100 }
  ],
  "strengths": ["강점1", "강점2", "강점3", "강점4"],
  "weaknesses": ["보완점1", "보완점2", "보완점3"],
  "aiComment": "종합 평가 (3-4문장)"
}

분석 기준:
- skills의 level은 해당 기술의 언급 빈도, 프로젝트 경험, 숙련도 설명을 기반으로 판단
- radar 값은 이력서 내용을 기반으로 객관적으로 평가 (0~100)
- strengths는 채용담당자 관점에서 눈에 띄는 강점
- weaknesses는 부족하거나 보완이 필요한 부분
- aiComment는 채용담당자에게 도움이 되는 종합 의견
- 이력서에 정보가 부족하면 추론하되, 추론임을 명시하지 말 것`

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const { text } = await request.json()

    if (!text || text.trim().length < 10) {
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
                { text: `다음 이력서를 분석해주세요:\n\n${text}` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
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
    console.error('Resume analysis error:', error)
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
