'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Plus, Filter, ArrowUpDown, AlertTriangle, Link2, X, UserCheck } from 'lucide-react'
import { type Stage } from '@/lib/types'

const mockCandidates = [
  { id: '1', name: '김현수', email: 'kim@email.com', phone: '010-1234-5678', job: '백엔드 개발자', stage: '서류접수' as Stage, applied_at: '2026-04-01', leadTime: 5 },
  { id: '2', name: '이지은', email: 'lee@email.com', phone: '010-2345-6789', job: '백엔드 개발자', stage: '서류접수' as Stage, applied_at: '2026-04-02', leadTime: 4 },
  { id: '3', name: '박서준', email: 'park@email.com', phone: '010-3456-7890', job: '프론트엔드 개발자', stage: '1차면접' as Stage, applied_at: '2026-03-25', leadTime: 12 },
  { id: '4', name: '최유진', email: 'choi@email.com', phone: '010-4567-8901', job: '프론트엔드 개발자', stage: '1차면접' as Stage, applied_at: '2026-03-28', leadTime: 9 },
  { id: '5', name: '정민호', email: 'jung@email.com', phone: '010-5678-9012', job: '백엔드 개발자', stage: '2차면접' as Stage, applied_at: '2026-03-20', leadTime: 17 },
  { id: '6', name: '한소희', email: 'han@email.com', phone: '010-6789-0123', job: 'PM', stage: '처우협의' as Stage, applied_at: '2026-03-15', leadTime: 22 },
  { id: '7', name: '윤서연', email: 'yoon@email.com', phone: '010-7890-1234', job: '백엔드 개발자', stage: '입사확정' as Stage, applied_at: '2026-03-01', leadTime: 36 },
]

const stageBadge: Record<Stage, { bg: string; text: string }> = {
  '서류접수': { bg: 'bg-[#f2f4f6]', text: 'text-[#8b95a1]' },
  '1차면접': { bg: 'bg-primary-light', text: 'text-primary' },
  '2차면접': { bg: 'bg-[#eef2ff]', text: 'text-[#6366f1]' },
  '처우협의': { bg: 'bg-[#f3e8ff]', text: 'text-[#8b5cf6]' },
  '입사확정': { bg: 'bg-success-light', text: 'text-success' },
  '탈락': { bg: 'bg-danger-light', text: 'text-danger' },
}

function getInitialColor(name: string) {
  const colors = ['#3182f6', '#00c471', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1']
  return colors[name.charCodeAt(0) % colors.length]
}

// 중복 지원자 mock 데이터
interface DuplicatePair {
  id: string
  name: string
  email: string
  entries: { job: string; applied_at: string }[]
  reason: string
}

const initialDuplicates: DuplicatePair[] = [
  {
    id: 'dup-1',
    name: '김서연',
    email: 'seoyeon.kim@email.com',
    entries: [
      { job: '백엔드 개발자', applied_at: '2026-03-15' },
      { job: '프론트엔드 개발자', applied_at: '2026-04-01' },
    ],
    reason: '동일 이메일로 다른 포지션 지원',
  },
  {
    id: 'dup-2',
    name: '이준호',
    email: 'junho.lee@email.com',
    entries: [
      { job: 'PM', applied_at: '2026-02-20' },
      { job: 'PM', applied_at: '2026-04-03' },
    ],
    reason: '동일 포지션 재지원',
  },
]

export default function CandidatesPage() {
  const [search, setSearch] = useState('')
  const [filterStage, setFilterStage] = useState<string>('all')

  // 중복 체크 상태
  const [duplicates, setDuplicates] = useState<DuplicatePair[]>(initialDuplicates)
  const [showDuplicateBanner, setShowDuplicateBanner] = useState(true)
  const [showDuplicateModal, setShowDuplicateModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // 토스트 자동 숨김
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // 배너는 중복이 없으면 자동 숨김
  const bannerVisible = showDuplicateBanner && duplicates.length > 0

  // 중복 처리 액션
  const handleDuplicateAction = (dupId: string, action: '이력 연결' | '별도 관리' | '무시') => {
    setDuplicates((prev) => prev.filter((d) => d.id !== dupId))
    const messages: Record<string, string> = {
      '이력 연결': '이력이 연결되었습니다',
      '별도 관리': '별도 후보자로 관리합니다',
      '무시': '해당 중복 알림을 무시합니다',
    }
    setToast(messages[action])
  }

  const filtered = mockCandidates.filter(c => {
    const matchSearch = c.name.includes(search) || c.email.includes(search) || c.job.includes(search)
    const matchStage = filterStage === 'all' || c.stage === filterStage
    return matchSearch && matchStage
  })

  return (
    <div>
      {/* 중복 지원자 배너 */}
      {bannerVisible && (
        <div className="mb-6 flex items-center justify-between bg-[#fffbeb] border border-[#fde68a] rounded-2xl px-5 py-3.5 shadow-soft">
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-[#f59e0b] flex-shrink-0" />
            <span className="text-[13px] font-semibold text-[#92400e]">
              ⚠️ 중복 지원자 {duplicates.length}건이 감지되었습니다
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDuplicateModal(true)}
              className="text-[12px] font-semibold text-[#d97706] bg-[#fef3c7] hover:bg-[#fde68a] px-4 py-1.5 rounded-lg transition-colors"
            >
              확인하기
            </button>
            <button
              onClick={() => setShowDuplicateBanner(false)}
              className="text-[#d97706]/60 hover:text-[#d97706] transition-colors p-1"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground">후보자 관리</h1>
          <p className="text-[14px] text-muted mt-1">총 {mockCandidates.length}명의 후보자</p>
        </div>
        <Link
          href="/candidates/new"
          className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-soft"
        >
          <Plus size={16} />
          후보자 등록
        </Link>
      </div>

      {/* 검색 + 필터 */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="이름, 이메일, 포지션으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-card text-[13px] placeholder:text-muted/60"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-border bg-card text-[13px] appearance-none cursor-pointer"
          >
            <option value="all">전체 단계</option>
            <option value="서류접수">서류접수</option>
            <option value="1차면접">1차면접</option>
            <option value="2차면접">2차면접</option>
            <option value="처우협의">처우협의</option>
            <option value="입사확정">입사확정</option>
            <option value="탈락">탈락</option>
          </select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[12px] font-semibold text-muted px-5 py-3.5">
                <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">이름 <ArrowUpDown size={12} /></span>
              </th>
              <th className="text-left text-[12px] font-semibold text-muted px-5 py-3.5">포지션</th>
              <th className="text-left text-[12px] font-semibold text-muted px-5 py-3.5">단계</th>
              <th className="text-left text-[12px] font-semibold text-muted px-5 py-3.5">연락처</th>
              <th className="text-left text-[12px] font-semibold text-muted px-5 py-3.5">지원일</th>
              <th className="text-left text-[12px] font-semibold text-muted px-5 py-3.5">
                <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">리드타임 <ArrowUpDown size={12} /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const badge = stageBadge[c.stage]
              return (
                <tr key={c.id} className="border-b border-border/60 last:border-0 hover:bg-card-hover transition-colors cursor-pointer group">
                  <td className="px-5 py-4">
                    <Link href={`/candidates/${c.id}`} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                        style={{ backgroundColor: getInitialColor(c.name) }}
                      >
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-[11px] text-muted">{c.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-foreground">{c.job}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                      {c.stage}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-muted">{c.phone}</td>
                  <td className="px-5 py-4 text-[13px] text-muted">{c.applied_at}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[13px] font-semibold ${
                      c.leadTime >= 14 ? 'text-danger' : c.leadTime >= 7 ? 'text-warning' : 'text-muted'
                    }`}>
                      {c.leadTime}일
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 중복 지원자 모달 */}
      {showDuplicateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDuplicateModal(false)}
          />
          {/* 모달 본문 */}
          <div className="relative bg-card rounded-2xl border border-border shadow-soft w-full max-w-[560px] mx-4 max-h-[80vh] overflow-y-auto">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fef3c7] flex items-center justify-center">
                  <UserCheck size={18} className="text-[#d97706]" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-foreground">중복 지원자 확인</h2>
                  <p className="text-[12px] text-muted mt-0.5">
                    {duplicates.length > 0
                      ? `${duplicates.length}건의 중복이 감지되었습니다`
                      : '모든 중복이 처리되었습니다'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="text-muted hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-[#f2f4f6]"
              >
                <X size={16} />
              </button>
            </div>

            {/* 중복 목록 */}
            <div className="px-6 py-4 space-y-4">
              {duplicates.length === 0 && (
                <div className="text-center py-10">
                  <UserCheck size={32} className="mx-auto text-success mb-3" />
                  <p className="text-[14px] font-semibold text-foreground">모든 중복이 처리되었습니다</p>
                  <p className="text-[12px] text-muted mt-1">추가 조치가 필요하지 않습니다</p>
                </div>
              )}

              {duplicates.map((dup) => (
                <div
                  key={dup.id}
                  className="border border-border rounded-2xl p-5 bg-card hover:border-[#fde68a] transition-colors"
                >
                  {/* 후보자 정보 */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                      style={{ backgroundColor: getInitialColor(dup.name) }}
                    >
                      {dup.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-foreground">{dup.name}</p>
                      <p className="text-[12px] text-muted">{dup.email}</p>
                      <span className="inline-block mt-1.5 text-[11px] font-medium text-[#d97706] bg-[#fef3c7] px-2 py-0.5 rounded-full">
                        {dup.reason}
                      </span>
                    </div>
                  </div>

                  {/* 지원 내역 비교 */}
                  <div className="space-y-2 mb-4">
                    {dup.entries.map((entry, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-[#f8f9fa] rounded-xl px-4 py-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted bg-white border border-border rounded-md px-1.5 py-0.5">
                            {idx + 1}차
                          </span>
                          <span className="text-[13px] font-semibold text-foreground">{entry.job}</span>
                        </div>
                        <span className="text-[12px] text-muted">{entry.applied_at}</span>
                      </div>
                    ))}
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDuplicateAction(dup.id, '이력 연결')}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-primary bg-primary-light hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors"
                    >
                      <Link2 size={13} />
                      이력 연결
                    </button>
                    <button
                      onClick={() => handleDuplicateAction(dup.id, '별도 관리')}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#6366f1] bg-[#eef2ff] hover:bg-[#6366f1]/10 px-3 py-2 rounded-xl transition-colors"
                    >
                      <UserCheck size={13} />
                      별도 관리
                    </button>
                    <button
                      onClick={() => handleDuplicateAction(dup.id, '무시')}
                      className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-muted bg-[#f2f4f6] hover:bg-[#e5e8eb] px-4 py-2 rounded-xl transition-colors"
                    >
                      무시
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 토스트 알림 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-foreground text-white text-[13px] font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <UserCheck size={14} />
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}
