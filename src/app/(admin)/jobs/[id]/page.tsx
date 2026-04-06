'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Users, Edit3, Save, X, Briefcase } from 'lucide-react'

const mockJobs: Record<string, {
  id: string; title: string; department: string; description: string; status: 'open' | 'closed'; created_at: string;
  qualifications: string; benefits: string
}> = {
  '1': { id: '1', title: '백엔드 개발자', department: '개발', description: 'Node.js, TypeScript 기반 서버 개발', status: 'open', created_at: '2026-03-15', qualifications: '- 경력 3년 이상\n- Node.js/TypeScript 숙련\n- REST API 설계 경험\n- PostgreSQL 경험', benefits: '- 유연근무제\n- 점심 식대 지원\n- 교육비 지원' },
  '2': { id: '2', title: '프론트엔드 개발자', department: '개발', description: 'React, Next.js 기반 웹 개발', status: 'open', created_at: '2026-03-20', qualifications: '- 경력 2년 이상\n- React/Next.js 숙련\n- TypeScript 경험\n- 반응형 웹 구현', benefits: '- 유연근무제\n- 점심 식대 지원\n- 최신 장비 지급' },
  '3': { id: '3', title: 'PM', department: '기획', description: '프로덕트 매니징 및 로드맵 관리', status: 'open', created_at: '2026-03-25', qualifications: '- 경력 5년 이상\n- IT 프로덕트 PM 경험\n- 애자일/스크럼 경험\n- 데이터 분석 능력', benefits: '- 유연근무제\n- 스톡옵션\n- 교육비 지원' },
  '4': { id: '4', title: 'UX 디자이너', department: '디자인', description: '사용자 경험 설계 및 UI 디자인', status: 'closed', created_at: '2026-02-01', qualifications: '- 경력 3년 이상\n- Figma 숙련\n- 사용자 리서치 경험\n- 포트폴리오 필수', benefits: '- 유연근무제\n- 디자인 컨퍼런스 지원' },
}

const mockCandidates = [
  { id: '1', name: '김현수', stage: '서류접수', applied_at: '2026-04-01', job_id: '1' },
  { id: '2', name: '이지은', stage: '서류접수', applied_at: '2026-04-02', job_id: '1' },
  { id: '5', name: '정민호', stage: '2차면접', applied_at: '2026-03-20', job_id: '1' },
  { id: '7', name: '윤서연', stage: '입사확정', applied_at: '2026-03-01', job_id: '1' },
  { id: '3', name: '박서준', stage: '1차면접', applied_at: '2026-03-25', job_id: '2' },
  { id: '4', name: '최유진', stage: '1차면접', applied_at: '2026-03-28', job_id: '2' },
  { id: '6', name: '한소희', stage: '처우협의', applied_at: '2026-03-15', job_id: '3' },
]

const stageBadge: Record<string, { bg: string; text: string }> = {
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

export default function JobDetailPage() {
  const params = useParams()
  const id = params.id as string
  const job = mockJobs[id]
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(job ? { ...job } : null)
  const [status, setStatus] = useState(job?.status ?? 'open')

  if (!job || !form) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-[14px]">공고를 찾을 수 없습니다.</p>
        <Link href="/jobs" className="text-primary text-[13px] mt-2 inline-block hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const jobCandidates = mockCandidates.filter(c => c.job_id === id)

  return (
    <div>
      <Link href="/jobs" className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        채용 공고 목록
      </Link>

      {/* 공고 헤더 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#6366f1] flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-foreground">{form.title}</h1>
              <p className="text-[14px] text-muted mt-0.5">{form.department} · 개설 {form.created_at}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStatus(status === 'open' ? 'closed' : 'open')}
              className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                status === 'open' ? 'bg-success-light text-success' : 'bg-[#f2f4f6] text-muted'
              }`}
            >
              {status === 'open' ? '진행중' : '마감'}
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 text-[13px] text-primary font-semibold bg-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            >
              {isEditing ? <><X size={14} /> 취소</> : <><Edit3 size={14} /> 수정</>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 왼쪽: 공고 내용 */}
        <div className="col-span-2 space-y-5">
          {isEditing ? (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-foreground mb-2">공고 제목</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-foreground mb-2">부서</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-foreground mb-2">간략 설명</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-foreground mb-2">자격 요건</label>
                <textarea
                  value={form.qualifications}
                  onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-foreground mb-2">복리후생</label>
                <textarea
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-soft"
              >
                <Save size={14} />
                저장하기
              </button>
            </div>
          ) : (
            <>
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <h2 className="text-[15px] font-bold text-foreground mb-3">직무 설명</h2>
                <p className="text-[13px] text-muted leading-relaxed">{form.description}</p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <h2 className="text-[15px] font-bold text-foreground mb-3">자격 요건</h2>
                <div className="text-[13px] text-muted leading-relaxed whitespace-pre-line">{form.qualifications}</div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <h2 className="text-[15px] font-bold text-foreground mb-3">복리후생</h2>
                <div className="text-[13px] text-muted leading-relaxed whitespace-pre-line">{form.benefits}</div>
              </div>
            </>
          )}
        </div>

        {/* 오른쪽: 지원자 목록 */}
        <div>
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-bold text-foreground">지원자</h2>
              <span className="text-[12px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                {jobCandidates.length}명
              </span>
            </div>
            <div className="space-y-2.5">
              {jobCandidates.map((c) => {
                const badge = stageBadge[c.stage] ?? { bg: 'bg-[#f2f4f6]', text: 'text-muted' }
                return (
                  <Link
                    key={c.id}
                    href={`/candidates/${c.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-card-hover hover-lift transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                        style={{ backgroundColor: getInitialColor(c.name) }}
                      >
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground">{c.name}</p>
                        <p className="text-[11px] text-muted">{c.applied_at}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                      {c.stage}
                    </span>
                  </Link>
                )
              })}
              {jobCandidates.length === 0 && (
                <p className="text-[12px] text-muted/60 text-center py-6">아직 지원자가 없습니다</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
