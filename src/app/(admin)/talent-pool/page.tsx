'use client'

import { useState } from 'react'
import { Shield, Users, Award, TrendingUp, BarChart3, BookOpen, Briefcase, Filter, Lightbulb } from 'lucide-react'

// ─── Mock Data ─────────────────────────────────────────────

const certData = [
  { name: '정보처리기사', pct: 34 },
  { name: 'TOEIC 800+', pct: 28 },
  { name: 'SQLD', pct: 22 },
  { name: '컴활1급', pct: 18 },
  { name: 'ADsP', pct: 15 },
  { name: 'AWS SAA', pct: 12 },
  { name: '한국사능력검정', pct: 11 },
  { name: 'OPIC IM2+', pct: 10 },
  { name: '빅데이터분석기사', pct: 8 },
  { name: 'PMP', pct: 6 },
]

const certByCategory: Record<string, typeof certData> = {
  '전체': certData,
  '개발': [
    { name: '정보처리기사', pct: 52 },
    { name: 'AWS SAA', pct: 28 },
    { name: 'SQLD', pct: 25 },
    { name: 'ADsP', pct: 18 },
    { name: '빅데이터분석기사', pct: 15 },
    { name: 'TOEIC 800+', pct: 14 },
    { name: 'OPIC IM2+', pct: 8 },
    { name: 'PMP', pct: 5 },
    { name: '컴활1급', pct: 4 },
    { name: '한국사능력검정', pct: 3 },
  ],
  '마케팅': [
    { name: 'TOEIC 800+', pct: 45 },
    { name: 'ADsP', pct: 30 },
    { name: 'OPIC IM2+', pct: 28 },
    { name: '빅데이터분석기사', pct: 22 },
    { name: 'SQLD', pct: 18 },
    { name: '컴활1급', pct: 15 },
    { name: '한국사능력검정', pct: 12 },
    { name: '정보처리기사', pct: 8 },
    { name: 'PMP', pct: 6 },
    { name: 'AWS SAA', pct: 3 },
  ],
  'PM': [
    { name: 'PMP', pct: 42 },
    { name: 'ADsP', pct: 28 },
    { name: 'SQLD', pct: 22 },
    { name: 'TOEIC 800+', pct: 20 },
    { name: '정보처리기사', pct: 15 },
    { name: '빅데이터분석기사', pct: 12 },
    { name: 'AWS SAA', pct: 10 },
    { name: 'OPIC IM2+', pct: 8 },
    { name: '컴활1급', pct: 6 },
    { name: '한국사능력검정', pct: 5 },
  ],
  '디자인': [
    { name: 'TOEIC 800+', pct: 32 },
    { name: '컴활1급', pct: 28 },
    { name: 'OPIC IM2+', pct: 22 },
    { name: '한국사능력검정', pct: 18 },
    { name: 'ADsP', pct: 10 },
    { name: 'SQLD', pct: 8 },
    { name: '정보처리기사', pct: 5 },
    { name: '빅데이터분석기사', pct: 4 },
    { name: 'PMP', pct: 3 },
    { name: 'AWS SAA', pct: 2 },
  ],
}

const skillData = [
  { name: 'Python', pct: 38, color: '#3182f6' },
  { name: 'JavaScript', pct: 35, color: '#f59e0b' },
  { name: 'SQL', pct: 32, color: '#10b981' },
  { name: 'Java', pct: 28, color: '#ef4444' },
  { name: 'React', pct: 25, color: '#06b6d4' },
  { name: 'Excel', pct: 22, color: '#22c55e' },
  { name: 'Figma', pct: 18, color: '#a855f7' },
  { name: 'TypeScript', pct: 15, color: '#3b82f6' },
  { name: 'AWS', pct: 12, color: '#f97316' },
  { name: 'Docker', pct: 10, color: '#0ea5e9' },
]

const educationData = [
  { label: '4년제 대졸', pct: 65, color: '#3182f6' },
  { label: '석사', pct: 15, color: '#6366f1' },
  { label: '전문대졸', pct: 12, color: '#8b5cf6' },
  { label: '기타', pct: 8, color: '#c4b5fd' },
]

const experienceData = [
  { label: '신입', pct: 35, color: '#bfdbfe' },
  { label: '1-3년', pct: 30, color: '#60a5fa' },
  { label: '3-5년', pct: 20, color: '#3182f6' },
  { label: '5-10년', pct: 10, color: '#1d4ed8' },
  { label: '10년+', pct: 5, color: '#1e3a8a' },
]

const trendMonths = ['11월', '12월', '1월', '2월', '3월', '4월']
const trendCategories = ['개발', '마케팅', 'PM', '디자인']
const trendColors: Record<string, string> = { '개발': '#3182f6', '마케팅': '#f59e0b', 'PM': '#10b981', '디자인': '#a855f7' }
const trendData: Record<string, number[]> = {
  '개발': [80, 95, 110, 105, 130, 125],
  '마케팅': [40, 35, 50, 55, 60, 65],
  'PM': [20, 25, 30, 28, 35, 40],
  '디자인': [15, 20, 22, 25, 28, 30],
}

const insights = [
  '개발 직군 지원자 중 AWS 자격증 보유율이 전년 대비 45% 증가했습니다',
  '마케팅 직군에서 데이터 분석 관련 자격증 수요가 급증하고 있습니다',
  'TOEIC 800+ 보유자가 서류통과율 23% 더 높습니다',
]

// ─── SVG Charts ─────────────────────────────────────────────

function HorizontalBarChart({ data, maxPct }: { data: { name: string; pct: number }[]; maxPct?: number }) {
  const max = maxPct ?? Math.max(...data.map(d => d.pct))
  const barH = 28
  const gap = 8
  const labelW = 120
  const chartW = 500
  const h = data.length * (barH + gap)

  return (
    <svg width="100%" viewBox={`0 0 ${labelW + chartW + 60} ${h}`} className="overflow-visible">
      {data.map((d, i) => {
        const y = i * (barH + gap)
        const w = (d.pct / max) * chartW
        return (
          <g key={d.name}>
            <text x={labelW - 8} y={y + barH / 2 + 4} textAnchor="end" className="fill-current text-foreground" fontSize={12} fontWeight={500}>
              {d.name}
            </text>
            <rect x={labelW} y={y} width={chartW} height={barH} rx={6} fill="currentColor" className="text-border/40" />
            <rect x={labelW} y={y} width={w} height={barH} rx={6} fill="#3182f6" opacity={0.15 + (d.pct / max) * 0.85} />
            <text x={labelW + w + 8} y={y + barH / 2 + 4} fontSize={12} fontWeight={600} fill="#3182f6">
              {d.pct}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function DonutChart({ data }: { data: { label: string; pct: number; color: string }[] }) {
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const r = 68
  const strokeW = 28
  const total = data.reduce((s, d) => s + d.pct, 0)
  let cumulative = 0

  const segments = data.map((d) => {
    const startAngle = (cumulative / total) * 360 - 90
    cumulative += d.pct
    const endAngle = (cumulative / total) * 360 - 90
    const largeArc = d.pct / total > 0.5 ? 1 : 0
    const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180)
    const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180)
    const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180)
    const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180)
    return { ...d, path: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}` }
  })

  return (
    <div className="flex items-center gap-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg) => (
          <path
            key={seg.label}
            d={seg.path}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={22} fontWeight={700} className="fill-current text-foreground">
          1,247
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} className="fill-current text-muted">
          전체 인재풀
        </text>
      </svg>
      <div className="flex flex-col gap-2.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[13px] text-foreground font-medium w-20">{d.label}</span>
            <span className="text-[13px] text-muted font-semibold">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StackedBarTrendChart() {
  const barW = 48
  const gap = 32
  const chartH = 200
  const padL = 36
  const padB = 28
  const maxVal = Math.max(...trendMonths.map((_, mi) =>
    trendCategories.reduce((s, c) => s + trendData[c][mi], 0)
  ))

  const totalW = padL + trendMonths.length * (barW + gap)

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${totalW} ${chartH + padB + 10}`} className="overflow-visible">
        {/* Y-axis guides */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = chartH - f * chartH
          return (
            <g key={f}>
              <line x1={padL} y1={y} x2={totalW} y2={y} stroke="currentColor" className="text-border" strokeWidth={0.5} />
              <text x={padL - 6} y={y + 4} textAnchor="end" fontSize={10} className="fill-current text-muted">
                {Math.round(maxVal * f)}
              </text>
            </g>
          )
        })}
        {/* Bars */}
        {trendMonths.map((month, mi) => {
          const x = padL + mi * (barW + gap) + gap / 2
          let yOffset = 0
          return (
            <g key={month}>
              {trendCategories.map((cat) => {
                const val = trendData[cat][mi]
                const h = (val / maxVal) * chartH
                const y = chartH - yOffset - h
                yOffset += h
                return (
                  <rect key={cat} x={x} y={y} width={barW} height={h} rx={4}
                    fill={trendColors[cat]} opacity={0.85} />
                )
              })}
              <text x={x + barW / 2} y={chartH + 18} textAnchor="middle" fontSize={11} className="fill-current text-muted">
                {month}
              </text>
            </g>
          )
        })}
      </svg>
      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 justify-center">
        {trendCategories.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: trendColors[cat] }} />
            <span className="text-[12px] text-muted font-medium">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Page Component ────────────────────────────────────────

const categories = ['전체', '개발', '마케팅', 'PM', '디자인'] as const
type Category = (typeof categories)[number]

export default function TalentPoolPage() {
  const [certFilter, setCertFilter] = useState<Category>('전체')

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#6366f1] flex items-center justify-center">
            <Users size={18} className="text-white" />
          </div>
          인재풀 분석
        </h1>
        <p className="text-[14px] text-muted mt-1">지원자 데이터를 통계적으로 분석하여 채용 전략을 수립하세요</p>
      </div>

      {/* 법적 고지 배너 */}
      <div className="bg-[#ecfdf5] border border-[#10b981]/20 rounded-2xl px-5 py-4 mb-8 flex items-start gap-3">
        <div className="bg-[#10b981] p-2 rounded-lg flex-shrink-0 mt-0.5">
          <Shield size={16} className="text-white" />
        </div>
        <div>
          <p className="text-[13px] text-[#065f46] font-medium leading-relaxed">
            본 데이터는 개인정보보호법 제15조에 따라 통계 목적으로만 활용되며, 개인 식별이 불가능한 집계 데이터입니다.
          </p>
          <p className="text-[11px] text-[#047857] mt-1">
            데이터 기준: 2026년 1~4월 지원자 1,247명
          </p>
        </div>
      </div>

      {/* 요약 통계 카드 4개 */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { icon: Users, label: '전체 인재풀', value: '1,247명', sub: '전년 동기 대비 +18%', subColor: '#00c471', gradient: 'from-[#3182f6] to-[#6366f1]' },
          { icon: Award, label: '평균 보유 자격증', value: '3.2개', sub: '상위 10% 평균 5.8개', subColor: '#f59e0b', gradient: 'from-[#f59e0b] to-[#f97316]' },
          { icon: Briefcase, label: '가장 많은 직무', value: '개발 (42%)', sub: '마케팅 23% / PM 18%', subColor: '#8b5cf6', gradient: 'from-[#8b5cf6] to-[#a855f7]' },
          { icon: TrendingUp, label: '평균 경력', value: '2.8년', sub: '신입 비율 35%', subColor: '#10b981', gradient: 'from-[#10b981] to-[#06b6d4]' },
        ].map((card) => (
          <div key={card.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`bg-gradient-to-br ${card.gradient} p-2.5 rounded-xl`}>
                <card.icon size={18} className="text-white" />
              </div>
            </div>
            <p className="text-[12px] text-muted mb-1">{card.label}</p>
            <p className="text-[22px] font-bold text-foreground">{card.value}</p>
            <p className="text-[11px] mt-1.5" style={{ color: card.subColor }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* 자격증 분포 분석 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <Award size={18} className="text-[#3182f6]" />
            <h2 className="text-[16px] font-bold text-foreground">자격증 분포 분석</h2>
            <span className="text-[11px] text-muted bg-card-hover px-2 py-0.5 rounded-full">TOP 10</span>
          </div>
          <div className="flex gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCertFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                  certFilter === cat
                    ? 'bg-[#3182f6] text-white shadow-sm'
                    : 'bg-card-hover text-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <HorizontalBarChart data={certByCategory[certFilter]} maxPct={60} />
      </div>

      {/* 기술 스택 보유 현황 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <BarChart3 size={18} className="text-[#3182f6]" />
          <h2 className="text-[16px] font-bold text-foreground">기술 스택 보유 현황</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {skillData.map((skill) => {
            const size = 0.7 + (skill.pct / 40) * 0.6
            return (
              <div
                key={skill.name}
                className="flex items-center gap-2 bg-card-hover border border-border rounded-xl px-4 py-2.5 transition-all hover:shadow-sm hover:border-[#3182f6]/30"
                style={{ transform: `scale(${size})`, transformOrigin: 'center' }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="text-[13px] font-semibold text-foreground">{skill.name}</span>
                <span className="text-[12px] font-bold" style={{ color: skill.color }}>{skill.pct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 학력 분포 & 경력 분포 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 학력 분포 */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex items-center gap-2.5 mb-5">
            <BookOpen size={18} className="text-[#6366f1]" />
            <h2 className="text-[16px] font-bold text-foreground">학력 분포</h2>
          </div>
          <DonutChart data={educationData} />
        </div>

        {/* 경력 분포 */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex items-center gap-2.5 mb-5">
            <Briefcase size={18} className="text-[#10b981]" />
            <h2 className="text-[16px] font-bold text-foreground">경력 분포</h2>
          </div>
          <div className="space-y-3">
            {experienceData.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-[12px] text-muted font-medium w-14 text-right flex-shrink-0">{d.label}</span>
                <div className="flex-1 h-8 bg-card-hover rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-foreground">
                    {d.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 직군별 지원 추세 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <TrendingUp size={18} className="text-[#3182f6]" />
          <h2 className="text-[16px] font-bold text-foreground">직군별 지원 추세</h2>
          <span className="text-[11px] text-muted bg-card-hover px-2 py-0.5 rounded-full">최근 6개월</span>
        </div>
        <StackedBarTrendChart />
      </div>

      {/* 인사이트 카드 */}
      <div className="bg-gradient-to-r from-[#eff6ff] to-[#f3e8ff] rounded-2xl border border-[#3182f6]/10 p-6 shadow-soft">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="bg-gradient-to-br from-[#f59e0b] to-[#f97316] p-2 rounded-lg">
            <Lightbulb size={16} className="text-white" />
          </div>
          <h2 className="text-[16px] font-bold text-foreground">인재풀 인사이트</h2>
        </div>
        <div className="space-y-3">
          {insights.map((text, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/70 rounded-xl px-4 py-3">
              <span className="text-[16px] flex-shrink-0 mt-0.5">💡</span>
              <p className="text-[13px] text-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
