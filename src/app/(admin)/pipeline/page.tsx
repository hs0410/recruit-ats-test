'use client'

import { useState } from 'react'
import { STAGES, type Stage, type Candidate } from '@/lib/types'
import Link from 'next/link'
import { GripVertical, Mail, Plus, MoreHorizontal, Shield, ChevronDown, ChevronUp, Bot, User, Clock, Eye, Zap, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

/* ── 위험도 기반 워크플로우 데이터 ── */
type RiskLevel = 'low' | 'medium' | 'high'

interface RiskTask {
  task: string
  risk: RiskLevel
  aiRole: string
  humanRole: string
  automationPct: number
}

const riskTasks: RiskTask[] = [
  { task: '이력서 스크리닝', risk: 'low', aiRole: 'AI 자동 분석 (점수/키워드)', humanRole: '최종 통과 판단', automationPct: 80 },
  { task: 'JD-이력서 매칭', risk: 'low', aiRole: 'AI 자동 매칭률 산출', humanRole: '매칭 결과 검증', automationPct: 75 },
  { task: '면접 질문 생성', risk: 'medium', aiRole: 'AI 질문 초안 제안', humanRole: '질문 선별/수정', automationPct: 50 },
  { task: '면접 평가', risk: 'high', aiRole: 'AI 보조 (데이터 정리)', humanRole: '인간 직접 평가', automationPct: 20 },
  { task: '합격/불합격 판정', risk: 'high', aiRole: 'AI 참고 자료 제공', humanRole: '인간 최종 의사결정', automationPct: 10 },
  { task: '처우 협의', risk: 'high', aiRole: 'AI 시장 데이터 제공', humanRole: '인간 직접 협상', automationPct: 5 },
]

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; emoji: string }> = {
  low: { label: '낮음', color: 'text-emerald-600', bg: 'bg-emerald-50', emoji: '🟢' },
  medium: { label: '중간', color: 'text-amber-600', bg: 'bg-amber-50', emoji: '🟡' },
  high: { label: '높음', color: 'text-red-600', bg: 'bg-red-50', emoji: '🔴' },
}

/* ── 후보자 데이터 (기존 + AI/체류일 확장) ── */
interface ExtendedCandidate extends Candidate {
  daysInStage: number
  aiAnalyzed: boolean
}

const mockCandidates: ExtendedCandidate[] = [
  { id: '1', name: '김현수', phone: '010-1234-5678', email: 'kim@email.com', job_id: '1', stage: '서류접수', applied_at: '2026-04-01', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' }, daysInStage: 6, aiAnalyzed: true },
  { id: '2', name: '이지은', phone: '010-2345-6789', email: 'lee@email.com', job_id: '1', stage: '서류접수', applied_at: '2026-04-02', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' }, daysInStage: 5, aiAnalyzed: false },
  { id: '3', name: '박서준', phone: '010-3456-7890', email: 'park@email.com', job_id: '2', stage: '1차면접', applied_at: '2026-03-25', resume_url: null, memo: null, created_at: '', job: { id: '2', title: '프론트엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' }, daysInStage: 13, aiAnalyzed: true },
  { id: '4', name: '최유진', phone: '010-4567-8901', email: 'choi@email.com', job_id: '2', stage: '1차면접', applied_at: '2026-03-28', resume_url: null, memo: null, created_at: '', job: { id: '2', title: '프론트엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' }, daysInStage: 10, aiAnalyzed: true },
  { id: '5', name: '정민호', phone: '010-5678-9012', email: 'jung@email.com', job_id: '1', stage: '2차면접', applied_at: '2026-03-20', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' }, daysInStage: 18, aiAnalyzed: true },
  { id: '6', name: '한소희', phone: '010-6789-0123', email: 'han@email.com', job_id: '3', stage: '처우협의', applied_at: '2026-03-15', resume_url: null, memo: null, created_at: '', job: { id: '3', title: 'PM', department: '기획', description: '', status: 'open', created_at: '' }, daysInStage: 8, aiAnalyzed: true },
  { id: '7', name: '윤서연', phone: '010-7890-1234', email: 'yoon@email.com', job_id: '1', stage: '입사확정', applied_at: '2026-03-01', resume_url: null, memo: null, created_at: '', job: { id: '1', title: '백엔드 개발자', department: '개발', description: '', status: 'open', created_at: '' }, daysInStage: 2, aiAnalyzed: true },
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
  return colors[name.charCodeAt(0) % colors.length]
}

export default function PipelinePage() {
  const [candidates, setCandidates] = useState<ExtendedCandidate[]>(mockCandidates)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [showRiskPanel, setShowRiskPanel] = useState(false)

  const handleDragStart = (id: string) => setDraggedId(id)
  const handleDrop = (targetStage: Stage) => {
    if (!draggedId) return
    setCandidates(prev =>
      prev.map(c => c.id === draggedId ? { ...c, stage: targetStage, daysInStage: 0 } : c)
    )
    setDraggedId(null)
  }

  const stagnantCount = candidates.filter(c => c.daysInStage >= 7 && c.stage !== '입사확정' && c.stage !== '탈락').length
  const noAiCount = candidates.filter(c => !c.aiAnalyzed && c.stage !== '입사확정' && c.stage !== '탈락').length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[26px] font-bold text-foreground">파이프라인</h1>
          <p className="text-[14px] text-muted mt-1">후보자를 드래그하여 단계를 이동하세요</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRiskPanel(!showRiskPanel)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold border transition-all ${
              showRiskPanel
                ? 'bg-primary text-white border-primary'
                : 'bg-card text-foreground border-border hover:bg-card-hover'
            }`}
          >
            <Shield size={15} />
            위험도 워크플로우
            {showRiskPanel ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <Link href="/candidates/new" className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-soft">
            <Plus size={16} />
            후보자 등록
          </Link>
        </div>
      </div>

      {/* 위험도 기반 워크플로우 패널 */}
      {showRiskPanel && (
        <div className="mb-6 space-y-4">
          {/* AI-인간 분담 가이드 */}
          <div className="bg-gradient-to-r from-primary-light to-[#eef2ff] rounded-2xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Info size={15} className="text-primary" />
              <h4 className="text-[13px] font-bold text-foreground">AI-인간 역할 분담 원칙</h4>
            </div>
            <div className="flex gap-6 text-[12px] text-foreground/80">
              <span>🟢 <strong>낮음</strong> = AI 주도, 인간 검증</span>
              <span>🟡 <strong>중간</strong> = AI 보조, 인간 주도</span>
              <span>🔴 <strong>높음</strong> = 인간 주도, AI 참고자료만</span>
            </div>
          </div>

          {/* 리스크 알림 카드 */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-2xl p-4 border flex items-center gap-4 ${stagnantCount > 0 ? 'bg-amber-50 border-amber-200' : 'bg-card border-border'}`}>
              <Clock size={20} className={stagnantCount > 0 ? 'text-amber-500' : 'text-muted'} />
              <div>
                <p className="text-[13px] font-bold text-foreground">7일 이상 정체 후보자</p>
                <p className={`text-[20px] font-bold ${stagnantCount > 0 ? 'text-amber-600' : 'text-muted'}`}>{stagnantCount}명</p>
              </div>
            </div>
            <div className={`rounded-2xl p-4 border flex items-center gap-4 ${noAiCount > 0 ? 'bg-red-50 border-red-200' : 'bg-card border-border'}`}>
              <AlertTriangle size={20} className={noAiCount > 0 ? 'text-red-500' : 'text-muted'} />
              <div>
                <p className="text-[13px] font-bold text-foreground">AI 분석 미완료</p>
                <p className={`text-[20px] font-bold ${noAiCount > 0 ? 'text-red-600' : 'text-muted'}`}>{noAiCount}명</p>
              </div>
            </div>
          </div>

          {/* 과업별 위험도 테이블 */}
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-card-hover text-muted">
                  <th className="text-left px-4 py-3 font-semibold">과업</th>
                  <th className="text-center px-4 py-3 font-semibold">위험도</th>
                  <th className="text-left px-4 py-3 font-semibold"><Bot size={13} className="inline mr-1" />AI 역할</th>
                  <th className="text-left px-4 py-3 font-semibold"><User size={13} className="inline mr-1" />인간 역할</th>
                  <th className="text-center px-4 py-3 font-semibold">AI 자동화</th>
                </tr>
              </thead>
              <tbody>
                {riskTasks.map((t) => {
                  const rc = riskConfig[t.risk]
                  return (
                    <tr key={t.task} className="border-t border-border/60 hover:bg-card-hover/50">
                      <td className="px-4 py-3 font-semibold text-foreground">{t.task}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${rc.bg} ${rc.color}`}>
                          {rc.emoji} {rc.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted">{t.aiRole}</td>
                      <td className="px-4 py-3 text-muted">{t.humanRole}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 h-1.5 bg-card-hover rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${t.automationPct}%`,
                                background: t.risk === 'low' ? '#10b981' : t.risk === 'medium' ? '#f59e0b' : '#ef4444',
                              }}
                            />
                          </div>
                          <span className="text-[11px] text-muted font-semibold">{t.automationPct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 칸반 보드 */}
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
              <div className="flex items-center gap-2.5 mb-3 px-1">
                <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                <h3 className="text-[14px] font-bold text-foreground">{stage}</h3>
                <span className="text-[12px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">
                  {stageCandidates.length}
                </span>
              </div>

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
                    <div className="flex items-start justify-between mb-2">
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

                    {/* 배지들 */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {/* AI 분석 상태 */}
                      {candidate.aiAnalyzed ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} /> AI 분석 완료
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                          <AlertTriangle size={10} /> AI 분석 필요
                        </span>
                      )}
                      {/* 체류 위험도 */}
                      {candidate.daysInStage >= 14 && stage !== '입사확정' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                          <Clock size={10} /> {candidate.daysInStage}일 정체
                        </span>
                      )}
                      {candidate.daysInStage >= 7 && candidate.daysInStage < 14 && stage !== '입사확정' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Clock size={10} /> {candidate.daysInStage}일
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-muted">
                      <Mail size={11} />
                      {candidate.email}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
                      <span className="text-[11px] text-muted">지원 {candidate.applied_at}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/candidates/${candidate.id}`} className="p-1 rounded-lg hover:bg-card-hover text-muted hover:text-primary">
                          <Eye size={13} />
                        </Link>
                        <Link href="/evaluation" className="p-1 rounded-lg hover:bg-card-hover text-muted hover:text-primary">
                          <Zap size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

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
