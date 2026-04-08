// IP 기반 Rate Limiter — 메모리 저장 (서버리스 환경에서도 동작)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// 만료된 항목 정리 (메모리 누수 방지)
function cleanup() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// 5분마다 정리
setInterval(cleanup, 5 * 60 * 1000)

/**
 * Rate limit 체크
 * @param ip - 클라이언트 IP
 * @param maxRequests - 윈도우 당 최대 요청 수 (기본 10)
 * @param windowMs - 윈도우 시간 ms (기본 60초)
 * @returns { allowed: boolean, remaining: number }
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    // 새 윈도우 시작
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}
