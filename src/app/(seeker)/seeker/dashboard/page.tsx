'use client'

import { useState, useEffect } from 'react'
import {
  FileText, CheckCircle2, Calendar, Award, ArrowUpRight,
  MapPin, Banknote, Lightbulb, ChevronLeft, ChevronRight,
  PenLine, Search, BookOpen, Clock, Building2, Percent,
  CircleDot, Circle, XCircle, Trophy
} from 'lucide-react'

/* ── 통계 데이터 ── */
const stats = [
  { label: '지원한 공고', value: '12건', icon: FileText, gradient: 'from-[#10b981] to-[#06b6d4]' },
  { label: '서류 합격', value: '4건', icon: CheckCircle2, gradient: 'from-[#06b6d4] to-[#3b82f6]' },
  { label: '면접 예정', value: '2건', icon: Calendar, gradient: 'from-[#8b5cf6] to-[#ec4899]' },
  { label: '보유 자격증', value: '5개', icon: Award, gradient: 'from-[#f59e0b] to-[#ef4444]' },
]

/* ── 지원 현황 타임라인 ── */
const applicationTimeline = [
  { company: '토스', position: '프론트엔드 개발자', date: '2026.04.01', status: '면접대기', statusColor: 'bg-[#eef2ff] text-[#6366f1]' },
  { company: '카카오', position: 'UX 디자이너', date: '2026.03.28', status: '서류심사중', statusColor: 'bg-[#fef3c7] text-[#d97706]' },
  { company: '네이버', position: 'PM', date: '2026.03.25', status: '최종합격', statusColor: 'bg-[#d1fae5] text-[#059669]' },
  { company: '쿠팡', position: '백엔드 개발자', date: '2026.03.20', status: '지원완료', statusColor: 'bg-[#f2f4f6] text-[#6b7280]' },
  { company: '라인', position: 'iOS 개발자', date: '2026.03.15', status: '불합격', statusColor: 'bg-[#fee2e2] text-[#dc2626]' },
]

/* ── 추천 공고 ── */
const recommendedJobs = [
  {
    company: '토스',
    position: '프론트엔드 개발자',
    location: '서울 강남구',
    salary: '6,000 ~ 8,000만원',
    matchRate: 85,
    tags: ['React', 'TypeScript', '3년 이상'],
  },
  {
    company: '당근',
    position: 'Product Designer',
    location: '서울 서초구',
    salary: '5,500 ~ 7,500만원',
    matchRate: 78,
    tags: ['Figma', 'UX', '2년 이상'],
  },
  {
    company: '배달의민족',
    position: '서비스 기획자',
    location: '서울 송파구',
    salary: '5,000 ~ 7,000만원',
    matchRate: 72,
    tags: ['기획', 'SQL', '경력무관'],
  },
]

/* ── 오늘의 취업 팁 ── */
const careerTips = [
  '이력서에 숫자로 된 성과를 넣으면 서류 통과율이 40% 이상 높아집니다',
  'LinkedIn 프로필을 주 1회 업데이트하면 채용담당자에게 3배 더 노출됩니다',
  '면접 전 회사의 최근 뉴스와 IR 자료를 확인하면 질문 대응력이 크게 향상됩니다',
  '자기소개서는 "경험 → 역량 → 기여"의 STAR 구조로 작성하세요',
  '포트폴리오에 프로젝트별 "나의 역할"과 "정량 성과"를 명확히 기재하세요',
  '면접 후 감사 이메일을 보내면 최종 합격률이 22% 높아진다는 연구가 있습니다',
  '희망 연봉 협상 시 시장 데이터를 근거로 제시하면 설득력이 높아집니다',
]

/* ── 상태 아이콘 매핑 ── */
const statusIconMap: Record<string, typeof CircleDot> = {
  '면접대기': Clock,
  '서류심사중': CircleDot,
  '최종합격': Trophy,
  '지원완료': Circle,
  '불합격': XCircle,
}

export default function SeekerDashboardPage() {
  const [tipIdx, setTipIdx] = useState(0)

  useEffect(() => {
    setTipIdx(Math.floor(Math.random() * careerTips.length))
    const interval = setInterval(() => {
      setTipIdx(prev => (prev + 1) % careerTips.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* 환영 배너 */}
      <div className="bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-2xl p-6 mb-8 shadow-soft">
        <h1 className="text-[22px] font-bold text-white">
          안녕하세요, 김지원님! 오늘도 한 걸음 더 가까이 🎯
        </h1>
        <p className="text-[13px] text-white/80 mt-1">
          지원 현황과 추천 공고를 확인하고, 커리어 목표에 다가가세요
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft hover-lift cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.gradient} p-2.5 rounded-xl`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <p className="text-[28px] font-bold text-foreground">{stat.value}</p>
              <p className="text-[13px] text-muted mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* 오늘의 취업 팁 */}
      <div className="bg-gradient-to-r from-[#d1fae5] to-[#cffafe] rounded-2xl p-5 mb-8 border border-[#10b981]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Lightbulb size={20} className="text-[#f59e0b] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider">Today&apos;s Tip</p>
              <p className="text-[13px] text-foreground font-medium mt-0.5 truncate">{careerTips[tipIdx]}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-4">
            <button onClick={() => setTipIdx((tipIdx - 1 + careerTips.length) % careerTips.length)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted">
              <ChevronLeft size={14} />
            </button>
            <span className="text-[11px] text-muted font-medium w-8 text-center">{tipIdx + 1}/{careerTips.length}</span>
            <button onClick={() => setTipIdx((tipIdx + 1) % careerTips.length)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: '이력서 업데이트', desc: '프로필을 최신으로', icon: PenLine, gradient: 'from-[#10b981] to-[#06b6d4]', href: '/seeker/profile' },
          { label: '채용공고 탐색', desc: '새로운 기회 찾기', icon: Search, gradient: 'from-[#06b6d4] to-[#3b82f6]', href: '/seeker/jobs' },
          { label: '면접 준비하기', desc: '예상 질문 & 가이드', icon: BookOpen, gradient: 'from-[#8b5cf6] to-[#ec4899]', href: '/seeker/interview' },
        ].map((action) => {
          const Icon = action.icon
          return (
            <button key={action.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft hover-lift group text-left">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-[14px] font-bold text-foreground group-hover:text-[#10b981] transition-colors">{action.label}</p>
              <p className="text-[12px] text-muted mt-0.5">{action.desc}</p>
            </button>
          )
        })}
      </div>

      {/* 하단 2컬럼: 지원 현황 + 추천 공고 */}
      <div className="grid grid-cols-5 gap-5">
        {/* My Progress — 지원 현황 타임라인 */}
        <div className="col-span-3 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-bold text-foreground">나의 지원 현황</h2>
            <button className="text-[13px] text-[#10b981] font-medium flex items-center gap-1 hover:underline">
              전체보기 <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-1">
            {applicationTimeline.map((app, i) => {
              const StatusIcon = statusIconMap[app.status] || Circle
              return (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-card-hover flex items-center justify-center">
                      <StatusIcon size={14} className="text-muted" />
                    </div>
                    <div>
                      <p className="text-[13px]">
                        <span className="font-semibold text-foreground">{app.company}</span>
                        <span className="text-muted"> · {app.position}</span>
                      </p>
                      <p className="text-[11px] text-muted mt-0.5">{app.date}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${app.statusColor}`}>
                    {app.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 추천 공고 */}
        <div className="col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-bold text-foreground">추천 공고</h2>
            <button className="text-[13px] text-[#10b981] font-medium flex items-center gap-1 hover:underline">
              더보기 <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {recommendedJobs.map((job, i) => (
              <div key={i} className="rounded-xl bg-card-hover p-4 hover-lift cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 size={13} className="text-muted" />
                      <p className="text-[12px] text-muted">{job.company}</p>
                    </div>
                    <p className="text-[14px] font-semibold text-foreground mt-1">{job.position}</p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white flex items-center gap-0.5">
                    <Percent size={10} /> {job.matchRate}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2.5 text-[11px] text-muted">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Banknote size={11} /> {job.salary}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#d1fae5] text-[#059669]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
