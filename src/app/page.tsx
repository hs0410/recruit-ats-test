'use client'

import Link from 'next/link'
import { Sparkles, GraduationCap, Briefcase, CheckCircle2, Shield } from 'lucide-react'

const roles = [
  {
    title: '구직자',
    description: '공고 맞춤 이력서 분석, AI 자소서 코칭, 기업 적합도까지',
    icon: GraduationCap,
    href: '/seeker/dashboard',
    features: [
      '공고 기반 이력서 분석 & 키워드 매칭',
      'AI 자기소개서 코치 & 기업 적합도',
      '면접 준비 & 자격증 관리',
    ],
    gradient: 'from-indigo-500 to-purple-600',
    gradientLight: 'from-indigo-50 to-purple-50',
    iconBg: 'bg-indigo-100 text-indigo-600',
    borderHover: 'hover:border-indigo-300',
    buttonGradient: 'from-indigo-500 to-purple-600',
  },
  {
    title: '채용관리자',
    description: '채용 전 과정을 효율적으로 관리하세요',
    icon: Briefcase,
    href: '/dashboard',
    features: [
      '파이프라인 & 전형 관리',
      'AI 이력서 분석 & JD 매칭',
      '인재풀 데이터 분석',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    gradientLight: 'from-blue-50 to-cyan-50',
    iconBg: 'bg-blue-100 text-blue-600',
    borderHover: 'hover:border-blue-300',
    buttonGradient: 'from-blue-500 to-cyan-500',
  },
]

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-12">
      {/* 배경 장식 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3182f6]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8b5cf6]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3182f6]/5 rounded-full blur-3xl" />
      </div>

      {/* 히어로 섹션 */}
      <div className="text-center mb-14 relative">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] mb-6 shadow-lg shadow-indigo-200">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          채용 ATS
        </h1>
        <p className="text-base text-gray-500 mt-3 max-w-md mx-auto">
          구직자와 채용담당자를 위한 올인원 플랫폼
        </p>
      </div>

      {/* 역할 선택 카드 */}
      <div className="relative flex flex-col md:flex-row gap-6 w-full max-w-[840px]">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <div
              key={role.title}
              className={`
                flex-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200
                p-8 transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50
                ${role.borderHover}
                group
              `}
            >
              {/* 카드 상단 그라데이션 라인 */}
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${role.gradient} mb-6`} />

              {/* 아이콘 */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${role.iconBg} mb-5`}>
                <Icon size={24} />
              </div>

              {/* 제목 & 설명 */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {role.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {role.description}
              </p>

              {/* 기능 목록 */}
              <ul className="space-y-3 mb-8">
                {role.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* 시작 버튼 */}
              <Link
                href={role.href}
                className={`
                  block w-full text-center py-3 rounded-xl text-sm font-semibold
                  bg-gradient-to-r ${role.buttonGradient} text-white
                  hover:opacity-90 transition-opacity
                  shadow-sm
                `}
              >
                시작하기 &rarr;
              </Link>
            </div>
          )
        })}
      </div>

      {/* 하단 안내 */}
      <div className="relative mt-12 flex items-center gap-2 text-xs text-gray-400">
        <Shield size={14} />
        <span>개인정보는 채용절차법 및 개인정보보호법에 따라 안전하게 처리됩니다</span>
      </div>
    </div>
  )
}
