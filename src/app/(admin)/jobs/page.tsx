'use client'

import Link from 'next/link'
import { Plus, Users, ArrowUpRight, Briefcase } from 'lucide-react'

const mockJobs = [
  { id: '1', title: '백엔드 개발자', department: '개발', status: 'open' as const, candidates: 4, created_at: '2026-03-15', description: 'Node.js, TypeScript 기반 서버 개발' },
  { id: '2', title: '프론트엔드 개발자', department: '개발', status: 'open' as const, candidates: 3, created_at: '2026-03-20', description: 'React, Next.js 기반 웹 개발' },
  { id: '3', title: 'PM', department: '기획', status: 'open' as const, candidates: 2, created_at: '2026-03-25', description: '프로덕트 매니징 및 로드맵 관리' },
  { id: '4', title: 'UX 디자이너', department: '디자인', status: 'closed' as const, candidates: 0, created_at: '2026-02-01', description: '사용자 경험 설계 및 UI 디자인' },
]

const gradients = [
  'from-[#3182f6] to-[#6366f1]',
  'from-[#00c471] to-[#06b6d4]',
  'from-[#8b5cf6] to-[#ec4899]',
  'from-[#f59e0b] to-[#ef4444]',
]

export default function JobsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground">채용 공고</h1>
          <p className="text-[14px] text-muted mt-1">진행중 {mockJobs.filter(j => j.status === 'open').length}건</p>
        </div>
        <Link
          href="/jobs/new"
          className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-soft"
        >
          <Plus size={16} />
          공고 작성
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {mockJobs.map((job, i) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="bg-card rounded-2xl border border-border p-6 shadow-soft hover-lift group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                <Briefcase size={18} className="text-white" />
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                job.status === 'open'
                  ? 'bg-success-light text-success'
                  : 'bg-[#f2f4f6] text-muted'
              }`}>
                {job.status === 'open' ? '진행중' : '마감'}
              </span>
            </div>

            <h3 className="text-[16px] font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
            <p className="text-[13px] text-muted mt-1">{job.department} · {job.description}</p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/60">
              <div className="flex items-center gap-1.5 text-[13px] text-muted">
                <Users size={14} />
                지원자 {job.candidates}명
              </div>
              <span className="text-[12px] text-muted">개설 {job.created_at}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
