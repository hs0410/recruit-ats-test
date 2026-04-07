'use client'

import { useState } from 'react'
import {
  FileText, Search, CheckCircle2, XCircle, AlertTriangle,
  Sparkles, Target, ArrowRight, Loader2, RotateCcw,
  TrendingUp, Plus
} from 'lucide-react'

/* ── 저장된 공고 목록 (mock) ── */
const savedJDs = [
  { id: 1, title: '[토스] 프론트엔드 개발자 (3년 이상)' },
  { id: 2, title: '[카카오] 풀스택 엔지니어 (경력)' },
  { id: 3, title: '[네이버] React 개발자 (시니어)' },
]

/* ── JD placeholder ── */
const jdPlaceholder = `예시)

[토스] 프론트엔드 개발자 (3년 이상)

주요업무
- React 기반 웹 서비스 개발 및 유지보수
- TypeScript를 활용한 안정적인 코드 작성
- GraphQL API 연동 및 데이터 관리

자격요건
- React 3년 이상 경험
- TypeScript 능숙
- Next.js 프로젝트 경험

우대사항
- GraphQL 경험
- 팀 리딩 경험`

/* ── 이력서 placeholder ── */
const resumePlaceholder = `예시)

김현수 | 프론트엔드 개발자 | 4년차

경력
- (주)스타트업A (2023.03 ~ 현재) 프론트엔드 개발자
  · React, TypeScript 기반 B2B SaaS 개발
  · Next.js 마이그레이션 리드

기술스택
React, TypeScript, Next.js, Tailwind CSS, Redux, Git

학력
- 00대학교 컴퓨터공학과 (2017 ~ 2021)`

/* ── JD mock 텍스트 ── */
const savedJDTexts: Record<number, string> = {
  1: `[토스] 프론트엔드 개발자 (3년 이상)\n\n주요업무\n- React 기반 웹 서비스 개발\n- TypeScript 활용\n- GraphQL API 연동\n- CI/CD 파이프라인 구축\n- Kubernetes 기반 배포\n\n자격요건\n- React 3년 이상\n- TypeScript 능숙\n- Next.js 경험\n- 팀 리딩 경험`,
  2: `[카카오] 풀스택 엔지니어\n\n주요업무\n- Spring Boot + React 풀스택 개발\n- MSA 아키텍처 설계\n- AWS 인프라 운영\n\n자격요건\n- Java/Kotlin 3년 이상\n- React 2년 이상\n- Docker/Kubernetes 경험`,
  3: `[네이버] React 개발자 (시니어)\n\n주요업무\n- 대규모 React 프로젝트 아키텍처 설계\n- 성능 최적화\n- 주니어 멘토링\n\n자격요건\n- React 5년 이상\n- TypeScript 필수\n- 성능 최적화 경험\n- 기술 리딩 경험`,
}

/* ── 상태 아이콘/색상 매핑 ── */
const statusConfig = {
  met: { icon: CheckCircle2, label: '충족', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  partial: { icon: AlertTriangle, label: '부분충족', color: 'text-amber-600', bg: 'bg-amber-50' },
  unmet: { icon: XCircle, label: '미충족', color: 'text-red-500', bg: 'bg-red-50' },
}

const priorityConfig: Record<string, string> = {
  '높음': 'bg-red-50 text-red-600 border-red-200',
  '중간': 'bg-amber-50 text-amber-600 border-amber-200',
  '낮음': 'bg-slate-50 text-slate-500 border-slate-200',
}

/* ── 원형 프로그레스 SVG ── */
function CircularProgress({ percent }: { percent: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
        <circle cx="90" cy="90" r={radius} stroke="url(#matchGradient)" strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out" />
        <defs>
          <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-foreground">{percent}%</span>
        <span className="text-[13px] text-muted-foreground mt-1">매칭률</span>
      </div>
    </div>
  )
}

/* ── 분석 결과 타입 ── */
interface AnalysisResult {
  matchPercent: number
  grade: string
  summary: string
  requirements: { text: string; status: 'met' | 'partial' | 'unmet'; detail: string }[]
  matchedKeywords: string[]
  missingKeywords: string[]
  recommendedKeywords: { keyword: string; reason: string }[]
  suggestions: { text: string; priority: string }[]
  competitiveness: {
    percentile: string
    comment: string
    improvedPercentile: string
    improvementPoint: string
  }
}

/* ── 메인 페이지 ── */
export default function ResumeCheckPage() {
  const [jdText, setJdText] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [selectedJD, setSelectedJD] = useState<number | ''>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSelectJD = (id: number | '') => {
    setSelectedJD(id)
    if (id !== '') {
      setJdText(savedJDTexts[id] || '')
    }
  }

  const handleAnalyze = async () => {
    if (!jdText.trim() || !resumeText.trim()) return
    setIsAnalyzing(true)
    setResult(null)
    setError(null)

    try {
      const authToken = localStorage.getItem('ats-token') || ''
      const res = await fetch('/api/analyze-resume-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ jd: jdText, resume: resumeText }),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || '분석 중 오류가 발생했습니다.')
      }

      const data: AnalysisResult = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '분석 중 오류가 발생했습니다.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setJdText('')
    setResumeText('')
    setSelectedJD('')
    setResult(null)
    setError(null)
    setIsAnalyzing(false)
  }

  const metCount = result?.requirements?.filter(r => r.status === 'met').length ?? 0
  const totalCount = result?.requirements?.length ?? 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── 헤더 ── */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">공고 맞춤 이력서 분석</h1>
          </div>
          <p className="text-[13px] text-muted-foreground ml-[52px]">
            채용공고와 이력서를 비교하여 AI가 매칭률과 개선점을 분석합니다
          </p>
        </div>

        {/* ── 입력 섹션 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 왼쪽: 채용공고 */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="text-[13px] font-semibold text-foreground">채용공고 붙여넣기</span>
              </div>
              <select
                value={selectedJD}
                onChange={(e) => handleSelectJD(e.target.value ? Number(e.target.value) : '')}
                className="text-[12px] text-muted-foreground bg-transparent border border-border rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-400"
              >
                <option value="">저장된 공고 선택</option>
                {savedJDs.map(jd => (
                  <option key={jd.id} value={jd.id}>{jd.title}</option>
                ))}
              </select>
            </div>
            <textarea
              value={jdText}
              onChange={(e) => { setJdText(e.target.value); setSelectedJD('') }}
              placeholder={jdPlaceholder}
              className="w-full h-[320px] rounded-xl border border-border bg-background text-[13px] text-foreground p-4 resize-none outline-none focus:ring-1 focus:ring-emerald-400 placeholder:text-muted-foreground/50"
            />
          </div>

          {/* 오른쪽: 이력서 */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-600" />
              <span className="text-[13px] font-semibold text-foreground">내 이력서 붙여넣기</span>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={resumePlaceholder}
              className="w-full h-[320px] rounded-xl border border-border bg-background text-[13px] text-foreground p-4 resize-none outline-none focus:ring-1 focus:ring-cyan-400 placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* ── 분석 버튼 ── */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!jdText.trim() || !resumeText.trim() || isAnalyzing}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white font-semibold text-[14px] shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI 분석 중... (약 10초 소요)
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                AI 분석 시작
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* ── 에러 표시 ── */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
            <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-[14px] font-semibold text-red-700">{error}</p>
            <p className="text-[12px] text-red-500 mt-1">다시 시도해주세요.</p>
          </div>
        )}

        {/* ── 분석 결과 ── */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* 종합 매칭률 */}
            <div className="rounded-2xl border border-border bg-card shadow-sm p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <CircularProgress percent={result.matchPercent} />
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-foreground">종합 매칭률</h2>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[13px] font-bold">
                      {result.grade}
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {result.summary}
                  </p>
                  {result.competitiveness && (
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-[13px] text-emerald-600 font-medium">
                        이력서 수정 시 예상: {result.competitiveness.improvedPercentile} ({result.competitiveness.improvementPoint})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* JD 요구사항 충족 분석 */}
            {result.requirements && result.requirements.length > 0 && (
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-[15px] font-bold text-foreground">JD 요구사항 충족 분석</h3>
                  <span className="text-[12px] text-muted-foreground ml-auto">
                    {metCount}/{totalCount} 충족
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.requirements.map((req, i) => {
                    const cfg = statusConfig[req.status] || statusConfig.unmet
                    const Icon = cfg.icon
                    return (
                      <div key={i} className={`rounded-xl px-4 py-3 ${cfg.bg} border border-transparent`}>
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
                          <span className="text-[13px] text-foreground flex-1">{req.text}</span>
                          <span className={`text-[11px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                        </div>
                        {req.detail && (
                          <p className="text-[11px] text-muted-foreground mt-1 ml-7">{req.detail}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 키워드 매칭 */}
            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 space-y-6">
              <div className="flex items-center gap-2 mb-1">
                <Search className="w-5 h-5 text-cyan-600" />
                <h3 className="text-[15px] font-bold text-foreground">키워드 매칭</h3>
              </div>

              {result.matchedKeywords && result.matchedKeywords.length > 0 && (
                <div>
                  <p className="text-[12px] text-muted-foreground mb-2">이력서에 포함된 JD 키워드</p>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedKeywords.map(kw => (
                      <span key={kw} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[12px] font-medium border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <div>
                  <p className="text-[12px] text-muted-foreground mb-2">이력서에 빠진 핵심 키워드</p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map(kw => (
                      <span key={kw} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-[12px] font-medium border border-red-200">
                        <Plus className="w-3 h-3" />{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.recommendedKeywords && result.recommendedKeywords.length > 0 && (
                <div>
                  <p className="text-[12px] text-muted-foreground mb-3">추가하면 좋을 키워드 TOP {result.recommendedKeywords.length}</p>
                  <div className="space-y-2">
                    {result.recommendedKeywords.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-background border border-border px-4 py-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <span className="text-[13px] font-semibold text-foreground">{item.keyword}</span>
                          <p className="text-[12px] text-muted-foreground mt-0.5">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI 이력서 수정 제안 */}
            {result.suggestions && result.suggestions.length > 0 && (
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-[15px] font-bold text-foreground">AI 이력서 수정 제안</h3>
                </div>
                <div className="space-y-3">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-background border border-border px-4 py-3">
                      <span className={`flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold border ${priorityConfig[s.priority] || priorityConfig['낮음']}`}>
                        {s.priority}
                      </span>
                      <p className="text-[13px] text-foreground leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 경쟁력 요약 */}
            {result.competitiveness && (
              <div className="rounded-2xl border border-border bg-gradient-to-r from-emerald-50 to-cyan-50 shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-foreground">경쟁력 요약</h3>
                    <p className="text-[13px] text-muted-foreground mt-1">
                      이 공고에 지원 시 <span className="text-emerald-600 font-semibold">{result.competitiveness.percentile}</span> 수준으로 예상됩니다.{' '}
                      {result.competitiveness.comment}{' '}
                      이력서 수정 시 <span className="text-emerald-600 font-semibold">{result.competitiveness.improvedPercentile}</span>까지 올라갈 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 새로운 분석 버튼 */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl border border-border bg-card text-[13px] font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                새로운 분석하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
