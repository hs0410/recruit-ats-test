'use client'

import { useState } from 'react'
import { ClipboardCheck, Printer, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { evaluationTemplates, getVerdict, verdictConfig, type EvalTemplate, type ScoreValue } from '@/lib/evaluation-templates'

const scoreButtons: { value: ScoreValue; label: string; color: string; bg: string; ring: string }[] = [
  { value: 5, label: '우수', color: 'text-primary', bg: 'bg-primary-light', ring: 'ring-primary' },
  { value: 3, label: '보통', color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-400' },
  { value: 1, label: '미흡', color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-400' },
]

export default function EvaluationPage() {
  const [selected, setSelected] = useState<EvalTemplate | null>(null)
  const [scores, setScores] = useState<Record<string, ScoreValue>>({})
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const [activeDimension, setActiveDimension] = useState<'직무전문기술' | '멀티역량'>('직무전문기술')

  const toggleCategory = (key: string) => {
    setOpenCategories(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const setScore = (criterionName: string, score: ScoreValue) => {
    setScores(prev => ({ ...prev, [criterionName]: score }))
  }

  const handleSelect = (template: EvalTemplate) => {
    setSelected(template)
    setScores({})
    setActiveDimension('직무전문기술')
    const cats: Record<string, boolean> = {}
    template.dimensions.forEach(d => d.categories.forEach(c => { cats[c.category] = true }))
    setOpenCategories(cats)
  }

  // 점수 계산
  const calcDimensionAvg = (dimName: string) => {
    if (!selected) return 0
    const dim = selected.dimensions.find(d => d.dimension === dimName)
    if (!dim) return 0
    const allCriteria = dim.categories.flatMap(c => c.criteria)
    const scored = allCriteria.filter(c => scores[c.name] !== undefined)
    if (scored.length === 0) return 0
    return scored.reduce((sum, c) => sum + (scores[c.name] || 0), 0) / scored.length
  }

  const techAvg = calcDimensionAvg('직무전문기술')
  const multiAvg = calcDimensionAvg('멀티역량')
  const totalAvg = selected ? (techAvg * 0.6 + multiAvg * 0.4) : 0
  const scoredCount = Object.keys(scores).length
  const verdict = getVerdict(totalAvg)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#6366f1] flex items-center justify-center">
              <ClipboardCheck size={18} className="text-white" />
            </div>
            역량 평가 기준표
          </h1>
          <p className="text-[14px] text-muted mt-1">5·3·1점 체계 — 직무전문기술 (60%) + 멀티역량 (40%)</p>
        </div>
        {selected && (
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold bg-card-hover text-muted hover:text-foreground border border-border"
          >
            <Printer size={14} />
            인쇄
          </button>
        )}
      </div>

      {/* 판정 기준 안내 */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-soft mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info size={15} className="text-primary" />
          <h4 className="text-[13px] font-bold text-foreground">판정 기준</h4>
        </div>
        <div className="flex gap-4">
          {verdictConfig.map(v => (
            <div key={v.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${v.bg}`}>
              <span>{v.emoji}</span>
              <span className={`text-[12px] font-bold ${v.color}`}>
                {v.min > 0 ? `${v.min}점+` : `${verdictConfig[verdictConfig.length - 2].min}점 미만`}
              </span>
              <span className="text-[12px] text-foreground font-semibold">{v.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted mt-2">평가 점수: 5점(우수) · 3점(보통) · 1점(미흡) | 종합 = 직무전문기술 60% + 멀티역량 40%</p>
      </div>

      {/* 템플릿 선택 */}
      {!selected ? (
        <div className="grid grid-cols-3 gap-4">
          {evaluationTemplates.map(t => (
            <button
              key={t.id}
              onClick={() => handleSelect(t)}
              className="bg-card rounded-2xl border border-border p-6 shadow-soft hover-lift text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-[#8b5cf6]/10 flex items-center justify-center mb-4">
                <ClipboardCheck size={20} className="text-primary" />
              </div>
              <h3 className="text-[15px] font-bold text-foreground mb-1">{t.position}</h3>
              <p className="text-[12px] text-muted">
                {t.dimensions.flatMap(d => d.categories.flatMap(c => c.criteria)).length}개 평가 항목
              </p>
              <div className="flex gap-2 mt-3">
                {t.dimensions.map(d => (
                  <span key={d.dimension} className="text-[10px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                    {d.dimension} {Math.round(d.weight * 100)}%
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          {/* 상단: 템플릿 + 점수 요약 */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelected(null)} className="text-[12px] text-muted hover:text-foreground">← 목록으로</button>
              <h2 className="text-[18px] font-bold text-foreground">{selected.position}</h2>
            </div>
            {scoredCount > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-muted">직무전문기술</p>
                  <p className="text-[16px] font-bold text-foreground">{techAvg.toFixed(1)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted">멀티역량</p>
                  <p className="text-[16px] font-bold text-foreground">{multiAvg.toFixed(1)}</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-right">
                  <p className="text-[10px] text-muted">종합</p>
                  <p className="text-[20px] font-bold text-foreground">{totalAvg.toFixed(1)}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-[12px] font-bold ${verdict.bg} ${verdict.color}`}>
                  {verdict.emoji} {verdict.label}
                </span>
              </div>
            )}
          </div>

          {/* 차원 탭 */}
          <div className="flex gap-1 mb-5 bg-card-hover rounded-xl p-1">
            {selected.dimensions.map(d => (
              <button
                key={d.dimension}
                onClick={() => setActiveDimension(d.dimension)}
                className={`flex-1 py-3 rounded-lg text-[13px] font-semibold transition-all ${
                  activeDimension === d.dimension ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
                }`}
              >
                {d.dimension}
                <span className="block text-[10px] font-normal text-muted mt-0.5">가중치 {Math.round(d.weight * 100)}%</span>
              </button>
            ))}
          </div>

          {/* 평가 항목 */}
          {selected.dimensions
            .filter(d => d.dimension === activeDimension)
            .map(dim => (
              <div key={dim.dimension} className="space-y-4">
                {dim.categories.map(cat => {
                  const isOpen = openCategories[cat.category] !== false
                  return (
                    <div key={cat.category} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
                      <button
                        onClick={() => toggleCategory(cat.category)}
                        className="w-full px-6 py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <h4 className="text-[14px] font-bold text-foreground">{cat.category}</h4>
                          <span className="text-[11px] text-muted bg-card-hover px-2 py-0.5 rounded-full">
                            {cat.criteria.length}개 항목
                          </span>
                        </div>
                        {isOpen ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 space-y-5 border-t border-border/60 pt-4">
                          {cat.criteria.map(criterion => {
                            const currentScore = scores[criterion.name]
                            const selectedRubric = criterion.rubric.find(r => r.score === currentScore)
                            return (
                              <div key={criterion.name}>
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="text-[13px] font-semibold text-foreground">{criterion.name}</p>
                                    <p className="text-[11px] text-muted mt-0.5">{criterion.description}</p>
                                  </div>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    criterion.weight === 'high' ? 'text-primary bg-primary-light' : 'text-muted bg-card-hover'
                                  }`}>
                                    {criterion.weight === 'high' ? '핵심' : '기본'}
                                  </span>
                                </div>
                                {/* 5·3·1 점수 버튼 */}
                                <div className="flex gap-2 mb-2">
                                  {scoreButtons.map(btn => (
                                    <button
                                      key={btn.value}
                                      onClick={() => setScore(criterion.name, btn.value)}
                                      className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all border-2 ${
                                        currentScore === btn.value
                                          ? `${btn.bg} ${btn.color} ${btn.ring} ring-2`
                                          : 'bg-card-hover text-muted border-transparent hover:border-border'
                                      }`}
                                    >
                                      {btn.value}점 · {btn.label}
                                    </button>
                                  ))}
                                </div>
                                {/* 선택된 기준 설명 */}
                                {selectedRubric && (
                                  <div className={`text-[11px] leading-relaxed px-3 py-2 rounded-lg ${
                                    currentScore === 5 ? 'bg-primary-light/50 text-primary' :
                                    currentScore === 3 ? 'bg-amber-50 text-amber-700' :
                                    'bg-red-50 text-red-600'
                                  }`}>
                                    {selectedRubric.description}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
