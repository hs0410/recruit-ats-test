'use client'

import { useState } from 'react'
import { Upload, FileText, Sparkles, CheckCircle2, AlertTriangle, Clipboard, X, Loader2, Info, BarChart3 } from 'lucide-react'
import { mockAnalysisResults, skillLevelConfig } from '@/lib/resume-analysis'

/* ── 타입 정의 ── */
interface RadarItem {
  label: string
  value: number
  basis?: string
}

interface AnalysisResult {
  name: string
  currentCompany: string
  currentRole: string
  yearsOfExperience: number
  education: string
  summary: string
  skills: { name: string; level: string }[]
  radar: RadarItem[]
  positionAverage?: RadarItem[]
  positionLabel?: string
  strengths: string[]
  weaknesses: string[]
  aiComment: string
  overallGrade?: string
  gradeComment?: string
}

/* ── 등급 배지 색상 ── */
const gradeConfig: Record<string, { bg: string; text: string; label: string }> = {
  S: { bg: 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]', text: 'text-white', label: '최우수' },
  A: { bg: 'bg-gradient-to-r from-[#3182f6] to-[#60a5fa]', text: 'text-white', label: '우수' },
  B: { bg: 'bg-[#10b981]', text: 'text-white', label: '양호' },
  C: { bg: 'bg-[#f59e0b]', text: 'text-white', label: '보통' },
  D: { bg: 'bg-[#ef4444]', text: 'text-white', label: '미흡' },
}

/* ── 레이더 차트 (포지션 평균 오버레이 지원) ── */
function RadarChart({ data, average }: { data: RadarItem[]; average?: RadarItem[] }) {
  const size = 260
  const center = size / 2
  const radius = 95
  const angleStep = (2 * Math.PI) / data.length
  const levels = [20, 40, 60, 80, 100]

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2
    const r = (value / 100) * radius
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
  }

  const dataPoints = data.map((d, i) => getPoint(i, d.value))
  const pathD = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  let avgPathD = ''
  if (average) {
    const avgPoints = average.map((d, i) => getPoint(i, d.value))
    avgPathD = avgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {levels.map((level) => {
        const points = data.map((_, i) => getPoint(i, level))
        const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return <path key={level} d={d} fill="none" stroke="#e5e8eb" strokeWidth="1" />
      })}
      {data.map((_, i) => {
        const p = getPoint(i, 100)
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e5e8eb" strokeWidth="1" />
      })}
      {/* 포지션 평균 영역 (회색) */}
      {average && (
        <path d={avgPathD} fill="rgba(156, 163, 175, 0.12)" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6 3" />
      )}
      {/* 지원자 데이터 영역 */}
      <path d={pathD} fill="rgba(49, 130, 246, 0.15)" stroke="#3182f6" strokeWidth="2.5" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3182f6" />
      ))}
      {data.map((d, i) => {
        const p = getPoint(i, 125)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fill="#8b95a1" fontWeight="600">
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}

/* ── 비교 바 차트 ── */
function ComparisonBar({ label, value, avg, basis }: { label: string; value: number; avg: number; basis?: string }) {
  const [showBasis, setShowBasis] = useState(false)
  const diff = value - avg
  const diffColor = diff > 0 ? 'text-primary' : diff < 0 ? 'text-danger' : 'text-muted'
  const diffSign = diff > 0 ? '+' : ''

  return (
    <div className="mb-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-foreground">{label}</span>
          {basis && (
            <button onClick={() => setShowBasis(!showBasis)} className="text-muted hover:text-primary transition-colors">
              <Info size={13} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-bold text-foreground">{value}점</span>
          <span className={`text-[11px] font-bold ${diffColor}`}>
            ({diffSign}{diff} vs 평균)
          </span>
        </div>
      </div>
      {/* 바 */}
      <div className="relative h-3 bg-card-hover rounded-full overflow-hidden">
        {/* 평균 마커 */}
        <div className="absolute top-0 h-full w-0.5 bg-muted/40 z-10" style={{ left: `${avg}%` }} />
        {/* 지원자 점수 */}
        <div
          className="absolute top-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            background: value >= 70 ? 'linear-gradient(90deg, #3182f6, #60a5fa)' :
                         value >= 50 ? 'linear-gradient(90deg, #10b981, #6ee7b7)' :
                         value >= 30 ? 'linear-gradient(90deg, #f59e0b, #fcd34d)' :
                                       'linear-gradient(90deg, #ef4444, #fca5a5)'
          }}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-[9px] text-muted">0</span>
        <span className="text-[9px] text-muted/60">평균 {avg}점</span>
        <span className="text-[9px] text-muted">100</span>
      </div>
      {/* 근거 */}
      {showBasis && basis && (
        <div className="mt-1.5 bg-primary-light/50 rounded-lg px-3 py-2 text-[11px] text-foreground/80 leading-relaxed">
          💡 {basis}
        </div>
      )}
    </div>
  )
}

/* ── 메인 페이지 ── */
export default function ResumePage() {
  const [inputMode, setInputMode] = useState<'upload' | 'text'>('text')
  const [textInput, setTextInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [selectedDemo, setSelectedDemo] = useState('')
  const [error, setError] = useState('')

  const analyzeWithAI = async (text: string) => {
    setAnalyzing(true)
    setError('')
    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '분석 실패')
      }
      const analysis = await res.json()
      setResult(analysis)
    } catch (e: any) {
      setError(e.message || '분석 중 오류가 발생했습니다.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleAnalyze = (key?: string) => {
    const demoKey = key || selectedDemo || 'backend'
    const demoData = mockAnalysisResults[demoKey]
    if (demoData) {
      const demoText = `이름: ${demoData.name}\n현재 회사: ${demoData.currentCompany}\n직무: ${demoData.currentRole}\n경력: ${demoData.yearsOfExperience}년\n학력: ${demoData.education}\n요약: ${demoData.summary}\n기술: ${demoData.skills.map((s: any) => s.name).join(', ')}`
      analyzeWithAI(demoText)
    }
  }

  const handleFileUpload = () => {
    handleAnalyze('backend')
  }

  const handleTextAnalyze = () => {
    if (!textInput.trim()) return
    analyzeWithAI(textInput)
  }

  /* ── 분석 결과 화면 ── */
  if (result && !analyzing) {
    const grade = result.overallGrade ? gradeConfig[result.overallGrade] : null
    const avgData = result.positionAverage || result.radar.map(r => ({ label: r.label, value: 50 }))
    const avgLabel = result.positionLabel || `${result.currentRole} ${result.yearsOfExperience}년차 평균`

    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              AI 이력서 분석 결과
            </h1>
          </div>
          <button
            onClick={() => setResult(null)}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-muted bg-card-hover px-4 py-2 rounded-xl hover:text-foreground transition-colors border border-border"
          >
            <X size={14} />
            새 분석
          </button>
        </div>

        {/* 프로필 요약 + 종합 등급 */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-5">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#8b5cf6] flex items-center justify-center text-white text-[24px] font-bold flex-shrink-0">
              {result.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-[20px] font-bold text-foreground">{result.name}</h2>
                {grade && (
                  <span className={`${grade.bg} ${grade.text} text-[12px] font-bold px-3 py-1 rounded-full`}>
                    {result.overallGrade}등급 · {grade.label}
                  </span>
                )}
              </div>
              <p className="text-[14px] text-muted mt-0.5">{result.currentRole} @ {result.currentCompany}</p>
              <div className="flex gap-4 mt-3">
                <span className="text-[12px] font-semibold text-primary bg-primary-light px-3 py-1 rounded-full">
                  경력 {result.yearsOfExperience}년
                </span>
                <span className="text-[12px] font-semibold text-[#6366f1] bg-[#eef2ff] px-3 py-1 rounded-full">
                  {result.education}
                </span>
              </div>
            </div>
          </div>
          <p className="text-[13px] text-muted mt-4 leading-relaxed bg-card-hover rounded-xl p-4">
            {result.summary}
          </p>
          {result.gradeComment && (
            <p className="text-[12px] text-foreground/70 mt-2 px-4 italic">
              → {result.gradeComment}
            </p>
          )}
        </div>

        <div className="grid grid-cols-5 gap-5 mb-5">
          {/* 레이더 차트 + 범례 */}
          <div className="col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h3 className="text-[15px] font-bold text-foreground mb-1">역량 분석</h3>
            <p className="text-[11px] text-muted mb-4">vs {avgLabel}</p>
            <div className="flex justify-center">
              <RadarChart data={result.radar} average={avgData} />
            </div>
            {/* 범례 */}
            <div className="flex justify-center gap-6 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] text-muted font-semibold">지원자</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-muted/30 border border-muted/40" />
                <span className="text-[10px] text-muted font-semibold">포지션 평균</span>
              </div>
            </div>
          </div>

          {/* 항목별 상세 비교 (바 차트 + 근거) */}
          <div className="col-span-3 bg-card rounded-2xl border border-border p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} className="text-primary" />
              <h3 className="text-[15px] font-bold text-foreground">항목별 상세 평가</h3>
            </div>
            {result.radar.map((r, i) => (
              <ComparisonBar
                key={r.label}
                label={r.label}
                value={r.value}
                avg={avgData[i]?.value || 50}
                basis={r.basis}
              />
            ))}
            <p className="text-[10px] text-muted/60 mt-2">
              ℹ️ 각 항목 옆 아이콘(i)을 클릭하면 점수 산정 근거를 확인할 수 있습니다
            </p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-5">
          <h3 className="text-[15px] font-bold text-foreground mb-4">기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => {
              const config = skillLevelConfig[skill.level as keyof typeof skillLevelConfig] || skillLevelConfig.intermediate
              return (
                <span key={skill.name} className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${config.bg} ${config.text}`}>
                  {skill.name}
                  <span className="ml-1.5 opacity-60">{config.label}</span>
                </span>
              )
            })}
          </div>
          <div className="flex gap-4 mt-5 pt-4 border-t border-border/60">
            {Object.entries(skillLevelConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${config.bg} border ${config.text.replace('text-', 'border-')}`} />
                <span className="text-[10px] text-muted">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* 강점 */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h3 className="text-[15px] font-bold text-success flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} />
              강점
            </h3>
            <div className="space-y-2.5">
              {result.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] text-foreground">
                  <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* 보완점 */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h3 className="text-[15px] font-bold text-[#f59e0b] flex items-center gap-2 mb-4">
              <AlertTriangle size={16} />
              보완점
            </h3>
            <div className="space-y-2.5">
              {result.weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] text-foreground">
                  <span className="text-[#f59e0b] mt-0.5 flex-shrink-0">!</span>
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI 코멘트 */}
        <div className="bg-gradient-to-r from-primary-light to-[#eef2ff] rounded-2xl p-6 border border-primary/10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-primary" />
            <h3 className="text-[14px] font-bold text-foreground">AI 종합 평가</h3>
          </div>
          <p className="text-[13px] text-foreground leading-relaxed">{result.aiComment}</p>
        </div>
      </div>
    )
  }

  /* ── 입력 화면 ── */
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          AI 이력서 분석
        </h1>
        <p className="text-[14px] text-muted mt-1">이력서를 업로드하거나 붙여넣으면 AI가 엄격한 기준으로 분석합니다</p>
      </div>

      {/* 입력 모드 선택 */}
      <div className="flex gap-1 mb-6 bg-card-hover rounded-xl p-1 max-w-md">
        <button
          onClick={() => setInputMode('upload')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            inputMode === 'upload' ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
          }`}
        >
          <Upload size={14} />
          파일 업로드
        </button>
        <button
          onClick={() => setInputMode('text')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            inputMode === 'text' ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
          }`}
        >
          <Clipboard size={14} />
          텍스트 입력
        </button>
      </div>

      {inputMode === 'upload' ? (
        <div
          onClick={handleFileUpload}
          className="bg-card rounded-2xl border-2 border-dashed border-border p-16 text-center shadow-soft cursor-pointer hover:border-primary/40 hover:bg-primary-light/30 transition-all"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-[#8b5cf6]/10 flex items-center justify-center mx-auto mb-5">
            <Upload size={28} className="text-primary" />
          </div>
          <p className="text-[16px] font-bold text-foreground mb-1">이력서 파일을 드래그하거나 클릭하세요</p>
          <p className="text-[13px] text-muted">PDF, DOC, DOCX 지원 · 최대 10MB</p>
          <p className="text-[11px] text-muted/60 mt-3">* 현재 데모 버전으로, 클릭 시 샘플 분석 결과를 보여줍니다</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={12}
            className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder={`이력서 내용을 자유롭게 붙여넣으세요.\n\n아래 정보가 포함되면 더 정확한 분석이 가능합니다:\n• 이름, 현재 직무, 경력 연차\n• 회사명 및 담당 업무\n• 주요 성과 (정량적 수치 포함 시 유리)\n• 기술 스택 / 자격증\n• 학력\n\n예시:\n홍길동 | 프론트엔드 개발자 5년차\n현재: 토스 프론트엔드팀\n주요성과: 디자인시스템 구축으로 개발 생산성 30% 향상\n기술: React, TypeScript, Next.js, Figma`}
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-[11px] text-muted">
              {textInput.length > 0 ? `${textInput.length}자 입력됨` : ''}
            </p>
            <button
              onClick={handleTextAnalyze}
              disabled={!textInput.trim()}
              className="bg-gradient-to-r from-primary to-[#8b5cf6] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles size={14} />
              AI 분석 시작
            </button>
          </div>
        </div>
      )}

      {/* 데모 샘플 */}
      <div className="mt-8">
        <p className="text-[13px] font-semibold text-foreground mb-3">샘플 이력서로 체험해보기</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'backend', name: '김현수', role: '백엔드 개발자 · 3년차', company: '네이버 클라우드' },
            { key: 'frontend', name: '박서준', role: '프론트엔드 개발자 · 4년차', company: '토스' },
            { key: 'pm', name: '한소희', role: 'Product Manager · 6년차', company: '카카오' },
          ].map((demo) => (
            <button
              key={demo.key}
              onClick={() => { setSelectedDemo(demo.key); handleAnalyze(demo.key) }}
              className="bg-card rounded-xl border border-border p-4 shadow-soft hover-lift text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-[#8b5cf6]/10 flex items-center justify-center">
                  <FileText size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground">{demo.name}</p>
                  <p className="text-[11px] text-muted">{demo.role}</p>
                  <p className="text-[10px] text-muted/60">{demo.company}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 분석 기준 안내 */}
      <div className="mt-6 bg-card-hover rounded-2xl p-5 border border-border/60">
        <h4 className="text-[12px] font-bold text-foreground mb-2 flex items-center gap-2">
          <Info size={14} className="text-primary" />
          AI 분석 기준 안내
        </h4>
        <div className="grid grid-cols-3 gap-4 text-[11px] text-muted leading-relaxed">
          <div>
            <span className="font-semibold text-foreground">엄격한 채점 기준</span>
            <p className="mt-0.5">업계 시니어 채용컨설턴트 수준의 엄격한 기준을 적용합니다. 90점 이상은 TOP 5%에만 부여됩니다.</p>
          </div>
          <div>
            <span className="font-semibold text-foreground">포지션 평균 비교</span>
            <p className="mt-0.5">동일 직군/연차의 일반적인 지원자 평균 대비 어디에 위치하는지 비교 분석합니다.</p>
          </div>
          <div>
            <span className="font-semibold text-foreground">근거 기반 평가</span>
            <p className="mt-0.5">각 항목마다 점수 산정 근거를 제공합니다. 결과 화면에서 (i) 아이콘을 클릭해 확인하세요.</p>
          </div>
        </div>
      </div>

      {/* 에러 */}
      {error && (
        <div className="mt-4 bg-danger-light border border-danger/20 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-danger flex-shrink-0" />
          <p className="text-[13px] text-danger font-semibold">{error}</p>
        </div>
      )}

      {/* 로딩 */}
      {analyzing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-8 shadow-soft-lg text-center">
            <Loader2 size={32} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-[16px] font-bold text-foreground">AI가 이력서를 분석하고 있습니다</p>
            <p className="text-[12px] text-muted mt-1">엄격한 기준으로 정밀 분석 중...</p>
          </div>
        </div>
      )}
    </div>
  )
}
