'use client'

import { useState } from 'react'
import { Upload, FileText, Sparkles, ChevronDown, CheckCircle2, AlertTriangle, Clipboard, X, Loader2 } from 'lucide-react'
import { mockAnalysisResults, skillLevelConfig, type ResumeAnalysis } from '@/lib/resume-analysis'

function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const size = 240
  const center = size / 2
  const radius = 90
  const angleStep = (2 * Math.PI) / data.length
  const levels = [20, 40, 60, 80, 100]

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2
    const r = (value / 100) * radius
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
  }

  const dataPoints = data.map((d, i) => getPoint(i, d.value))
  const pathD = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 배경 그리드 */}
      {levels.map((level) => {
        const points = data.map((_, i) => getPoint(i, level))
        const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return <path key={level} d={d} fill="none" stroke="#e5e8eb" strokeWidth="1" />
      })}
      {/* 축 라인 */}
      {data.map((_, i) => {
        const p = getPoint(i, 100)
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e5e8eb" strokeWidth="1" />
      })}
      {/* 데이터 영역 */}
      <path d={pathD} fill="rgba(49, 130, 246, 0.15)" stroke="#3182f6" strokeWidth="2" />
      {/* 데이터 포인트 */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3182f6" />
      ))}
      {/* 라벨 */}
      {data.map((d, i) => {
        const p = getPoint(i, 120)
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

export default function ResumePage() {
  const [inputMode, setInputMode] = useState<'upload' | 'text'>('upload')
  const [textInput, setTextInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<ResumeAnalysis | null>(null)
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
      // 데모 샘플은 Mock 텍스트를 AI에 보냄
      const demoText = `이름: ${demoData.name}\n현재 회사: ${demoData.currentCompany}\n직무: ${demoData.currentRole}\n경력: ${demoData.yearsOfExperience}년\n학력: ${demoData.education}\n요약: ${demoData.summary}\n기술: ${demoData.skills.map(s => s.name).join(', ')}`
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

  if (result && !analyzing) {
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

        {/* 프로필 요약 */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-5">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#8b5cf6] flex items-center justify-center text-white text-[24px] font-bold flex-shrink-0">
              {result.name[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-[20px] font-bold text-foreground">{result.name}</h2>
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
        </div>

        <div className="grid grid-cols-5 gap-5 mb-5">
          {/* 레이더 차트 */}
          <div className="col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h3 className="text-[15px] font-bold text-foreground mb-4">역량 분석</h3>
            <div className="flex justify-center">
              <RadarChart data={result.radar} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {result.radar.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="text-[18px] font-bold text-foreground">{r.value}</p>
                  <p className="text-[10px] text-muted">{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="col-span-3 bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h3 className="text-[15px] font-bold text-foreground mb-4">기술 스택</h3>
            <div className="flex flex-wrap gap-2">
              {result.skills.map((skill) => {
                const config = skillLevelConfig[skill.level]
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
                  <span className="text-success mt-0.5 flex-shrink-0">+</span>
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          AI 이력서 분석
        </h1>
        <p className="text-[14px] text-muted mt-1">이력서를 업로드하면 AI가 자동으로 분석합니다</p>
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
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder="이력서 내용을 붙여넣으세요...&#10;&#10;예시:&#10;이름: 김현수&#10;경력: 3년차 백엔드 개발자&#10;현직장: 네이버 클라우드&#10;기술: Java, Spring Boot, MySQL, AWS..."
          />
          <button
            onClick={handleTextAnalyze}
            disabled={!textInput.trim()}
            className="mt-4 bg-gradient-to-r from-primary to-[#8b5cf6] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Sparkles size={14} />
            AI 분석 시작
          </button>
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
            <p className="text-[12px] text-muted mt-1">Gemini AI가 분석 중입니다...</p>
          </div>
        </div>
      )}
    </div>
  )
}
