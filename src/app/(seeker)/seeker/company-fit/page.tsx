'use client'

import { useState } from 'react'
import {
  Building2,
  Search,
  MapPin,
  Users,
  TrendingUp,
  Heart,
  DollarSign,
  Star,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'

/* ────────────────────────────────────────
   기업 적합도 분석 페이지
   기업 검색/선택 → 적합도 분석 결과
   ──────────────────────────────────────── */

interface Company {
  id: number
  name: string
  industry: string
  color: string
  founded: string
  employees: string
  revenue: string
  location: string
  cultureKeywords: string[]
}

const popularCompanies: Company[] = [
  {
    id: 1,
    name: '네이버',
    industry: 'IT/인터넷',
    color: '#03C75A',
    founded: '1999년',
    employees: '약 4,500명',
    revenue: '약 9.6조원 (2025)',
    location: '경기도 성남시 분당구',
    cultureKeywords: ['기술 중심', '수평적 소통', '자율 출퇴근', '사내 스터디 활발'],
  },
  {
    id: 2,
    name: '카카오',
    industry: 'IT/플랫폼',
    color: '#FEE500',
    founded: '2014년',
    employees: '약 4,000명',
    revenue: '약 7.1조원 (2025)',
    location: '경기도 성남시 판교',
    cultureKeywords: ['유연한 문화', '크루 중심', '자율 근무', '사내 동아리'],
  },
  {
    id: 3,
    name: '토스',
    industry: '핀테크',
    color: '#0064FF',
    founded: '2013년',
    employees: '약 2,500명',
    revenue: '약 1.8조원 (2025)',
    location: '서울시 강남구',
    cultureKeywords: ['성과 중심', '빠른 의사결정', '자율과 책임', '데이터 드리븐'],
  },
  {
    id: 4,
    name: '쿠팡',
    industry: '이커머스',
    color: '#E31837',
    founded: '2010년',
    employees: '약 70,000명',
    revenue: '약 31조원 (2025)',
    location: '서울시 송파구',
    cultureKeywords: ['고객 최우선', '실행력', '글로벌 환경', '빠른 성장'],
  },
  {
    id: 5,
    name: '배달의민족',
    industry: '푸드테크',
    color: '#2AC1BC',
    founded: '2010년',
    employees: '약 3,000명',
    revenue: '약 2.5조원 (2025)',
    location: '서울시 송파구',
    cultureKeywords: ['재미있는 문화', '브랜딩 강점', '자유로운 분위기', '송파구에서 일을 더 잘하는 11가지 방법'],
  },
  {
    id: 6,
    name: '라인',
    industry: 'IT/메신저',
    color: '#06C755',
    founded: '2000년',
    employees: '약 2,800명',
    revenue: '약 3.2조원 (2025)',
    location: '경기도 성남시 분당구',
    cultureKeywords: ['글로벌 문화', '일본 시장 중심', '엔지니어링 문화', '다양성 존중'],
  },
]

// 레이더 차트용 분석 결과
const radarLabels = ['기술 적합도', '경력 수준', '문화 선호도', '성장 환경', '복지 만족도', '위치 접근성']
const userValues = [85, 70, 75, 80, 65, 90]
const companyValues = [90, 80, 72, 85, 88, 70]
const overallMatch = 78

// 상세 분석 데이터
const analysisCards = [
  {
    title: '기업문화 적합도',
    score: 72,
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    details: [
      { label: '나의 선호', value: '자율적 환경, 기술 성장' },
      { label: '기업 특징', value: '기술 중심 문화, 수평적 소통' },
    ],
    good: '기술 중심 환경에서 성장하고 싶은 목표와 일치',
    caution: '대규모 조직 특성상 의사결정이 느릴 수 있음',
  },
  {
    title: '연봉/복지 수준',
    score: 85,
    icon: DollarSign,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    details: [
      { label: '해당 직군 평균 연봉', value: '5,500만원 ~ 8,000만원' },
      { label: '시장 대비', value: '상위 20%' },
    ],
    benefits: ['자기개발비', '건강검진', '주거지원', '식비'],
  },
  {
    title: '성장 가능성',
    score: 80,
    icon: TrendingUp,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    details: [
      { label: '최근 채용 트렌드', value: 'AI/ML 인력 확대 중' },
      { label: '내부 전환 가능성', value: '높음' },
      { label: '교육 투자', value: '연간 200만원 자기개발비' },
    ],
  },
]

const mockJobs = [
  { id: 1, title: '백엔드 개발자 (Java/Spring)', team: 'Search Platform', type: '정규직', deadline: '2026-04-30' },
  { id: 2, title: 'AI/ML 엔지니어', team: 'CLOVA AI Lab', type: '정규직', deadline: '2026-05-15' },
  { id: 3, title: '프론트엔드 개발자 (React)', team: 'Smart Store', type: '정규직', deadline: '2026-04-25' },
]

// ── SVG 레이더 차트 컴포넌트 ──
function RadarChart({ labels, data1, data2 }: { labels: string[]; data1: number[]; data2: number[] }) {
  const cx = 160
  const cy = 160
  const maxR = 120
  const levels = 5
  const n = labels.length

  const angleStep = (2 * Math.PI) / n
  const startAngle = -Math.PI / 2

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep
    const r = (value / 100) * maxR
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const makePolygon = (values: number[]) =>
    values.map((v, i) => getPoint(i, v)).map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[320px] mx-auto">
      {/* 배경 다각형 (5레벨) */}
      {Array.from({ length: levels }).map((_, lv) => {
        const r = ((lv + 1) / levels) * 100
        const points = Array.from({ length: n })
          .map((_, i) => getPoint(i, r))
          .map((p) => `${p.x},${p.y}`)
          .join(' ')
        return (
          <polygon
            key={lv}
            points={points}
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth={0.8}
          />
        )
      })}

      {/* 축 선 */}
      {labels.map((_, i) => {
        const p = getPoint(i, 100)
        return (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="currentColor" className="text-border" strokeWidth={0.5} />
        )
      })}

      {/* 기업 이상치 (반투명 시안) */}
      <polygon points={makePolygon(data2)} fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth={1.5} />

      {/* 사용자 값 (반투명 에메랄드) */}
      <polygon points={makePolygon(data1)} fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth={2} />

      {/* 사용자 점 */}
      {data1.map((v, i) => {
        const p = getPoint(i, v)
        return <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#10b981" />
      })}

      {/* 레이블 */}
      {labels.map((label, i) => {
        const p = getPoint(i, 115)
        const anchor = p.x < cx - 10 ? 'end' : p.x > cx + 10 ? 'start' : 'middle'
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-muted text-[10px]"
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

// ── 원형 점수 표시 컴포넌트 ──
function ScoreCircle({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 8) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" className="text-border" strokeWidth={3} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[13px] font-bold">
        {score}%
      </text>
    </svg>
  )
}

export default function CompanyFitPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = popularCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (company: Company) => {
    setSelectedCompany(company)
    setSearchQuery('')
    setShowDropdown(false)
  }

  const handleReset = () => {
    setSelectedCompany(null)
    setSearchQuery('')
  }

  return (
    <div className="relative">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">기업 적합도 분석</h1>
        <p className="text-[14px] text-muted mt-1">관심 기업과 나의 적합도를 분석하고 맞춤 전략을 세워보세요</p>
      </div>

      {/* ── 기업 검색 ── */}
      {!selectedCompany && (
        <>
          <div className="bg-card border border-border rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Search size={18} className="text-emerald-500" />
              <h2 className="text-[16px] font-bold text-foreground">기업 검색</h2>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="기업명 또는 업종으로 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/5 text-[13px] text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />

              {/* 검색 드롭다운 */}
              {showDropdown && searchQuery && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                  {filtered.map((c) => (
                    <button
                      key={c.id}
                      onMouseDown={() => handleSelect(c)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/10 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground">{c.name}</p>
                        <p className="text-[11px] text-muted">{c.industry}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── 인기 기업 카드 ── */}
          <div className="bg-card border border-border rounded-2xl shadow-soft p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} className="text-amber-500" />
              <h2 className="text-[16px] font-bold text-foreground">인기 기업</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularCompanies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className="flex items-center gap-3 p-4 border border-border/60 rounded-xl hover:bg-muted/10 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all hover:shadow-sm group"
                >
                  <div
                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-[13px] font-bold shadow-sm"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.name[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-semibold text-foreground group-hover:text-emerald-600 transition-colors">{c.name}</p>
                    <p className="text-[11px] text-muted">{c.industry}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── 분석 결과 ── */}
      {selectedCompany && (
        <>
          {/* 기업 개요 카드 */}
          <div className="bg-card border border-border rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-[20px] font-bold shadow-md"
                  style={{ backgroundColor: selectedCompany.color }}
                >
                  {selectedCompany.name[0]}
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-foreground">{selectedCompany.name}</h2>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 text-[11px] font-medium">
                    {selectedCompany.industry}
                  </span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-[12px] text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:bg-muted/10"
              >
                다른 기업 비교
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-muted shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">설립</p>
                  <p className="text-[13px] font-medium text-foreground">{selectedCompany.founded}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={15} className="text-muted shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">직원수</p>
                  <p className="text-[13px] font-medium text-foreground">{selectedCompany.employees}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={15} className="text-muted shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">매출</p>
                  <p className="text-[13px] font-medium text-foreground">{selectedCompany.revenue}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-muted shrink-0" />
                <div>
                  <p className="text-[10px] text-muted">본사</p>
                  <p className="text-[13px] font-medium text-foreground">{selectedCompany.location}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-muted mb-2">기업문화 키워드</p>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.cultureKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium border border-emerald-200/50 dark:border-emerald-800/30"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 적합도 분석 결과 (레이더 차트) */}
          <div className="bg-card border border-border rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={18} className="text-emerald-500" />
              <h2 className="text-[16px] font-bold text-foreground">적합도 분석 결과</h2>
            </div>
            <p className="text-[12px] text-muted mb-5">나의 프로필과 기업이 원하는 인재상을 비교 분석한 결과입니다</p>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* 레이더 차트 */}
              <div className="flex-1 w-full">
                <RadarChart labels={radarLabels} data1={userValues} data2={companyValues} />
                <div className="flex items-center justify-center gap-6 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-muted">나의 역량</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-[11px] text-muted">기업 기대치</span>
                  </div>
                </div>
              </div>

              {/* 종합 점수 */}
              <div className="flex flex-col items-center gap-3 p-6 border border-border/60 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-cyan-50/50 dark:from-emerald-950/10 dark:to-cyan-950/10">
                <p className="text-[12px] text-muted font-medium">종합 적합도</p>
                <div className="relative">
                  <svg width={100} height={100}>
                    <circle cx={50} cy={50} r={42} fill="none" stroke="currentColor" className="text-border" strokeWidth={5} />
                    <circle
                      cx={50}
                      cy={50}
                      r={42}
                      fill="none"
                      stroke="url(#matchGrad)"
                      strokeWidth={5}
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - overallMatch / 100)}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <text x={50} y={46} textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[24px] font-bold">
                      {overallMatch}
                    </text>
                    <text x={50} y={66} textAnchor="middle" dominantBaseline="central" className="fill-muted text-[11px]">
                      / 100
                    </text>
                  </svg>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[12px] font-semibold">
                  적합도 높음
                </span>
              </div>
            </div>

            {/* 항목별 바 */}
            <div className="mt-6 space-y-3">
              {radarLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[12px] text-muted w-20 shrink-0 text-right">{label}</span>
                  <div className="flex-1 h-2 bg-border/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4]"
                      style={{ width: `${userValues[i]}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-semibold text-foreground w-10">{userValues[i]}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 상세 분석 카드 3개 ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* 기업문화 적합도 */}
            <div className="bg-card border border-border rounded-2xl shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${analysisCards[0].bgColor} flex items-center justify-center`}>
                    <Heart size={16} className={analysisCards[0].color} />
                  </div>
                  <h3 className="text-[14px] font-bold text-foreground">{analysisCards[0].title}</h3>
                </div>
                <ScoreCircle score={analysisCards[0].score} size={48} />
              </div>

              <div className="space-y-2.5 mb-4">
                {analysisCards[0].details.map((d) => (
                  <div key={d.label}>
                    <p className="text-[10px] text-muted mb-0.5">{d.label}</p>
                    <p className="text-[12px] text-foreground font-medium">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20">
                  <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">{analysisCards[0].good}</p>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/20">
                  <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-amber-700 dark:text-amber-400">{analysisCards[0].caution}</p>
                </div>
              </div>
            </div>

            {/* 연봉/복지 수준 */}
            <div className="bg-card border border-border rounded-2xl shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${analysisCards[1].bgColor} flex items-center justify-center`}>
                    <DollarSign size={16} className={analysisCards[1].color} />
                  </div>
                  <h3 className="text-[14px] font-bold text-foreground">{analysisCards[1].title}</h3>
                </div>
                <ScoreCircle score={analysisCards[1].score} size={48} />
              </div>

              <div className="space-y-2.5 mb-4">
                {analysisCards[1].details.map((d) => (
                  <div key={d.label}>
                    <p className="text-[10px] text-muted mb-0.5">{d.label}</p>
                    <p className="text-[12px] text-foreground font-medium">{d.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] text-muted mb-2">주요 복지</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysisCards[1].benefits!.map((b) => (
                    <span key={b} className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 text-[11px] font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 성장 가능성 */}
            <div className="bg-card border border-border rounded-2xl shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${analysisCards[2].bgColor} flex items-center justify-center`}>
                    <TrendingUp size={16} className={analysisCards[2].color} />
                  </div>
                  <h3 className="text-[14px] font-bold text-foreground">{analysisCards[2].title}</h3>
                </div>
                <ScoreCircle score={analysisCards[2].score} size={48} />
              </div>

              <div className="space-y-2.5">
                {analysisCards[2].details.map((d) => (
                  <div key={d.label} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/5 border border-border/40">
                    <p className="text-[11px] text-muted">{d.label}</p>
                    <p className="text-[12px] text-foreground font-semibold">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 추천 공고 ── */}
          <div className="bg-card border border-border rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={18} className="text-emerald-500" />
              <h2 className="text-[16px] font-bold text-foreground">추천 공고</h2>
              <span className="text-[11px] text-muted ml-1">{selectedCompany.name}에서 채용 중</span>
            </div>

            <div className="space-y-3">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border border-border/60 rounded-xl hover:bg-muted/5 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
                      style={{ backgroundColor: selectedCompany.color }}
                    >
                      {selectedCompany.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground group-hover:text-emerald-600 transition-colors">{job.title}</p>
                      <p className="text-[11px] text-muted">{job.team} &middot; {job.type} &middot; ~{job.deadline}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-muted group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* 다른 기업 비교 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[13px] font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Building2 size={16} />
              다른 기업 비교하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}
