'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Kanban,
  Users,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
  Sparkles,
  BookOpen,
  ClipboardCheck,
  Newspaper,
  FileSearch,
  Target,
  TrendingUp,
} from 'lucide-react'

const mainNav = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/pipeline', label: '파이프라인', icon: Kanban },
  { href: '/candidates', label: '후보자', icon: Users },
  { href: '/jobs', label: '채용 공고', icon: Briefcase },
  { href: '/schedule', label: '면접 일정', icon: Calendar },
]

const toolNav = [
  { href: '/jobs/new', label: 'JD 작성', icon: Sparkles },
  { href: '/guide', label: '면접 가이드', icon: BookOpen },
  { href: '/evaluation', label: '평가 기준', icon: ClipboardCheck },
  { href: '/insights', label: '인사이트', icon: Newspaper },
]

const aiNav = [
  { href: '/resume', label: 'AI 이력서 분석', icon: FileSearch },
  { href: '/matching', label: 'JD-이력서 매칭', icon: Target },
  { href: '/market', label: '채용 시장 현황', icon: TrendingUp },
]

const bottomNav = [
  { href: '/settings', label: '설정', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] bg-sidebar-bg border-r border-border flex flex-col min-h-screen fixed left-0 top-0">
      {/* 로고 */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-foreground tracking-tight">채용 ATS</h1>
            <p className="text-[11px] text-muted -mt-0.5">Applicant Tracking</p>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/jobs' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-active text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text hover:bg-sidebar-hover'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              {item.label}
            </Link>
          )
        })}

        {/* 구분선 */}
        <div className="!my-3 mx-2 border-t border-border/60" />
        <p className="px-3 text-[10px] font-semibold text-muted/50 uppercase tracking-wider mb-1">채용 도구</p>

        {toolNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-active text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text hover:bg-sidebar-hover'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              {item.label}
            </Link>
          )
        })}

        {/* 구분선 */}
        <div className="!my-3 mx-2 border-t border-border/60" />
        <p className="px-3 text-[10px] font-semibold text-muted/50 uppercase tracking-wider mb-1">AI 분석</p>

        {aiNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-active text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text hover:bg-sidebar-hover'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              {item.label}
            </Link>
          )
        })}

        {/* 구분선 */}
        <div className="!my-3 mx-2 border-t border-border/60" />

        {bottomNav.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-active text-sidebar-active-text font-semibold'
                  : 'text-sidebar-text hover:bg-sidebar-hover'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* 하단 */}
      <div className="px-3 pb-5">
        <div className="rounded-xl bg-gradient-to-br from-primary-light to-[#f0e6ff] p-4 mb-4">
          <p className="text-[12px] font-semibold text-foreground">Pro 업그레이드</p>
          <p className="text-[11px] text-muted mt-1 leading-relaxed">더 많은 기능을 사용해보세요</p>
          <button className="mt-3 text-[11px] font-semibold text-primary hover:underline">
            자세히 보기 →
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 text-[13px] text-muted hover:text-foreground transition-colors w-full rounded-lg hover:bg-sidebar-hover">
          <LogOut size={16} strokeWidth={1.8} />
          로그아웃
        </button>
      </div>
    </aside>
  )
}
