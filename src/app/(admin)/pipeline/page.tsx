'use client'

import { useState } from 'react'
import { STAGES, type Stage, type Candidate } from '@/lib/types'
import Link from 'next/link'
import { GripVertical, Mail, Plus, MoreHorizontal } from 'lucide-react'

const mockCandidates: Candidate[] = [
  { id: '1', name: '김현수', phone: '010-1234-5678', email: 'kim@email.com', job_id: '1', stage: '서류접수', applied_at: '2026-04-01', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' } },
  { id: '2', name: '이지은', phone: '010-2345-6789', email: 'lee@email.com', job_id: '1', stage: '서류접수', applied_at: '2026-04-02', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' } },
  { id: '3', name: '박서준', phone: '010-3456-7890', email: 'park@email.com', job_id: '2', stage: '1차면접', applied_at: '2026-03-25', resume_url: null, memo: null, created_at: '', job: { id: '2', title: '프론트엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' } },
  { id: '4', name: '최유진', phone: '010-4567-8901', email: 'choi@email.com', job_id: '2', stage: '1차면접', applied_at: '2026-03-28', resume_url: null, memo: null, created_at: '', job: { id: '2', title: '프론트엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' } },
  { id: '5', name: '정민호', phone: '010-5678-9012', email: 'jung@email.com', job_id: '1', stage: '2차면접', applied_at: '2026-03-20', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' } },
  { id: '6', name: '한소희', phone: '010-6789-0123', email: 'han@email.com', job_id: '3', stage: '처우협의', applied_at: '2026-03-15', resume_url: null, memo: null, created_at: '', job: { id: '3', title: 'PM', department: '기획', description: '', status: 'open', created_at: '' } },
  { id: '7', name: '윤서연', phone: '010-7890-1234', email: 'yoon@email.com', job_id: '1', stage: '입사확정', applied_at: '2026-03-01', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' } },
]

const stageConfig: Record<Stage, { color: string; bg: string; dot: string }> = {
  '서류접수': { color: '#8b95a1', bg: '#f2f4f6', dot: 'bg-[#8b95a1]' },
  '1차면접': { color: '#3182f6', bg: '#e8f3ff', dot: 'bg-[#3182f6]' },
  '2차면접': { color: '#6366f1', bg: '#eef2ff', dot: 'bg-[#6366f1]' },
  '처우협의': { color: '#8b5cf6', bg: '#f3e8ff', dot: 'bg-[#8b5cf6]' },
  '입사확정': { color: '#00c471', bg: '#e8faf0', dot: 'bg-[#00c471]' },
  '탈락': { color: '#f04452', bg: '#ffebee', dot: 'bg-[#f04452]' },
}

function getInitialColor(name: string) {
  const colors = ['#3182f6', '#00c471', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1']
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export default function PipelinePage() {
  const [candidates, setCandidates] = useState(mockCandidates)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleDragStart = (id: string) => setDraggedId(id)

  const handleDrop = (targetStage: Stage) => {
    if (!draggedId) return
    setCandidates(prev =>
      prev.map(c => c.id === draggedId ? { ...c, stage: targetStage } : c)
    )
    setDraggedId(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground">파이프라인</h1>
          <p className="text-[14px] text-muted mt-1">후보자를 드래그하여 단계를 이동하세요</p>
        </div>
        <Link href="/candidates/new" className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-soft">
          <Plus size={16} />
          후보자 등록
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const config = stageConfig[stage]
          const stageCandidates = candidates.filter(c => c.stage === stage)
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-[260px] min-h-[600px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage)}
            >
              {/* 단계 헤더 */}
              <div className="flex items-center gap-2.5 mb-3 px-1">
                <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                <h3 className="text-[14px] font-bold text-foreground">{stage}</h3>
                <span className="text-[12px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">
                  {stageCandidates.length}
                </span>
              </div>

              {/* 카드 리스트 */}
              <div className="space-y-2.5">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={() => handleDragStart(candidate.id)}
                    className={`bg-card rounded-xl border border-border p-4 cursor-grab active:cursor-grabbing shadow-soft hover-lift group ${
                      draggedId === candidate.id ? 'opacity-40 scale-95' : ''
                    } transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                          style={{ backgroundColor: getInitialColor(candidate.name) }}
                        >
                          {candidate.name[0]}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-foreground">{candidate.name}</p>
                          <p className="text-[11px] text-muted">{candidate.job?.title}</p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-foreground">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-muted">
                      <Mail size={11} />
                      {candidate.email}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
                      <span className="text-[11px] text-muted">지원 {candidate.applied_at}</span>
                      <GripVertical size={12} className="text-muted/40" />
                    </div>
                  </div>
                ))}

                {/* 빈 상태 */}
                {stageCandidates.length === 0 && (
                  <div className="rounded-xl border-2 border-dashed border-border py-12 text-center">
                    <p className="text-[12px] text-muted">후보자를 여기에 드롭하세요</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
