'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UserCircle,
  ClipboardList,
  FileSearch,
  PenTool,
  Building2,
  Search,
  Target,
  BookOpen,
  Award,
  Sparkles,
  LogOut,
  ArrowRight,
} from 'lucide-react'

/* ────────────────────────────────────────
   구직자용 사이드바 네비게이션
   나의 현황 → 취업 준비 → 탐색 → 관리
   ──────────────────────────────────────── */

const myNav = [
  { href: '/seeker/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/seeker/profile', label: '내 프로필', icon: UserCircle },
]

const prepToolNav = [
  { href: '/seeker/resume-check', label: '공고 맞춤 이력서 분석', icon: FileSearch },
  { href: '/seeker/cover-letter', label: 'AI 자기소개서 코치', icon: PenTool },
  { href: '/seeker/company-fit', label: '기업 적합도 분석', icon: Building2 },
]

const exploreNav = [
  { href: '/seeker/jobs', label: '채용공고 탐색', icon: Search },
  { href: '/seeker/matching', label: 'AI 직무 매칭', icon: Target },
]

const manageNav = [
  { href: '/seeker/interview', label: '면접 준비실', icon: BookOpen },
  { href: '/seeker/certifications', label: '자격증 관리', icon: Award },
]

const sections = [
  { label: '나의 현황', items: myNav },
  { label: '취업 준비', items: prepToolNav },
  { label: '탐색', items: exploreNav },
  { label: '관리', items: manageNav },
]

function NavLink({ item, pathname }: { item: typeof myNav[0]; pathname: string }) {
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + '/')
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all duration-200 ${
        isActive
          ? 'bg-emerald-50 text-emerald-700 font-semibold'
          : 'text-sidebar-text hover:bg-sidebar-hover'
      }`}
    >
      <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
      {item.label}
    </Link>
  )
}

export default function SeekerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] bg-sidebar-bg border-r border-border flex flex-col h-screen fixed left-0 top-0">
      {/* 로고 */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-foreground tracking-tight">Talent Flow</h1>
            <p className="text-[11px] text-muted -mt-0.5">구직자</p>
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-2">
        {sections.map((section, idx) => (
          <div key={section.label}>
            {idx > 0 && <div className="!my-2 mx-2 border-t border-border/60" />}
            <p className="px-3 text-[10px] font-semibold text-muted/50 uppercase tracking-wider mb-0.5">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        ))}
      </nav>

      {/* 하단 */}
      <div className="px-3 pb-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-[13px] text-muted hover:text-foreground transition-colors w-full rounded-lg hover:bg-sidebar-hover"
        >
          <ArrowRight size={16} strokeWidth={1.8} />
          역할 선택으로 돌아가기
        </Link>
        <button
          onClick={() => { localStorage.removeItem('ats-token'); window.location.href = '/' }}
          className="flex items-center gap-2 px-3 py-2 text-[13px] text-muted hover:text-foreground transition-colors w-full rounded-lg hover:bg-sidebar-hover"
        >
          <LogOut size={16} strokeWidth={1.8} />
          로그아웃
        </button>
      </div>
    </aside>
  )
}
