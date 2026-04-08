import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, isValidToken } from '@/lib/auth'

// 로그인 (비밀번호 → 토큰 발급)
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const token = verifyPassword(password)

    if (!token) {
      return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 })
    }

    return NextResponse.json({ token, message: '로그인 성공' })
  } catch {
    return NextResponse.json({ error: '요청 처리 실패' }, { status: 400 })
  }
}

// 토큰 검증
export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token || !isValidToken(token)) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  return NextResponse.json({ valid: true })
}
