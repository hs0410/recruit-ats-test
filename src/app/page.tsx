'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      {/* 배경 장식 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3182f6]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[400px] relative">
        {/* 로고 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] mb-5 shadow-soft-lg">
            <Sparkles size={24} className="text-white" />
          </div>
          <h1 className="text-[28px] font-bold text-foreground">채용 ATS</h1>
          <p className="text-[14px] text-muted mt-2">채용의 모든 과정을 한 곳에서</p>
        </div>

        {/* 로그인 폼 */}
        <div className="glass rounded-2xl p-8 shadow-soft-lg">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-2">이메일</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-[14px] placeholder:text-muted/50"
                placeholder="admin@company.com"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-2">비밀번호</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-[14px] placeholder:text-muted/50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3182f6] to-[#6366f1] text-white py-3 rounded-xl text-[14px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-soft"
            >
              로그인
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-5 text-center">
            <button className="text-[13px] text-primary font-medium hover:underline">
              비밀번호를 잊으셨나요?
            </button>
          </div>
        </div>

        <p className="text-[12px] text-muted/60 text-center mt-8">
          Powered by Claude Code
        </p>
      </div>
    </div>
  )
}
