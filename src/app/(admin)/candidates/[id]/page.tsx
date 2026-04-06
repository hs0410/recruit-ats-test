'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Briefcase, Clock, FileText, MessageSquare, ChevronRight } from 'lucide-react'
import { type Stage, ALL_STAGES } from '@/lib/types'

const mockCandidates: Record<string, {
  id: string; name: string; email: string; phone: string; job: string; stage: Stage;
  applied_at: string; memo: string; resume_url: string | null
}> = {
  '1': { id: '1', name: '김현수', email: 'kim@email.com', phone: '010-1234-5678', job: '백엔드 개발자', stage: '서류접수', applied_at: '2026-04-01', memo: '경력 3년, Java/Spring 주력', resume_url: null },
  '2': { id: '2', name: '이지은', email: 'lee@email.com', phone: '010-2345-6789', job: '백엔드 개발자', stage: '서류접수', applied_at: '2026-04-02', memo: '', resume_url: null },
  '3': { id: '3', name: '박서준', email: 'park@email.com', phone: '010-3456-7890', job: '프론트엔드 개발자', stage: '1차면접', applied_at: '2026-03-25', memo: 'React/Next.js 포트폴리오 우수', resume_url: null },
  '4': { id: '4', name: '최유진', email: 'choi@email.com', phone: '010-4567-8901', job: '프론트엔드 개발자', stage: '1차면접', applied_at: '2026-03-28', memo: '', resume_url: null },
  '5': { id: '5', name: '정민호', email: 'jung@email.com', phone: '010-5678-9012', job: '백엔드 개발자', stage: '2차면접', applied_at: '2026-03-20', memo: '기술면접 통과, CTO 면접 예정', resume_url: null },
  '6': { id: '6', name: '한소희', email: 'han@email.com', phone: '010-6789-0123', job: 'PM', stage: '처우협의', applied_at: '2026-03-15', memo: '희망연봉 5500만원', resume_url: null },
  '7': { id: '7', name: '윤서연', email: 'yoon@email.com', phone: '010-7890-1234', job: '백엔드 개발자', stage: '입사확정', applied_at: '2026-03-01', memo: '4월 14일 입사 예정', resume_url: null },
}

const mockTimeline = [
  { date: '2026-04-01', action: '서류접수', detail: '지원서 접수 완료' },
  { date: '2026-04-03', action: '서류검토', detail: '이력서 검토 완료 — 면접 대상자 선정' },
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

export default function CandidateDetailPage() {
  const params = useParams()
  const id = params.id as string
  const candidate = mockCandidates[id]
  const [activeTab, setActiveTab] = useState<'timeline' | 'memo'>('timeline')
  const [stage, setStage] = useState<Stage>(candidate?.stage ?? '서류접수')
  const [memo, setMemo] = useState(candidate?.memo ?? '')

  if (!candidate) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-[14px]">후보자를 찾을 수 없습니다.</p>
        <Link href="/candidates" className="text-primary text-[13px] mt-2 inline-block hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const badge = stageBadge[stage]

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage)
  }

  return (
    <div>
      <Link href="/candidates" className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        후보자 목록
      </Link>

      {/* 프로필 헤더 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-[20px] font-bold"
              style={{ backgroundColor: getInitialColor(candidate.name) }}
            >
              {candidate.name[0]}
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-foreground">{candidate.name}</h1>
              <p className="text-[14px] text-muted mt-0.5">{candidate.job}</p>
            </div>
          </div>
          <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${badge.bg} ${badge.text}`}>
            {stage}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 pt-5 border-t border-border/60">
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Mail size={14} />
            {candidate.email}
          </div>
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Phone size={14} />
            {candidate.phone}
          </div>
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Briefcase size={14} />
            {candidate.job}
          </div>
          <div className="flex items-center gap-2 text-[13px] text-muted">
            <Clock size={14} />
            지원일 {candidate.applied_at}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 왼쪽: 타임라인 + 메모 */}
        <div className="col-span-2">
          {/* 탭 */}
          <div className="flex gap-1 mb-4 bg-card-hover rounded-xl p-1">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
                activeTab === 'timeline' ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
              }`}
            >
              <FileText size={14} />
              타임라인
            </button>
            <button
              onClick={() => setActiveTab('memo')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
                activeTab === 'memo' ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
              }`}
            >
              <MessageSquare size={14} />
              메모
            </button>
          </div>

          {activeTab === 'timeline' && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h2 className="text-[15px] font-bold text-foreground mb-5">진행 이력</h2>
              <div className="space-y-0">
                {mockTimeline.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary-light flex-shrink-0 mt-1" />
                      {i < mockTimeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border min-h-[40px]" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-[13px] font-semibold text-foreground">{item.action}</p>
                      <p className="text-[12px] text-muted mt-0.5">{item.detail}</p>
                      <p className="text-[11px] text-muted/60 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'memo' && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h2 className="text-[15px] font-bold text-foreground mb-4">메모</h2>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                placeholder="후보자에 대한 메모를 남겨보세요..."
              />
              <button className="mt-3 bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft">
                저장
              </button>
            </div>
          )}
        </div>

        {/* 오른쪽: 단계 변경 */}
        <div>
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h2 className="text-[15px] font-bold text-foreground mb-4">채용 단계</h2>
            <div className="space-y-2">
              {ALL_STAGES.map((s) => {
                const sBadge = stageBadge[s]
                const isActive = s === stage
                return (
                  <button
                    key={s}
                    onClick={() => handleStageChange(s)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${
                      isActive
                        ? `${sBadge.bg} ${sBadge.text} ring-2 ring-current/20`
                        : 'bg-card-hover text-muted hover:text-foreground'
                    }`}
                  >
                    {s}
                    {isActive && <ChevronRight size={14} />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
