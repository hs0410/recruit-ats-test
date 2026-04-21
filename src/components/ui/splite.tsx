'use client'

import { Suspense, lazy, Component, type ReactNode } from 'react'

// 타입 오류 피하기 위해 default export를 그대로 래핑
const Spline = lazy(() => import('@splinetool/react-spline').then(m => ({ default: m.default as unknown as React.ComponentType<{ scene: string; className?: string }> })))

interface SplineSceneProps {
  scene: string
  className?: string
}

// 에러 바운더리 — Spline 로드 실패 시 대체 UI
class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? this.props.fallback : this.props.children }
}

const LoadingFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
    <div className="w-10 h-10 border-2 border-purple-400/40 border-t-purple-400 rounded-full animate-spin" />
    <p className="text-[11px] text-neutral-500">3D 모델 로딩 중...</p>
  </div>
)

const ErrorFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8">
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-5xl">
      🤖
    </div>
    <p className="text-[12px] text-neutral-400 text-center">3D 모델을 불러올 수 없습니다</p>
  </div>
)

// 3D Spline 씬 렌더러 — 로딩 중/에러 시 대체 UI
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<LoadingFallback />}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
