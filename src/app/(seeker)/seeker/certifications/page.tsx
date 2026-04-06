'use client'

import { useState } from 'react'
import {
  Award,
  Plus,
  Bell,
  BellOff,
  Upload,
  BookOpen,
  Clock,
  BarChart3,
  Star,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Target,
} from 'lucide-react'

/* ────────────────────────────────────────
   자격증/스킬 관리 페이지
   보유 자격증, 추천 자격증, 스킬 인벤토리
   ──────────────────────────────────────── */

type CertStatus = '유효' | '만료임박' | '만료'

interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  expiry: string | null
  status: CertStatus
  notify: boolean
}

const initialCerts: Certification[] = [
  { id: 1, name: '정보처리기사', issuer: '한국산업인력공단', date: '2024-03-15', expiry: null, status: '유효', notify: true },
  { id: 2, name: 'SQLD', issuer: '한국데이터산업진흥원', date: '2024-06-20', expiry: '2026-06-20', status: '만료임박', notify: true },
  { id: 3, name: 'TOEIC 900', issuer: 'ETS', date: '2024-09-10', expiry: '2026-09-10', status: '유효', notify: false },
  { id: 4, name: '컴퓨터활용능력 1급', issuer: '대한상공회의소', date: '2023-11-25', expiry: null, status: '유효', notify: false },
  { id: 5, name: 'ADsP', issuer: '한국데이터산업진흥원', date: '2023-05-12', expiry: '2025-05-12', status: '만료', notify: false },
]

const recommendedCerts = [
  {
    name: 'AWS Solutions Architect',
    reason: '클라우드 인프라 설계 역량을 증명하여 백엔드 포지션에서 높은 경쟁력',
    period: '약 2~3개월',
    difficulty: '어려움' as const,
  },
  {
    name: 'CKAD (Kubernetes)',
    reason: '컨테이너 오케스트레이션 역량으로 DevOps/백엔드 직무 매칭률 상승',
    period: '약 1~2개월',
    difficulty: '어려움' as const,
  },
  {
    name: 'PCCE (Python)',
    reason: '파이썬 코딩 역량 증명으로 데이터/백엔드 포지션에 유리',
    period: '약 2~4주',
    difficulty: '쉬움' as const,
  },
  {
    name: 'TOEIC Speaking Lv7+',
    reason: '영어 커뮤니케이션 역량 증명으로 외국계/글로벌 기업 지원 시 필수',
    period: '약 1~2개월',
    difficulty: '보통' as const,
  },
]

const skills = [
  { name: 'JavaScript', rating: 4 },
  { name: 'TypeScript', rating: 4 },
  { name: 'React', rating: 4 },
  { name: 'Next.js', rating: 3 },
  { name: 'Node.js', rating: 3 },
  { name: 'Python', rating: 3 },
  { name: 'SQL', rating: 4 },
  { name: 'Git', rating: 5 },
  { name: 'Docker', rating: 2 },
  { name: 'AWS', rating: 2 },
  { name: 'REST API', rating: 4 },
  { name: 'CI/CD', rating: 2 },
]

const statusConfig: Record<CertStatus, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  '유효': { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  '만료임박': { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  '만료': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' },
}

const difficultyColor = {
  '쉬움': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30',
  '보통': 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
  '어려움': 'text-red-500 bg-red-50 dark:bg-red-950/30',
}

export default function CertificationsPage() {
  const [certs, setCerts] = useState(initialCerts)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', issuer: '', date: '' })
  const [toast, setToast] = useState('')

  const toggleNotify = (id: number) => {
    setCerts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notify: !c.notify } : c))
    )
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  // 바 차트 데이터
  const userCertCount = certs.length
  const avgCertCount = 3.2
  const maxVal = Math.max(userCertCount, avgCertCount) + 1

  return (
    <div className="relative">
      {/* 토스트 */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg text-[13px] animate-fade-in">
          {toast}
        </div>
      )}

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">자격증 / 스킬 관리</h1>
        <p className="text-[14px] text-muted mt-1">보유 자격증과 스킬을 관리하고 경쟁력을 높이세요</p>
      </div>

      {/* ── 내 자격증 목록 ── */}
      <div className="bg-card border border-border rounded-2xl shadow-soft mb-6">
        <div className="p-6 pb-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award size={18} className="text-emerald-500" />
              <h2 className="text-[16px] font-bold text-foreground">내 자격증</h2>
            </div>
            <p className="text-[12px] text-muted">보유 중인 자격증 {certs.length}건</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[12px] font-semibold px-4 py-2 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={14} />
            자격증 추가
          </button>
        </div>

        {/* 추가 폼 */}
        {showForm && (
          <div className="mx-6 mt-4 p-4 border border-border/60 rounded-xl bg-muted/5">
            <p className="text-[13px] font-semibold text-foreground mb-3">새 자격증 등록</p>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <label className="text-[11px] text-muted font-medium block mb-1">자격증명</label>
                <input
                  type="text"
                  className="w-full border border-border rounded-xl px-3 py-2 text-[13px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                  placeholder="예: 정보처리기사"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[11px] text-muted font-medium block mb-1">발급기관</label>
                <input
                  type="text"
                  className="w-full border border-border rounded-xl px-3 py-2 text-[13px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                  placeholder="예: 한국산업인력공단"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[11px] text-muted font-medium block mb-1">취득일</label>
                <input
                  type="date"
                  className="w-full border border-border rounded-xl px-3 py-2 text-[13px] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-[12px] text-muted hover:text-foreground transition-colors">
                <Upload size={13} />
                증빙 파일 업로드
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[12px] text-muted hover:text-foreground px-3 py-1.5 rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setShowForm(false)
                    showToast('자격증이 등록되었습니다')
                  }}
                  className="text-[12px] font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#06b6d4] px-4 py-1.5 rounded-xl"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 자격증 리스트 */}
        <div className="p-6 space-y-2">
          {certs.map((cert) => {
            const sc = statusConfig[cert.status]
            const StatusIcon = sc.icon
            return (
              <div
                key={cert.id}
                className="flex items-center justify-between border border-border/60 rounded-xl px-4 py-3 hover:bg-muted/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#10b981]/20 to-[#06b6d4]/20 flex items-center justify-center">
                    <Award size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{cert.name}</p>
                    <p className="text-[11px] text-muted">{cert.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <p className="text-[11px] text-muted">취득일: {cert.date}</p>
                    {cert.expiry && (
                      <p className="text-[11px] text-muted">만료일: {cert.expiry}</p>
                    )}
                  </div>
                  <span className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg ${sc.bg} ${sc.color}`}>
                    <StatusIcon size={12} />
                    {cert.status}
                  </span>
                  <button
                    onClick={() => toggleNotify(cert.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      cert.notify
                        ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                        : 'text-muted/40 hover:text-muted'
                    }`}
                    title={cert.notify ? '갱신 알림 켜짐' : '갱신 알림 꺼짐'}
                  >
                    {cert.notify ? <Bell size={14} /> : <BellOff size={14} />}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 2컬럼: 추천 자격증 + 통계 ── */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* 추천 자격증 */}
        <div className="col-span-2 bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <Target size={18} className="text-cyan-500" />
            <h2 className="text-[16px] font-bold text-foreground">추천 자격증</h2>
          </div>
          <p className="text-[12px] text-muted mb-5">목표 직무 기반으로 추천하는 자격증</p>

          <div className="grid grid-cols-2 gap-3">
            {recommendedCerts.map((rc) => (
              <div key={rc.name} className="border border-border/60 rounded-xl p-4 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[14px] font-bold text-foreground">{rc.name}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${difficultyColor[rc.difficulty]}`}>
                    {rc.difficulty}
                  </span>
                </div>
                <p className="text-[12px] text-muted leading-relaxed mb-3">{rc.reason}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-muted">
                    <Clock size={12} />
                    평균 {rc.period}
                  </div>
                  <button
                    onClick={() => showToast('준비 중인 기능입니다')}
                    className="flex items-center gap-1 text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    준비 시작
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 자격증 통계 */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={18} className="text-emerald-500" />
            <h2 className="text-[16px] font-bold text-foreground">자격증 비교</h2>
          </div>
          <p className="text-[12px] text-muted mb-6">내 자격증 vs 합격자 평균</p>

          <div className="space-y-5">
            {/* 내 자격증 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-medium text-foreground">내 자격증</span>
                <span className="text-[14px] font-bold text-emerald-600">{userCertCount}개</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${(userCertCount / maxVal) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-white">{userCertCount}</span>
                </div>
              </div>
            </div>

            {/* 합격자 평균 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-medium text-foreground">합격자 평균</span>
                <span className="text-[14px] font-bold text-muted">{avgCertCount}개</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${(avgCertCount / maxVal) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{avgCertCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[12px] text-emerald-700 dark:text-emerald-300 leading-relaxed">
                합격자 평균보다 <strong>{(userCertCount - avgCertCount).toFixed(1)}개</strong> 더 많은 자격증을 보유하고 있어요! 경쟁력이 높습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 스킬 인벤토리 ── */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} className="text-cyan-500" />
          <h2 className="text-[16px] font-bold text-foreground">스킬 인벤토리</h2>
        </div>
        <p className="text-[12px] text-muted mb-5">보유 스킬과 숙련도를 자가 평가하세요</p>

        <div className="grid grid-cols-4 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="border border-border/60 rounded-xl px-4 py-3 hover:shadow-sm transition-all"
            >
              <p className="text-[13px] font-semibold text-foreground mb-1.5">{skill.name}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= skill.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-700'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
