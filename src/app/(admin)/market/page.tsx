'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Building2, Users, Filter } from 'lucide-react'

const jobCategories = ['전체', '개발', '기획/PM', '디자인', '마케팅', '영업', 'HR']

// 포지션별 평균 연봉 데이터
const salaryData = {
  '전체': [
    { position: '시니어 백엔드', min: 6000, max: 9000, avg: 7200 },
    { position: '시니어 프론트엔드', min: 5500, max: 8500, avg: 6800 },
    { position: 'PM (5년+)', min: 5500, max: 8000, avg: 6500 },
    { position: '시니어 디자이너', min: 5000, max: 7500, avg: 6000 },
    { position: '그로스 마케터', min: 4500, max: 7000, avg: 5500 },
    { position: '데이터 엔지니어', min: 5500, max: 8500, avg: 6800 },
    { position: 'HRBP', min: 5000, max: 7000, avg: 5800 },
    { position: 'B2B 영업', min: 4500, max: 8000, avg: 5800 },
  ],
  '개발': [
    { position: '시니어 백엔드', min: 6000, max: 9000, avg: 7200 },
    { position: '시니어 프론트엔드', min: 5500, max: 8500, avg: 6800 },
    { position: '데이터 엔지니어', min: 5500, max: 8500, avg: 6800 },
    { position: 'DevOps', min: 6000, max: 9500, avg: 7500 },
    { position: 'iOS 개발자', min: 5500, max: 8000, avg: 6500 },
    { position: 'AI/ML 엔지니어', min: 6500, max: 10000, avg: 8000 },
  ],
  '기획/PM': [
    { position: 'PM (5년+)', min: 5500, max: 8000, avg: 6500 },
    { position: '서비스 기획자', min: 4000, max: 6000, avg: 4800 },
    { position: 'PO (Product Owner)', min: 6000, max: 9000, avg: 7200 },
  ],
  '디자인': [
    { position: '시니어 UX 디자이너', min: 5000, max: 7500, avg: 6000 },
    { position: 'UI 디자이너', min: 3500, max: 5500, avg: 4300 },
    { position: 'BX 디자이너', min: 4000, max: 6500, avg: 5000 },
  ],
  '마케팅': [
    { position: '그로스 마케터', min: 4500, max: 7000, avg: 5500 },
    { position: '콘텐츠 마케터', min: 3500, max: 5500, avg: 4300 },
    { position: '브랜드 마케터', min: 4500, max: 7000, avg: 5500 },
    { position: 'CRM 마케터', min: 4000, max: 6000, avg: 4800 },
  ],
  '영업': [
    { position: 'B2B 영업', min: 4500, max: 8000, avg: 5800 },
    { position: 'CSM', min: 4000, max: 6500, avg: 5000 },
    { position: '사업개발(BD)', min: 5000, max: 8000, avg: 6200 },
  ],
  'HR': [
    { position: 'HRBP', min: 5000, max: 7000, avg: 5800 },
    { position: '채용 담당자', min: 3500, max: 5500, avg: 4300 },
    { position: 'HRD 담당자', min: 4000, max: 6000, avg: 4800 },
  ],
}

// 인기 기술 스택
const techTrends = [
  { name: 'TypeScript', count: 3420, change: '+18%', category: '개발' },
  { name: 'React', count: 3180, change: '+12%', category: '개발' },
  { name: 'Python', count: 2950, change: '+25%', category: '개발' },
  { name: 'AWS', count: 2640, change: '+8%', category: '개발' },
  { name: 'Figma', count: 1890, change: '+22%', category: '디자인' },
  { name: 'SQL', count: 1750, change: '+5%', category: '데이터' },
  { name: 'Docker', count: 1620, change: '+15%', category: '개발' },
  { name: 'GA4', count: 1480, change: '+30%', category: '마케팅' },
  { name: 'Amplitude', count: 1120, change: '+45%', category: 'PM' },
  { name: 'Next.js', count: 980, change: '+35%', category: '개발' },
]

// 월별 채용 공고 추이
const monthlyTrend = [
  { month: '11월', total: 12400, dev: 4200, plan: 1800, design: 1200, marketing: 1600, sales: 1800, hr: 1800 },
  { month: '12월', total: 11800, dev: 3900, plan: 1700, design: 1100, marketing: 1500, sales: 1800, hr: 1800 },
  { month: '1월', total: 14200, dev: 4800, plan: 2100, design: 1400, marketing: 1900, sales: 2000, hr: 2000 },
  { month: '2월', total: 15600, dev: 5200, plan: 2300, design: 1500, marketing: 2100, sales: 2200, hr: 2300 },
  { month: '3월', total: 16800, dev: 5600, plan: 2500, design: 1600, marketing: 2300, sales: 2400, hr: 2400 },
  { month: '4월', total: 17200, dev: 5800, plan: 2600, design: 1700, marketing: 2300, sales: 2400, hr: 2400 },
]

// 경쟁사 채용 현황
const competitors = [
  { company: '네이버', openPositions: 142, topRole: '백엔드 개발자', salaryRange: '5,000~9,000만', trend: 'up' },
  { company: '카카오', openPositions: 98, topRole: 'PM', salaryRange: '5,500~8,500만', trend: 'down' },
  { company: '토스', openPositions: 67, topRole: '프론트엔드 개발자', salaryRange: '6,000~10,000만', trend: 'up' },
  { company: '쿠팡', openPositions: 234, topRole: '물류 기획자', salaryRange: '4,500~8,000만', trend: 'up' },
  { company: '배달의민족', openPositions: 56, topRole: 'UX 디자이너', salaryRange: '5,000~8,000만', trend: 'stable' },
  { company: '당근마켓', openPositions: 43, topRole: '시니어 백엔드', salaryRange: '6,000~10,000만', trend: 'up' },
  { company: '라인', openPositions: 78, topRole: 'AI 엔지니어', salaryRange: '5,500~9,500만', trend: 'stable' },
  { company: '크래프톤', openPositions: 112, topRole: '게임 개발자', salaryRange: '5,000~9,000만', trend: 'up' },
]

function SalaryBar({ position, min, max, avg, maxScale }: { position: string; min: number; max: number; avg: number; maxScale: number }) {
  const leftPct = (min / maxScale) * 100
  const widthPct = ((max - min) / maxScale) * 100
  const avgPct = (avg / maxScale) * 100

  return (
    <div className="flex items-center gap-3 py-2">
      <p className="text-[12px] text-foreground font-medium w-[140px] flex-shrink-0 truncate">{position}</p>
      <div className="flex-1 relative h-6">
        <div className="absolute inset-0 bg-card-hover rounded-full" />
        <div
          className="absolute top-0 h-6 bg-gradient-to-r from-primary/30 to-primary/60 rounded-full"
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
        <div
          className="absolute top-0 h-6 w-0.5 bg-primary"
          style={{ left: `${avgPct}%` }}
        />
      </div>
      <p className="text-[11px] text-muted w-[120px] flex-shrink-0 text-right">
        {(min / 10000).toFixed(0)}~{(max / 10000).toFixed(0)}만 <span className="font-semibold text-primary">(평균 {(avg / 10000).toFixed(0)})</span>
      </p>
    </div>
  )
}

export default function MarketPage() {
  const [category, setCategory] = useState('전체')

  const currentSalary = salaryData[category as keyof typeof salaryData] || salaryData['전체']
  const maxSalary = Math.max(...currentSalary.map(s => s.max))
  const latestMonth = monthlyTrend[monthlyTrend.length - 1]
  const prevMonth = monthlyTrend[monthlyTrend.length - 2]
  const growthRate = Math.round(((latestMonth.total - prevMonth.total) / prevMonth.total) * 100)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
            <BarChart3 size={18} className="text-white" />
          </div>
          채용 시장 현황
        </h1>
        <p className="text-[14px] text-muted mt-1">실시간 채용 시장 데이터 기반 인사이트 (2026.04 기준)</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: '이번 달 총 공고', value: latestMonth.total.toLocaleString(), change: `+${growthRate}%`, icon: BarChart3, gradient: 'from-[#3182f6] to-[#6366f1]' },
          { label: '개발 직군 공고', value: latestMonth.dev.toLocaleString(), change: '+4%', icon: TrendingUp, gradient: 'from-[#00c471] to-[#06b6d4]' },
          { label: '모니터링 기업', value: `${competitors.length}개사`, change: '', icon: Building2, gradient: 'from-[#8b5cf6] to-[#ec4899]' },
          { label: '인기 기술 1위', value: 'TypeScript', change: '+18%', icon: Users, gradient: 'from-[#f59e0b] to-[#ef4444]' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                <Icon size={16} className="text-white" />
              </div>
              <p className="text-[22px] font-bold text-foreground">{stat.value}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[12px] text-muted">{stat.label}</p>
                {stat.change && <span className="text-[11px] font-semibold text-success">{stat.change}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* 직군 필터 */}
      <div className="flex gap-2 mb-6">
        {jobCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${
              category === cat
                ? 'bg-gradient-to-r from-primary to-[#6366f1] text-white shadow-soft'
                : 'bg-card-hover text-muted hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5 mb-6">
        {/* 포지션별 연봉 */}
        <div className="col-span-3 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <h2 className="text-[15px] font-bold text-foreground mb-1">포지션별 연봉 범위</h2>
          <p className="text-[11px] text-muted mb-4">막대: 최소~최대 / 세로선: 평균 (단위: 만원)</p>
          <div className="space-y-1">
            {currentSalary.map((s) => (
              <SalaryBar key={s.position} {...s} maxScale={maxSalary * 1.1} />
            ))}
          </div>
        </div>

        {/* 인기 기술 스택 */}
        <div className="col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <h2 className="text-[15px] font-bold text-foreground mb-4">인기 기술/스킬 TOP 10</h2>
          <div className="space-y-2.5">
            {techTrends.map((tech, i) => {
              const maxCount = techTrends[0].count
              const barWidth = (tech.count / maxCount) * 100
              return (
                <div key={tech.name} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-muted w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold text-foreground">{tech.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted">{tech.count.toLocaleString()}</span>
                        <span className="text-[10px] font-semibold text-success">{tech.change}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-card-hover rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-[#6366f1] rounded-full" style={{ width: `${barWidth}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 월별 추이 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <h2 className="text-[15px] font-bold text-foreground mb-4">월별 채용 공고 추이</h2>
        <div className="flex items-end gap-3 h-[180px]">
          {monthlyTrend.map((m) => {
            const maxTotal = Math.max(...monthlyTrend.map(t => t.total))
            const height = (m.total / maxTotal) * 100
            const isLatest = m.month === latestMonth.month
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-foreground">{m.total.toLocaleString()}</span>
                <div className="w-full flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-lg transition-all ${isLatest ? 'bg-gradient-to-t from-primary to-[#6366f1]' : 'bg-primary/20'}`}
                    style={{ height: `${height * 1.4}px` }}
                  />
                </div>
                <span className={`text-[11px] ${isLatest ? 'font-bold text-primary' : 'text-muted'}`}>{m.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 경쟁사 채용 현황 */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-[15px] font-bold text-foreground">주요 기업 채용 현황</h2>
          <p className="text-[11px] text-muted mt-0.5">원티드/사람인 기준 공개 채용 공고 수</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card-hover/50">
              <th className="text-left text-[11px] font-semibold text-muted px-6 py-3">기업</th>
              <th className="text-center text-[11px] font-semibold text-muted px-4 py-3">공개 공고</th>
              <th className="text-left text-[11px] font-semibold text-muted px-4 py-3">최다 채용 직무</th>
              <th className="text-left text-[11px] font-semibold text-muted px-4 py-3">연봉 범위</th>
              <th className="text-center text-[11px] font-semibold text-muted px-4 py-3">추세</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((comp) => (
              <tr key={comp.company} className="border-b border-border/40 last:border-0 hover:bg-card-hover transition-colors">
                <td className="px-6 py-3.5">
                  <p className="text-[13px] font-semibold text-foreground">{comp.company}</p>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className="text-[13px] font-bold text-primary">{comp.openPositions}</span>
                </td>
                <td className="px-4 py-3.5 text-[12px] text-muted">{comp.topRole}</td>
                <td className="px-4 py-3.5 text-[12px] text-muted">{comp.salaryRange}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    comp.trend === 'up' ? 'bg-success-light text-success' :
                    comp.trend === 'down' ? 'bg-danger-light text-danger' :
                    'bg-card-hover text-muted'
                  }`}>
                    {comp.trend === 'up' ? '증가' : comp.trend === 'down' ? '감소' : '유지'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
