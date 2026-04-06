'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  Users,
  FileSearch,
  Target,
  Kanban,
  Calendar,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Newspaper,
  Settings,
  LogOut,
} from 'lucide-react'

/* ────────────────────────────────────────
   채용 워크플로우 순서로 사이드바 구성
   기획 → 서류전형 → 전형운영 → 인사이트
   ──────────────────────────────────────── */

const planningNav = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/jobs', label: '채용 공고', icon: Briefcase },
  { href: '/jobs/new', label: 'JD 작성', icon: Sparkles },
]

const screeningNav = [
  { href: '/candidates', label: '후보자 관리', icon: Users },
  { href: '/resume', label: 'AI 이력서 분석', icon: FileSearch },
  { href: '/matching', label: 'JD-이력서 매칭', icon: Target },
]

const processNav = [
  { href: '/pipeline', label: '파이프라인', icon: Kanban },
  { href: '/schedule', label: '면접 일정', icon: Calendar },
  { href: '/guide', label: '면접 가이드', icon: BookOpen },
  { href: '/evaluation', label: '평가 기준', icon: ClipboardCheck },
]

const insightNav = [
  { href: '/market', label: '채용 시장 현황', icon: TrendingUp },
  { href: '/insights', label: '인사이트', icon: Newspaper },
]

const sections = [
  { label: '채용 기획', items: planningNav },
  { label: '서류 전형', items: screeningNav },
  { label: '전형 운영', items: processNav },
  { label: '채용 인사이트', items: insightNav },
]

function NavLink({ item, pathname }: { item: typeof planningNav[0]; pathname: string }) {
  const isActive =
    pathname === item.href ||
    (item.href !== '/jobs' && item.href !== '/jobs/new' && pathname.startsWith(item.href))
  const Icon = item.icon

  return (
    <Link
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
}

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

      {/* 네비게이션 — 전형 절차 순서 */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={section.label}>
            {idx > 0 && <div className="!my-3 mx-2 border-t border-border/60" />}
            <p className="px-3 text-[10px] font-semibold text-muted/50 uppercase tracking-wider mb-1">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        ))}

        {/* 설정 */}
        <div className="!my-3 mx-2 border-t border-border/60" />
        <NavLink
          item={{ href: '/settings', label: '설정', icon: Settings }}
          pathname={pathname}
        />
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
