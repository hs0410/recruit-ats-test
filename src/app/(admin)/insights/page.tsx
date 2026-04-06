'use client'

import { useState } from 'react'
import { Newspaper, ExternalLink, Lightbulb, TrendingUp } from 'lucide-react'
import { articles, hiringTips, keywords2026, tagLabels } from '@/lib/insights-data'

const filters = [
  { key: 'all', label: '전체' },
  { key: 'trend', label: '트렌드' },
  { key: 'legal', label: '법률' },
  { key: 'strategy', label: '전략' },
  { key: 'ai', label: 'AI' },
]

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter(a => a.tag === activeFilter)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
            <Newspaper size={18} className="text-white" />
          </div>
          채용 인사이트
        </h1>
        <p className="text-[14px] text-muted mt-1">채용 트렌드, 법률, 전략에 대한 최신 정보</p>
      </div>

      {/* 2026 키워드 */}
      <div className="bg-gradient-to-r from-[#f3e8ff] to-primary-light rounded-2xl p-5 mb-6 border border-[#8b5cf6]/10">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-[#8b5cf6]" />
          <p className="text-[13px] font-bold text-foreground">2026 채용 키워드</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords2026.map((kw) => (
            <span key={kw} className="text-[12px] font-semibold text-[#8b5cf6] bg-white px-3 py-1.5 rounded-full shadow-soft">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${
              activeFilter === f.key
                ? 'bg-gradient-to-r from-primary to-[#6366f1] text-white shadow-soft'
                : 'bg-card-hover text-muted hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 기사 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {filtered.map((article) => {
          const tag = tagLabels[article.tag]
          return (
            <div key={article.id} className="bg-card rounded-2xl border border-border p-6 shadow-soft hover-lift">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tag.bg} ${tag.text}`}>
                  {tag.label}
                </span>
                <span className="text-[11px] text-muted">{article.date}</span>
              </div>
              <h3 className="text-[15px] font-bold text-foreground leading-snug mb-2">{article.title}</h3>
              <p className="text-[12px] text-muted leading-relaxed line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
                <span className="text-[11px] text-muted">{article.source}</span>
                <button className="flex items-center gap-1 text-[11px] text-primary font-semibold hover:underline">
                  자세히 <ExternalLink size={11} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 채용 팁 */}
      <div className="mb-3 flex items-center gap-2">
        <Lightbulb size={18} className="text-[#f59e0b]" />
        <h2 className="text-[18px] font-bold text-foreground">채용 팁</h2>
      </div>
      <p className="text-[13px] text-muted mb-5">실무에 바로 적용할 수 있는 채용 베스트 프랙티스</p>

      <div className="grid grid-cols-4 gap-3">
        {hiringTips.map((tip) => (
          <div key={tip.id} className="bg-card rounded-xl border border-border p-4 shadow-soft">
            <span className="text-[10px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">
              {tip.category}
            </span>
            <p className="text-[12px] text-foreground mt-2.5 leading-relaxed">{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
