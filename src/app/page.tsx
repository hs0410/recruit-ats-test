'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles, GraduationCap, Briefcase, CheckCircle2, Shield,
  Lock, Eye, EyeOff, AlertCircle, Brain, Target, Users, Zap, ChevronDown
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { SplineScene } from '@/components/ui/splite'

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

const features = [
  { icon: Brain, label: 'AI 이력서 분석', desc: 'Gemini 기반 6개 차원 평가' },
  { icon: Target, label: '5·3·1 구조화 평가', desc: '공정하고 객관적인 기준' },
  { icon: Users, label: '통합 평가 뷰', desc: 'AI·면접관·평가 통합' },
  { icon: Zap, label: '위험도 기반 워크플로우', desc: 'AI 자동화 + 사람 결정' },
]

export default function LandingPage() {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── 3D 히어로 섹션 ── */}
      <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-0 rounded-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex h-full">
          {/* 왼쪽: 브랜딩 + 설명 */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm w-fit mb-6">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-xs text-neutral-300">AI-Powered Recruitment Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tight leading-[1.1]">
              Talent Flow
            </h1>
            <p className="mt-3 text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300">
              Smart Hiring, Fair Decisions
            </p>

            <p className="mt-6 text-neutral-300 max-w-lg text-[15px] leading-relaxed">
              구직자와 채용담당자를 잇는 AI 채용 플랫폼.
              <br />
              <span className="text-neutral-400">
                Google Gemini 기반 이력서 분석, 5·3·1 구조화 평가, 통합 평가 뷰로
                채용의 정확성과 공정성을 높입니다.
              </span>
            </p>

            {/* 핵심 기능 그리드 */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
              {features.map(f => {
                const Icon = f.icon
                return (
                  <div
                    key={f.label}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <Icon size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[12px] font-semibold text-white">{f.label}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 힌트 + 스크롤 인디케이터 */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#access"
                className="group inline-flex items-center gap-2 text-[12px] text-neutral-400 hover:text-white transition-colors"
              >
                <span>아래로 스크롤하여 시작</span>
                <ChevronDown size={14} className="animate-bounce group-hover:animate-none" />
              </a>
              <span className="text-neutral-700">·</span>
              <span className="text-[11px] text-neutral-500">마우스로 3D 모델과 상호작용해보세요 →</span>
            </div>
          </div>

          {/* 오른쪽: 3D Spline 씬 + 네온 글로우 + 컬러 필터 */}
          <div className="flex-1 relative hidden md:block">
            {/* 배경 네온 글로우 */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 blur-3xl" />
              <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl" />
            </div>
            {/* 로봇 컬러 필터: 퍼플-시안 네온 톤 */}
            <div
              className="relative w-full h-full"
              style={{
                filter: 'hue-rotate(235deg) saturate(1.6) contrast(1.15) brightness(1.1) drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))',
              }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* ── 접속 섹션 ── */}
      <section
        id="access"
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-foreground flex flex-col items-center justify-center px-4 py-20 relative"
      >
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3182f6]/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8b5cf6]/8 rounded-full blur-3xl" />
        </div>

        {!isAuthenticated ? (
          /* ── 로그인 폼 ── */
          <div className="relative w-full max-w-[400px]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] mb-4 shadow-lg shadow-indigo-200">
                <Lock size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">접속 비밀번호</h2>
              <p className="text-sm text-gray-500 mt-2">승인된 사용자만 접속할 수 있습니다</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-xl shadow-gray-200/50">
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

            <div className="text-center mt-6">
              <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <Shield size={12} />
                비밀번호로 보호된 서비스입니다
              </p>
            </div>
          </div>
        ) : (
          /* ── 역할 선택 ── */
          <div className="relative w-full max-w-[840px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">역할을 선택하세요</h2>
              <p className="text-sm text-gray-500 mt-3">어떤 경험으로 Talent Flow를 사용하시나요?</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <div
                    key={role.title}
                    className={`flex-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 ${role.borderHover}`}
                  >
                    <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${role.gradient} mb-6`} />
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${role.iconBg} mb-5`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{role.description}</p>
                    <ul className="space-y-3 mb-8">
                      {role.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span>{f}</span>
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

            <div className="mt-12 flex items-center justify-center gap-4">
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
        )}
      </section>
    </div>
  )
}
