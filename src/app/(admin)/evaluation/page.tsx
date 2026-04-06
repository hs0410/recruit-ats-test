'use client'

import { useState } from 'react'
import { ClipboardCheck, Search, Printer, ChevronDown, ChevronUp } from 'lucide-react'
import { evaluationTemplates, type EvalTemplate } from '@/lib/evaluation-templates'

export default function EvaluationPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<EvalTemplate | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

  const filtered = evaluationTemplates.filter(t =>
    t.position.toLowerCase().includes(search.toLowerCase())
  )

  const toggleCategory = (key: string) => {
    setOpenCategories(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const setScore = (criterionName: string, score: number) => {
    setScores(prev => ({ ...prev, [criterionName]: score }))
  }

  const handleSelect = (template: EvalTemplate) => {
    setSelected(template)
    setScores({})
    const cats: Record<string, boolean> = {}
    template.categories.forEach(c => { cats[c.category] = true })
    setOpenCategories(cats)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00c471] to-[#06b6d4] flex items-center justify-center">
            <ClipboardCheck size={18} className="text-white" />
          </div>
          평가 기준 생성기
        </h1>
        <p className="text-[14px] text-muted mt-1">포지션별 역량 평가 기준표를 생성합니다</p>
      </div>

      {!selected ? (
        <>
          {/* 검색 */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="포지션명으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-[14px] placeholder:text-muted/60"
            />
          </div>

          {/* 템플릿 선택 */}
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((t) => {
              const totalCriteria = t.categories.reduce((sum, c) => sum + c.criteria.length, 0)
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t)}
                  className="bg-card rounded-2xl border border-border p-6 shadow-soft hover-lift text-left transition-all"
                >
                  <p className="text-[16px] font-bold text-foreground">{t.position}</p>
                  <p className="text-[12px] text-muted mt-1">
                    {t.categories.length}개 카테고리 · {totalCriteria}개 평가 항목
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {t.categories.map((c) => (
                      <span key={c.category} className="text-[10px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">
                        {c.category}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[14px] text-muted">검색 결과가 없습니다</p>
              <p className="text-[12px] text-muted/60 mt-1">다른 포지션명으로 검색해보세요</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* 선택된 평가표 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => setSelected(null)}
                className="text-[12px] text-primary font-semibold mb-2 hover:underline"
              >
                ← 다른 포지션 선택
              </button>
              <h2 className="text-[20px] font-bold text-foreground">{selected.position} 평가 기준표</h2>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-muted bg-card-hover px-4 py-2 rounded-lg hover:text-foreground transition-colors border border-border"
            >
              <Printer size={14} />
              인쇄
            </button>
          </div>

          <div className="space-y-4">
            {selected.categories.map((cat) => {
              const isOpen = openCategories[cat.category] !== false
              return (
                <div key={cat.category} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat.category)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-bold text-foreground">{cat.category}</h3>
                      <span className="text-[11px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">
                        {cat.criteria.length}항목
                      </span>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left text-[11px] font-semibold text-muted py-2.5 w-[180px]">평가 항목</th>
                            <th className="text-left text-[11px] font-semibold text-muted py-2.5">설명</th>
                            <th className="text-center text-[11px] font-semibold text-muted py-2.5 w-[60px]">가중치</th>
                            <th className="text-center text-[11px] font-semibold text-muted py-2.5 w-[200px]">점수 (1-5)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cat.criteria.map((criterion) => (
                            <tr key={criterion.name} className="border-b border-border/40 last:border-0">
                              <td className="py-3 text-[13px] font-semibold text-foreground">{criterion.name}</td>
                              <td className="py-3 text-[12px] text-muted">{criterion.description}</td>
                              <td className="py-3 text-center">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  criterion.weight === 'high'
                                    ? 'bg-danger-light text-danger'
                                    : 'bg-card-hover text-muted'
                                }`}>
                                  {criterion.weight === 'high' ? '상' : '중'}
                                </span>
                              </td>
                              <td className="py-3">
                                <div className="flex justify-center gap-1.5">
                                  {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                      key={n}
                                      onClick={() => setScore(criterion.name, n)}
                                      className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-all ${
                                        scores[criterion.name] === n
                                          ? 'bg-gradient-to-br from-primary to-[#6366f1] text-white shadow-soft'
                                          : 'bg-card-hover text-muted hover:text-foreground hover:bg-primary-light'
                                      }`}
                                    >
                                      {n}
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
