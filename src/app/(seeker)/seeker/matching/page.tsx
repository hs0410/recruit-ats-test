'use client'

import { useState } from 'react'
import {
  Target,
  MapPin,
  Briefcase,
  Award,
  Code2,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
  ChevronRight,
  Sparkles,
  User,
  Building2,
  Clock,
} from 'lucide-react'

/* ────────────────────────────────────────
   AI 직무 매칭 페이지
   프로필 기반 추천 + 갭 분석
   ──────────────────────────────────────── */

const profileSummary = {
  name: '김지원',
  targetRole: '풀스택 개발자',
  experience: '3년',
  topSkills: ['React', 'TypeScript', 'Node.js', 'SQL'],
  certs: 5,
  preferredLocation: '서울 강남/판교',
}

interface MatchBreakdown {
  label: string
  value: number
  icon: typeof Code2
}

interface JobMatch {
  id: number
  company: string
  position: string
  matchRate: number
  salary: string
  location: string
  type: string
  breakdown: MatchBreakdown[]
}

const jobMatches: JobMatch[] = [
  {
    id: 1,
    company: '토스',
    position: '프론트엔드 개발자',
    matchRate: 92,
    salary: '6,000~8,000만원',
    location: '서울 강남',
    type: '정규직',
    breakdown: [
      { label: '기술스택', value: 95, icon: Code2 },
      { label: '경력 적합도', value: 88, icon: Briefcase },
      { label: '자격증', value: 90, icon: Award },
      { label: '위치 선호도', value: 95, icon: MapPin },
    ],
  },
  {
    id: 2,
    company: '카카오',
    position: '풀스택 개발자',
    matchRate: 87,
    salary: '5,500~7,500만원',
    location: '판교',
    type: '정규직',
    breakdown: [
      { label: '기술스택', value: 90, icon: Code2 },
      { label: '경력 적합도', value: 85, icon: Briefcase },
      { label: '자격증', value: 82, icon: Award },
      { label: '위치 선호도', value: 90, icon: MapPin },
    ],
  },
  {
    id: 3,
    company: '라인',
    position: '백엔드 개발자',
    matchRate: 81,
    salary: '5,000~7,000만원',
    location: '판교',
    type: '정규직',
    breakdown: [
      { label: '기술스택', value: 78, icon: Code2 },
      { label: '경력 적합도', value: 85, icon: Briefcase },
      { label: '자격증', value: 80, icon: Award },
      { label: '위치 선호도', value: 82, icon: MapPin },
    ],
  },
  {
    id: 4,
    company: '쿠팡',
    position: '프론트엔드 개발자',
    matchRate: 78,
    salary: '5,500~7,000만원',
    location: '서울 송파',
    type: '정규직',
    breakdown: [
      { label: '기술스택', value: 85, icon: Code2 },
      { label: '경력 적합도', value: 80, icon: Briefcase },
      { label: '자격증', value: 70, icon: Award },
      { label: '위치 선호도', value: 75, icon: MapPin },
    ],
  },
  {
    id: 5,
    company: '네이버',
    position: '웹 개발자',
    matchRate: 74,
    salary: '5,000~6,500만원',
    location: '판교',
    type: '정규직',
    breakdown: [
      { label: '기술스택', value: 80, icon: Code2 },
      { label: '경력 적합도', value: 72, icon: Briefcase },
      { label: '자격증', value: 68, icon: Award },
      { label: '위치 선호도', value: 78, icon: MapPin },
    ],
  },
  {
    id: 6,
    company: '당근',
    position: '풀스택 개발자',
    matchRate: 71,
    salary: '5,000~7,000만원',
    location: '서울 서초',
    type: '정규직',
    breakdown: [
      { label: '기술스택', value: 75, icon: Code2 },
      { label: '경력 적합도', value: 70, icon: Briefcase },
      { label: '자격증', value: 65, icon: Award },
      { label: '위치 선호도', value: 72, icon: MapPin },
    ],
  },
]

const gapSkills = [
  { skill: 'Docker / Kubernetes', reason: '컨테이너 기술은 대부분의 백엔드/풀스택 공고에서 우대', priority: '높음' },
  { skill: 'AWS / 클라우드', reason: '클라우드 경험은 시니어 레벨 전환에 필수 역량', priority: '높음' },
  { skill: 'CI/CD 파이프라인', reason: 'DevOps 역량으로 매칭률 평균 8% 상승 기대', priority: '보통' },
  { skill: 'GraphQL', reason: '모던 API 설계 역량으로 프론트엔드 매칭률 향상', priority: '보통' },
]

const priorityColor = {
  '높음': 'text-red-500 bg-red-50 dark:bg-red-950/30',
  '보통': 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
}

/* SVG 원형 프로그레스 컴포넌트 */
function CircularProgress({ value, size = 64, strokeWidth = 5 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const color =
    value >= 85 ? '#10b981' : value >= 70 ? '#06b6d4' : '#f59e0b'

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-gray-100 dark:text-gray-800"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-700"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dy="0.35em"
        className="fill-foreground text-[14px] font-bold"
      >
        {value}%
      </text>
    </svg>
  )
}

export default function MatchingPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">AI 직무 매칭</h1>
        <p className="text-[14px] text-muted mt-1">프로필 기반으로 가장 적합한 포지션을 찾아드립니다</p>
      </div>

      {/* ── 프로필 요약 ── */}
      <div className="bg-gradient-to-r from-[#10b981]/10 to-[#06b6d4]/10 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
              <User size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-foreground">{profileSummary.name}</h2>
              <p className="text-[12px] text-muted">매칭에 사용되는 프로필 요약</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-[11px] text-muted">목표 직무</p>
              <p className="text-[13px] font-semibold text-foreground">{profileSummary.targetRole}</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="text-center">
              <p className="text-[11px] text-muted">경력</p>
              <p className="text-[13px] font-semibold text-foreground">{profileSummary.experience}</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="text-center">
              <p className="text-[11px] text-muted">보유 자격증</p>
              <p className="text-[13px] font-semibold text-foreground">{profileSummary.certs}개</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="text-center">
              <p className="text-[11px] text-muted">선호 지역</p>
              <p className="text-[13px] font-semibold text-foreground">{profileSummary.preferredLocation}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {profileSummary.topSkills.map((s) => (
            <span key={s} className="px-3 py-1 bg-white/60 dark:bg-white/10 border border-emerald-200 dark:border-emerald-700 rounded-lg text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── 매칭 결과 ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Target size={18} className="text-emerald-500" />
          <h2 className="text-[16px] font-bold text-foreground">매칭 결과</h2>
          <span className="text-[12px] text-muted ml-1">매칭률 높은 순</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {jobMatches.map((job, idx) => {
            const isExpanded = expandedJob === job.id
            return (
              <div
                key={job.id}
                className="bg-card border border-border rounded-2xl shadow-soft hover-lift transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <CircularProgress value={job.matchRate} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">
                          #{idx + 1}
                        </span>
                        <p className="text-[11px] text-muted">{job.type}</p>
                      </div>
                      <h3 className="text-[15px] font-bold text-foreground">{job.position}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Building2 size={12} className="text-muted" />
                        <span className="text-[12px] text-muted">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <MapPin size={11} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <TrendingUp size={11} />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                    className="mt-3 flex items-center gap-1 text-[12px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    매칭 상세 보기
                    <ChevronRight size={13} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-border/60 px-5 py-4 bg-muted/5">
                    <div className="space-y-2.5">
                      {job.breakdown.map((b) => {
                        const Icon = b.icon
                        return (
                          <div key={b.label} className="flex items-center gap-3">
                            <Icon size={13} className="text-muted shrink-0" />
                            <span className="text-[12px] text-muted w-[80px] shrink-0">{b.label}</span>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] transition-all duration-500"
                                style={{ width: `${b.value}%` }}
                              />
                            </div>
                            <span className="text-[12px] font-semibold text-foreground w-[36px] text-right">{b.value}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 갭 분석 + CTA ── */}
      <div className="grid grid-cols-3 gap-6">
        {/* 부족한 역량 */}
        <div className="col-span-2 bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle size={18} className="text-amber-500" />
            <h2 className="text-[16px] font-bold text-foreground">부족한 역량</h2>
          </div>
          <p className="text-[12px] text-muted mb-5">아래 역량을 보완하면 매칭률이 올라갑니다</p>

          <div className="space-y-3">
            {gapSkills.map((gap) => (
              <div
                key={gap.skill}
                className="flex items-center justify-between border border-border/60 rounded-xl px-4 py-3.5 hover:bg-muted/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                    <Code2 size={15} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{gap.skill}</p>
                    <p className="text-[11px] text-muted">{gap.reason}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg ${priorityColor[gap.priority as keyof typeof priorityColor]}`}>
                  우선순위: {gap.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 카드 */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-[#10b981] to-[#06b6d4] rounded-2xl p-6 text-white">
            <Sparkles size={24} className="mb-3 opacity-80" />
            <h3 className="text-[16px] font-bold mb-2">프로필 업데이트하면 매칭률이 올라갑니다</h3>
            <p className="text-[12px] opacity-80 leading-relaxed mb-4">
              스킬, 자격증, 경력 정보를 최신으로 유지하면 더 정확한 매칭 결과를 받아볼 수 있어요.
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5">
              프로필 업데이트하기
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={15} className="text-muted" />
              <p className="text-[12px] text-muted">마지막 매칭 분석</p>
            </div>
            <p className="text-[14px] font-bold text-foreground">2026년 4월 6일</p>
            <p className="text-[11px] text-muted mt-1">매일 자동으로 매칭 결과가 업데이트됩니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}
