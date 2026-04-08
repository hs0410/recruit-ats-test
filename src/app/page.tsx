'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, GraduationCap, Briefcase, CheckCircle2, Shield, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

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
    iconBg: 'bg-blue-100 text-blue-600',
    borderHover: 'hover:border-blue-300',
    buttonGradient: 'from-blue-500 to-cyan-500',
  },
]

export default function RoleSelectionPage() {
  const { isAuthenticated, login, logout } = useAuth()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError('')

    const result = await login(password)
    if (!result.success) {
      setError(result.error || '비밀번호가 틀렸습니다.')
    }
    setLoading(false)
  }

  // 로그인 안 된 상태 → 비밀번호 입력 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-12">
        {/* 배경 장식 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3182f6]/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8b5cf6]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-[400px]">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] mb-5 shadow-lg shadow-indigo-200">
              <Sparkles size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Talent Flow</h1>
            <p className="text-sm text-gray-500 mt-2">구직자와 채용담당자를 위한 올인원 플랫폼</p>
          </div>

          {/* 로그인 카드 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-xl shadow-gray-200/50">
            <div className="flex items-center gap-2 mb-6">
              <Lock size={18} className="text-gray-400" />
              <h2 className="text-[16px] font-bold text-gray-900">접속 비밀번호</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#3182f6]/30 focus:border-[#3182f6] transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-[13px]">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!password.trim() || loading}
                className="w-full py-3 rounded-xl text-[14px] font-semibold bg-gradient-to-r from-[#3182f6] to-[#8b5cf6] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? '확인 중...' : '접속하기'}
              </button>
            </form>
          </div>

          {/* 하단 안내 */}
          <div className="text-center mt-6">
            <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <Shield size={12} />
              비밀번호로 보호된 서비스입니다
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 로그인 된 상태 → 역할 선택
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
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Talent Flow</h1>
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
              className={`flex-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 ${role.borderHover} group`}
            >
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${role.gradient} mb-6`} />
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${role.iconBg} mb-5`}>
                <Icon size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{role.description}</p>
              <ul className="space-y-3 mb-8">
                {role.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={role.href}
                className={`block w-full text-center py-3 rounded-xl text-sm font-semibold bg-gradient-to-r ${role.buttonGradient} text-white hover:opacity-90 transition-opacity shadow-sm`}
              >
                시작하기 &rarr;
              </Link>
            </div>
          )
        })}
      </div>

      {/* 하단: 로그아웃 + 안내 */}
      <div className="relative mt-12 flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Shield size={14} />
          <span>개인정보는 채용절차법 및 개인정보보호법에 따라 안전하게 처리됩니다</span>
        </div>
        <button
          onClick={logout}
          className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
