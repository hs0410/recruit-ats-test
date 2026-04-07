// 간단한 세션 토큰 기반 인증
// 실제 운영 시에는 NextAuth.js 등으로 교체 권장

const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD || '1111'

// 서버사이드: 세션 토큰 저장소
const validTokens = new Set<string>()

/** 비밀번호 검증 후 토큰 발급 */
export function verifyPassword(password: string): string | null {
  if (password === ACCESS_PASSWORD) {
    const token = generateToken()
    validTokens.add(token)
    // 24시간 후 토큰 자동 만료
    setTimeout(() => validTokens.delete(token), 24 * 60 * 60 * 1000)
    return token
  }
  return null
}

/** 토큰 유효성 검증 */
export function isValidToken(token: string): boolean {
  return validTokens.has(token)
}

/** 랜덤 토큰 생성 */
function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 48; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
