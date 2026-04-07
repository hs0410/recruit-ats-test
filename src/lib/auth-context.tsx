'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  login: (password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  // 페이지 로드 시 저장된 토큰 확인
  useEffect(() => {
    const saved = localStorage.getItem('ats-token')
    if (saved) {
      // 서버에 토큰 유효성 검증
      fetch('/api/auth', {
        headers: { Authorization: `Bearer ${saved}` },
      })
        .then(res => {
          if (res.ok) {
            setToken(saved)
          } else {
            localStorage.removeItem('ats-token')
          }
        })
        .catch(() => localStorage.removeItem('ats-token'))
        .finally(() => setChecked(true))
    } else {
      setChecked(true)
    }
  }, [])

  const login = async (password: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json()
        return { success: false, error: data.error || '로그인 실패' }
      }

      const data = await res.json()
      setToken(data.token)
      localStorage.setItem('ats-token', data.token)
      return { success: true }
    } catch {
      return { success: false, error: '서버 연결 실패' }
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('ats-token')
  }

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
