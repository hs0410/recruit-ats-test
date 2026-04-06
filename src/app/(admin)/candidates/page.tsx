'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react'
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

export default function CandidatesPage() {
  const [search, setSearch] = useState('')
  const [filterStage, setFilterStage] = useState<string>('all')

  const filtered = mockCandidates.filter(c => {
    const matchSearch = c.name.includes(search) || c.email.includes(search) || c.job.includes(search)
    const matchStage = filterStage === 'all' || c.stage === filterStage
    return matchSearch && matchStage
  })

  return (
    <div>
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
    </div>
  )
}
