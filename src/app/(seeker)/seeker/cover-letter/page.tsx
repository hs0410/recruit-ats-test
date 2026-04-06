'use client'

import { useState, useEffect } from 'react'
import {
  FileText,
  Sparkles,
  PenTool,
  Star,
  Copy,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  BookOpen,
  Target,
} from 'lucide-react'

/* ────────────────────────────────────────
   AI 자기소개서 코치
   구직자가 자기소개서를 작성하고 개선할 수 있도록 지원
   ──────────────────────────────────────── */

type Mode = 'write' | 'feedback'
type QuestionType = '지원 동기' | '직무 역량' | '입사 후 포부' | '협업 경험' | '문제 해결 경험'
type ToneType = '스타트업용' | '대기업용' | '외국계용'
type CharTarget = 500 | 700 | 1000

interface SavedLetter {
  id: number
  title: string
  date: string
  charCount: number
}

interface SentenceFeedback {
  original: string
  suggestion: string
}

interface KeywordStatus {
  word: string
  included: boolean
}

const questionOptions: QuestionType[] = ['지원 동기', '직무 역량', '입사 후 포부', '협업 경험', '문제 해결 경험']
const toneOptions: ToneType[] = ['스타트업용', '대기업용', '외국계용']
const charTargets: CharTarget[] = [500, 700, 1000]

const savedLetters: SavedLetter[] = [
  { id: 1, title: '토스 프론트엔드 - 지원 동기', date: '2026-04-01', charCount: 687 },
  { id: 2, title: '카카오 백엔드 - 직무 역량', date: '2026-03-28', charCount: 542 },
  { id: 3, title: '라인 PM - 입사 후 포부', date: '2026-03-20', charCount: 723 },
]

const mockGeneratedLetter = `저는 디지털 전환의 흐름 속에서 사용자 경험을 최우선으로 생각하는 서비스에 기여하고 싶다는 강한 열망을 가지고 있습니다. 특히 귀사가 추구하는 '불편함을 없애는 금융'이라는 비전에 깊이 공감하며, 이를 기술로 실현하는 과정에 함께하고 싶어 지원하게 되었습니다.

대학 시절 동아리에서 교내 학사 정보 앱을 개발하며 5,000명 이상의 사용자를 확보한 경험이 있습니다. 이 과정에서 사용자 피드백을 분석하고 UI/UX를 개선하여 일일 활성 사용자 수를 3배 증가시켰습니다. 이 경험을 통해 데이터 기반의 의사결정과 빠른 이터레이션의 중요성을 체감했습니다.

또한 인턴십 기간 동안 React와 TypeScript를 활용한 프론트엔드 개발 경험을 쌓았으며, 팀 내에서 코드 리뷰 문화를 도입하여 버그 발생률을 30% 줄이는 데 기여했습니다. 이러한 경험들이 귀사의 빠르게 성장하는 서비스 환경에서 즉시 기여할 수 있는 역량이 될 것이라 확신합니다.`

const mockCategoryScores = [
  { label: '두괄식 구조', stars: 4 },
  { label: '구체성/정량적 근거', stars: 3 },
  { label: '직무 연관성', stars: 5 },
  { label: '문장력/가독성', stars: 4 },
  { label: '차별화/독창성', stars: 3 },
]

const mockSentenceFeedbacks: SentenceFeedback[] = [
  {
    original: '저는 다양한 경험을 통해 성장해 왔습니다.',
    suggestion: "이 부분은 너무 추상적입니다 → '매출 20% 성장에 기여'처럼 구체적 수치를 넣어보세요",
  },
  {
    original: '팀워크를 잘하는 편입니다.',
    suggestion: "'3명의 팀원과 스프린트 단위로 협업하여 2주 만에 배포'와 같이 구체적 상황을 묘사하세요",
  },
  {
    original: '열정을 가지고 일하겠습니다.',
    suggestion: "열정보다는 '주 1회 기술 블로그 작성, 월 2회 오픈소스 기여' 등 행동 계획으로 대체하세요",
  },
]

const mockKeywords: KeywordStatus[] = [
  { word: 'React', included: true },
  { word: 'TypeScript', included: true },
  { word: '사용자 경험', included: true },
  { word: '데이터 분석', included: false },
  { word: 'Agile', included: false },
  { word: 'CI/CD', included: false },
  { word: '성과 지표', included: true },
  { word: 'A/B 테스트', included: false },
]

const mockImprovements = [
  '전체적으로 구체적인 수치와 성과를 더 많이 포함하면 설득력이 크게 향상됩니다.',
  '지원 공고에 언급된 핵심 기술 키워드(Agile, CI/CD)를 자연스럽게 녹여주세요.',
  '마지막 문단에 입사 후 구체적인 기여 계획을 추가하면 차별화됩니다.',
]

/* ── 별점 렌더링 ── */
function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </span>
  )
}

/* ── 원형 진행률 ── */
function CircularProgress({ score, size = 96 }: { score: number; size?: number }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-bold" style={{ color }}>{score}</span>
        <span className="text-[11px] text-muted-foreground">/100</span>
      </div>
    </div>
  )
}

export default function CoverLetterCoachPage() {
  const [mode, setMode] = useState<Mode>('write')

  /* ── 새로 작성 state ── */
  const [jobPosting, setJobPosting] = useState('')
  const [resumeSummary, setResumeSummary] = useState('')
  const [question, setQuestion] = useState<QuestionType>('지원 동기')
  const [tone, setTone] = useState<ToneType>('스타트업용')
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  /* ── 피드백 state ── */
  const [letterText, setLetterText] = useState('')
  const [feedbackJobPosting, setFeedbackJobPosting] = useState('')
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)
  const [feedbackResult, setFeedbackResult] = useState(false)

  /* ── 글자수 카운터 ── */
  const [charTarget, setCharTarget] = useState<CharTarget>(700)

  const activeText = mode === 'write' ? generatedLetter : letterText
  const currentCharCount = activeText.length

  /* ── 핸들러 ── */
  const handleGenerate = () => {
    setIsGenerating(true)
    setGeneratedLetter('')
    setTimeout(() => {
      setGeneratedLetter(mockGeneratedLetter)
      setIsGenerating(false)
    }, 1500)
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = () => {
    setIsFeedbackLoading(true)
    setFeedbackResult(false)
    setTimeout(() => {
      setFeedbackResult(true)
      setIsFeedbackLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* ── 헤더 ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] px-4 py-1.5 text-[12px] font-medium text-white mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            AI 코치
          </div>
          <h1 className="text-2xl font-bold text-foreground">AI 자기소개서 코치</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            AI가 자기소개서 작성을 도와드립니다. 맞춤형 초안 생성부터 상세 피드백까지.
          </p>
        </div>

        <div className="flex gap-6">
          {/* ── 메인 영역 ── */}
          <div className="flex-1 space-y-6">
            {/* 모드 선택 탭 */}
            <div className="flex gap-1 rounded-2xl bg-card border border-border p-1.5 shadow-sm">
              <button
                onClick={() => setMode('write')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all ${
                  mode === 'write'
                    ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <PenTool className="h-4 w-4" />
                새로 작성
              </button>
              <button
                onClick={() => setMode('feedback')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all ${
                  mode === 'feedback'
                    ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                기존 자소서 피드백
              </button>
            </div>

            {/* ── 새로 작성 모드 ── */}
            {mode === 'write' && (
              <div className="space-y-5">
                {/* 입력 카드 */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                      <Target className="mr-1.5 inline h-4 w-4 text-emerald-500" />
                      공고 내용
                    </label>
                    <textarea
                      value={jobPosting}
                      onChange={(e) => setJobPosting(e.target.value)}
                      placeholder="채용 공고의 주요 내용을 붙여넣으세요 (직무 설명, 자격 요건, 우대 사항 등)"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                      <BookOpen className="mr-1.5 inline h-4 w-4 text-emerald-500" />
                      내 이력서 요약
                    </label>
                    <textarea
                      value={resumeSummary}
                      onChange={(e) => setResumeSummary(e.target.value)}
                      placeholder="핵심 경력, 기술 스택, 주요 성과를 간단히 정리해주세요"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-foreground">문항 선택</label>
                      <select
                        value={question}
                        onChange={(e) => setQuestion(e.target.value as QuestionType)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      >
                        {questionOptions.map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-medium text-foreground">톤 선택</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value as ToneType)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      >
                        {toneOptions.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#06b6d4] px-6 py-3 text-[13px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {isGenerating ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        AI 초안 생성
                      </>
                    )}
                  </button>
                </div>

                {/* 생성 결과 카드 */}
                {generatedLetter && (
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[14px] font-semibold text-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-500" />
                        생성된 자기소개서
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                          {generatedLetter.length}자
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-muted/40 p-4 text-[13px] leading-relaxed text-foreground whitespace-pre-wrap">
                      {generatedLetter}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-[13px] font-medium text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            복사
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-[13px] font-medium text-foreground hover:bg-muted/50 transition-colors disabled:opacity-60"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        다시 생성
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── 피드백 모드 ── */}
            {mode === 'feedback' && (
              <div className="space-y-5">
                {/* 입력 카드 */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                      <FileText className="mr-1.5 inline h-4 w-4 text-emerald-500" />
                      자기소개서
                    </label>
                    <textarea
                      value={letterText}
                      onChange={(e) => setLetterText(e.target.value)}
                      placeholder="자기소개서를 붙여넣으세요"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                      rows={8}
                    />
                    <div className="mt-1.5 text-right text-[11px] text-muted-foreground">
                      {letterText.length}자
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                      <Target className="mr-1.5 inline h-4 w-4 text-cyan-500" />
                      지원 공고 <span className="text-muted-foreground font-normal">(선택)</span>
                    </label>
                    <textarea
                      value={feedbackJobPosting}
                      onChange={(e) => setFeedbackJobPosting(e.target.value)}
                      placeholder="공고 내용을 넣으면 직무 연관성까지 분석합니다"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none"
                      rows={3}
                    />
                  </div>

                  <button
                    onClick={handleFeedback}
                    disabled={isFeedbackLoading || !letterText.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#06b6d4] px-6 py-3 text-[13px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {isFeedbackLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        분석 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        AI 피드백 받기
                      </>
                    )}
                  </button>
                </div>

                {/* 피드백 결과 */}
                {feedbackResult && (
                  <div className="space-y-5">
                    {/* 종합 점수 + 항목별 평가 */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <h3 className="mb-5 text-[14px] font-semibold text-foreground flex items-center gap-2">
                        <Target className="h-4 w-4 text-emerald-500" />
                        종합 평가
                      </h3>
                      <div className="flex gap-8">
                        <div className="flex flex-col items-center gap-2">
                          <CircularProgress score={75} />
                          <span className="text-[12px] font-medium text-muted-foreground">종합 점수</span>
                        </div>
                        <div className="flex-1 space-y-2.5">
                          {mockCategoryScores.map((cat) => (
                            <div key={cat.label} className="flex items-center justify-between">
                              <span className="text-[13px] text-foreground">{cat.label}</span>
                              <Stars count={cat.stars} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 문장별 피드백 */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <h3 className="mb-4 text-[14px] font-semibold text-foreground flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        문장별 피드백
                      </h3>
                      <div className="space-y-3">
                        {mockSentenceFeedbacks.map((fb, i) => (
                          <div key={i} className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 p-4 space-y-2">
                            <p className="text-[13px] text-foreground font-medium line-through decoration-amber-400 decoration-2">
                              &ldquo;{fb.original}&rdquo;
                            </p>
                            <p className="text-[12px] text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                              <MessageSquare className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                              {fb.suggestion}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 핵심 키워드 하이라이트 */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <h3 className="mb-4 text-[14px] font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-cyan-500" />
                        핵심 키워드 분석
                      </h3>
                      <p className="mb-3 text-[12px] text-muted-foreground">
                        JD에서 추출한 키워드 중 자소서 포함 여부
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mockKeywords.map((kw) => (
                          <span
                            key={kw.word}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-medium ${
                              kw.included
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/30'
                                : 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/30'
                            }`}
                          >
                            {kw.included ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <AlertTriangle className="h-3 w-3" />
                            )}
                            {kw.word}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI 보완 제안 */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <h3 className="mb-4 text-[14px] font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        AI 보완 제안
                      </h3>
                      <div className="space-y-2.5">
                        {mockImprovements.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20 border border-emerald-100 dark:border-emerald-800/20 p-3.5">
                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-[11px] font-bold text-white">
                              {i + 1}
                            </span>
                            <p className="text-[13px] text-foreground leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── 사이드바 ── */}
          <div className="w-64 flex-shrink-0 space-y-5">
            {/* 글자수 카운터 */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-[13px] font-semibold text-foreground">글자수 카운터</h3>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[22px] font-bold text-foreground">{currentCharCount}</span>
                  <span className="text-[13px] text-muted-foreground">/ {charTarget}자</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] transition-all duration-300"
                    style={{ width: `${Math.min((currentCharCount / charTarget) * 100, 100)}%` }}
                  />
                </div>
                {currentCharCount > charTarget && (
                  <p className="mt-1.5 text-[11px] text-red-500 font-medium">
                    {currentCharCount - charTarget}자 초과
                  </p>
                )}
              </div>
              <div className="flex gap-1.5">
                {charTargets.map((t) => (
                  <button
                    key={t}
                    onClick={() => setCharTarget(t)}
                    className={`flex-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
                      charTarget === t
                        ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t}자
                  </button>
                ))}
              </div>
            </div>

            {/* 저장된 자소서 */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-[13px] font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                저장된 자소서
              </h3>
              <div className="space-y-2">
                {savedLetters.map((letter) => (
                  <button
                    key={letter.id}
                    className="w-full rounded-xl border border-border bg-background p-3 text-left transition-colors hover:bg-muted/50"
                  >
                    <p className="text-[12px] font-medium text-foreground truncate">{letter.title}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{letter.date}</span>
                      <span className="text-[11px] text-muted-foreground">{letter.charCount}자</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
