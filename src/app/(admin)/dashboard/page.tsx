'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Briefcase, Calendar, TrendingUp, ArrowUpRight, Clock, Sparkles, BookOpen, ClipboardCheck, Newspaper, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'

const stats = [
  { label: '진행중 후보자', value: '24', change: '+3', icon: Users, gradient: 'from-[#3182f6] to-[#6366f1]' },
  { label: '진행중 공고', value: '5', change: '+1', icon: Briefcase, gradient: 'from-[#00c471] to-[#06b6d4]' },
  { label: '이번 주 면접', value: '8', change: '0', icon: Calendar, gradient: 'from-[#8b5cf6] to-[#ec4899]' },
  { label: '평균 리드타임', value: '18일', change: '-2', icon: TrendingUp, gradient: 'from-[#f59e0b] to-[#ef4444]' },
]

const pipeline = [
  { stage: '서류접수', count: 8, color: '#8b95a1', bg: '#f2f4f6' },
  { stage: '1차면접', count: 6, color: '#3182f6', bg: '#e8f3ff' },
  { stage: '2차면접', count: 4, color: '#6366f1', bg: '#eef2ff' },
  { stage: '처우협의', count: 3, color: '#8b5cf6', bg: '#f3e8ff' },
  { stage: '입사확정', count: 3, color: '#00c471', bg: '#e8faf0' },
]

const recentActivities = [
  { text: '김현수', action: '1차면접 → 2차면접', badge: '단계 전환', badgeColor: 'bg-primary-light text-primary', time: '2시간 전' },
  { text: '이지은', action: '서류접수 (프론트엔드 개발자)', badge: '신규 지원', badgeColor: 'bg-success-light text-success', time: '3시간 전' },
  { text: '박서준', action: '처우 제안 완료', badge: '처우', badgeColor: 'bg-[#f3e8ff] text-[#8b5cf6]', time: '5시간 전' },
  { text: '최유진', action: '1차면접 합격', badge: '합격', badgeColor: 'bg-success-light text-success', time: '어제' },
  { text: '한소희', action: '입사 확정', badge: '입사', badgeColor: 'bg-primary-light text-primary', time: '어제' },
]

const upcomingInterviews = [
  { name: '박서준', job: '프론트엔드 개발자', time: '오늘 10:00', stage: '1차' },
  { name: '최유진', job: '프론트엔드 개발자', time: '오늘 14:00', stage: '1차' },
  { name: '정민호', job: '백엔드 개발자', time: '내일 11:00', stage: '2차' },
]

const hiringTips = [
  'JD에 급여 범위를 명시하면 지원율이 30% 이상 증가합니다',
  '면접 후 24시간 내 피드백을 제공하면 후보자 만족도가 크게 향상됩니다',
  '구조화 면접은 비구조화 면접보다 예측 타당도가 2배 이상 높습니다',
  '채용 브랜딩에 투자한 기업은 채용 비용이 평균 43% 절감됩니다',
  '레퍼런스 체크는 직속 상사 + 동료 조합이 가장 효과적입니다',
  '채용 리드타임이 1주 늘어날 때마다 합격자 이탈률이 15% 증가합니다',
  '면접관 교육을 받은 팀의 채용 성공률이 50% 더 높습니다',
]

const quickLinks = [
  { href: '/jobs/new', label: 'JD 작성', desc: 'AI로 공고 생성', icon: Sparkles, gradient: 'from-[#3182f6] to-[#6366f1]' },
  { href: '/guide', label: '면접 가이드', desc: '질문 & 평가', icon: BookOpen, gradient: 'from-[#00c471] to-[#06b6d4]' },
  { href: '/evaluation', label: '평가 기준', desc: '포지션별 루브릭', icon: ClipboardCheck, gradient: 'from-[#8b5cf6] to-[#ec4899]' },
  { href: '/insights', label: '인사이트', desc: '트렌드 & 법률', icon: Newspaper, gradient: 'from-[#f59e0b] to-[#ef4444]' },
]

export default function DashboardPage() {
  const [tipIdx, setTipIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIdx(prev => (prev + 1) % hiringTips.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">대시보드</h1>
        <p className="text-[14px] text-muted mt-1">채용 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change.startsWith('+') && stat.change !== '+0'
          const isNegative = stat.change.startsWith('-')
          return (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft hover-lift cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.gradient} p-2.5 rounded-xl`}>
                  <Icon size={18} className="text-white" />
                </div>
                {stat.change !== '0' && (
                  <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${
                    isPositive ? 'bg-success-light text-success' :
                    isNegative ? 'bg-danger-light text-danger' :
                    'bg-card-hover text-muted'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-[28px] font-bold text-foreground">{stat.value}</p>
              <p className="text-[13px] text-muted mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* 채용 팁 캐러셀 */}
      <div className="bg-gradient-to-r from-primary-light to-[#eef2ff] rounded-2xl p-5 mb-8 border border-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Lightbulb size={20} className="text-[#f59e0b] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">Hiring Tip</p>
              <p className="text-[13px] text-foreground font-medium mt-0.5 truncate">{hiringTips[tipIdx]}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-4">
            <button onClick={() => setTipIdx((tipIdx - 1 + hiringTips.length) % hiringTips.length)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted">
              <ChevronLeft size={14} />
            </button>
            <span className="text-[11px] text-muted font-medium w-8 text-center">{tipIdx + 1}/{hiringTips.length}</span>
            <button onClick={() => setTipIdx((tipIdx + 1) % hiringTips.length)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 빠른 이동 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href} className="bg-card rounded-2xl border border-border p-5 shadow-soft hover-lift group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors">{link.label}</p>
              <p className="text-[12px] text-muted mt-0.5">{link.desc}</p>
            </Link>
          )
        })}
      </div>

      {/* 파이프라인 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-bold text-foreground">파이프라인 현황</h2>
          <Link href="/pipeline" className="text-[13px] text-primary font-medium flex items-center gap-1 hover:underline">
            상세보기 <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="flex gap-3">
          {pipeline.map((item) => (
            <div key={item.stage} className="flex-1">
              <div
                className="rounded-2xl py-8 text-center hover-lift cursor-pointer"
                style={{ backgroundColor: item.bg }}
              >
                <p className="text-[32px] font-bold" style={{ color: item.color }}>{item.count}</p>
              </div>
              <p className="text-[13px] text-muted text-center mt-2.5 font-medium">{item.stage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 2컬럼 */}
      <div className="grid grid-cols-5 gap-5">
        {/* 최근 활동 */}
        <div className="col-span-3 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <h2 className="text-[16px] font-bold text-foreground mb-5">최근 활동</h2>
          <div className="space-y-1">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-card-hover flex items-center justify-center text-[13px] font-semibold text-muted">
                    {activity.text[0]}
                  </div>
                  <div>
                    <p className="text-[13px]">
                      <span className="font-semibold text-foreground">{activity.text}</span>
                      <span className="text-muted"> · {activity.action}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${activity.badgeColor}`}>
                    {activity.badge}
                  </span>
                  <span className="text-[12px] text-muted">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 면접 */}
        <div className="col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <h2 className="text-[16px] font-bold text-foreground mb-5">다가오는 면접</h2>
          <div className="space-y-3">
            {upcomingInterviews.map((interview, i) => (
              <div key={i} className="rounded-xl bg-card-hover p-4 hover-lift cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[14px] font-semibold text-foreground">{interview.name}</p>
                    <p className="text-[12px] text-muted mt-0.5">{interview.job}</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-light text-primary">
                    {interview.stage}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-[12px] text-muted">
                  <Clock size={12} />
                  {interview.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
