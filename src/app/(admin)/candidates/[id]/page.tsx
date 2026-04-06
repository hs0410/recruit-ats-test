'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Briefcase, Clock, FileText, MessageSquare, ChevronRight, ClipboardList, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
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

// 전형 결과 타입
type DecisionResult = '합격' | '보류' | '불합격'
type DecisionStage = '서류전형' | '1차면접' | '2차면접' | '처우협의'

interface DecisionRecord {
  id: string
  date: string
  stage: DecisionStage
  result: DecisionResult
  reason: string
  recorder: string
}

// 결과 뱃지 스타일
const resultBadgeStyle: Record<DecisionResult, { bg: string; text: string; icon: typeof ThumbsUp }> = {
  '합격': { bg: 'bg-[#e8f5e9]', text: 'text-[#2e7d32]', icon: ThumbsUp },
  '보류': { bg: 'bg-[#fff8e1]', text: 'text-[#f59e0b]', icon: Minus },
  '불합격': { bg: 'bg-[#fce4ec]', text: 'text-[#c62828]', icon: ThumbsDown },
}

// 목 데이터: 기존 기록된 전형 결과
const mockDecisions: DecisionRecord[] = [
  {
    id: 'd1',
    date: '2026-04-02',
    stage: '서류전형',
    result: '합격',
    reason: '직무 관련 경력 3년 이상, Java/Spring 기반 프로젝트 다수 수행. 포트폴리오 내 코드 품질 양호.',
    recorder: '채용담당 박지영',
  },
  {
    id: 'd2',
    date: '2026-04-05',
    stage: '1차면접',
    result: '보류',
    reason: '기술 역량은 양호하나 커뮤니케이션 스킬 보완 필요. 2차 면접에서 재확인 예정.',
    recorder: '채용담당 박지영',
  },
  {
    id: 'd3',
    date: '2026-04-06',
    stage: '2차면접',
    result: '불합격',
    reason: '팀 핏 부족. 협업 경험 부족으로 현재 팀 상황과 맞지 않다고 판단.',
    recorder: '채용담당 박지영',
  },
]

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

  // 전형 결과 기록 폼 상태
  const [decisionStage, setDecisionStage] = useState<DecisionStage>('서류전형')
  const [decisionResult, setDecisionResult] = useState<DecisionResult>('합격')
  const [decisionReason, setDecisionReason] = useState('')
  const [decisions, setDecisions] = useState<DecisionRecord[]>(mockDecisions)

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

  const handleRecordDecision = () => {
    if (!decisionReason.trim()) return
    const newDecision: DecisionRecord = {
      id: `d${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      stage: decisionStage,
      result: decisionResult,
      reason: decisionReason.trim(),
      recorder: '채용담당 박지영',
    }
    setDecisions([newDecision, ...decisions])
    setDecisionReason('')
  }

  const decisionStages: DecisionStage[] = ['서류전형', '1차면접', '2차면접', '처우협의']
  const decisionResults: DecisionResult[] = ['합격', '보류', '불합격']

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

      {/* 전형 결과 기록 섹션 */}
      <div className="mt-6 bg-card rounded-2xl border border-border p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-5">
          <ClipboardList size={18} className="text-primary" />
          <h2 className="text-[15px] font-bold text-foreground">전형 결과 기록</h2>
        </div>

        {/* 기록 폼 */}
        <div className="space-y-4">
          {/* 전형 단계 선택 */}
          <div>
            <label className="block text-[12px] font-semibold text-muted mb-1.5">전형 단계</label>
            <select
              value={decisionStage}
              onChange={(e) => setDecisionStage(e.target.value as DecisionStage)}
              className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer"
            >
              {decisionStages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* 합격/보류/불합격 라디오 */}
          <div>
            <label className="block text-[12px] font-semibold text-muted mb-2">결과</label>
            <div className="flex gap-2">
              {decisionResults.map((r) => {
                const style = resultBadgeStyle[r]
                const Icon = style.icon
                const isSelected = decisionResult === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setDecisionResult(r)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all border ${
                      isSelected
                        ? `${style.bg} ${style.text} border-current/20 ring-2 ring-current/10`
                        : 'bg-card-hover text-muted border-border hover:text-foreground'
                    }`}
                  >
                    <Icon size={14} />
                    {r}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 사유 입력 */}
          <div>
            <label className="block text-[12px] font-semibold text-muted mb-1.5">판단 사유</label>
            <textarea
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              placeholder="판단 근거를 기록해주세요. 추후 감사 대응 시 활용됩니다."
            />
          </div>

          {/* 기록 버튼 */}
          <button
            onClick={handleRecordDecision}
            disabled={!decisionReason.trim()}
            className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft disabled:opacity-40 disabled:cursor-not-allowed"
          >
            기록 저장
          </button>
        </div>

        {/* 기록 이력 리스트 */}
        {decisions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border/60">
            <h3 className="text-[13px] font-bold text-foreground mb-4">기록 이력</h3>
            <div className="space-y-3">
              {decisions.map((d) => {
                const style = resultBadgeStyle[d.result]
                const Icon = style.icon
                return (
                  <div key={d.id} className="bg-card-hover rounded-xl p-4 border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-muted bg-[#f2f4f6] px-2.5 py-0.5 rounded-lg">
                          {d.stage}
                        </span>
                        <span className={`flex items-center gap-1 text-[12px] font-semibold px-2.5 py-0.5 rounded-lg ${style.bg} ${style.text}`}>
                          <Icon size={12} />
                          {d.result}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted/60">{d.date}</span>
                    </div>
                    <p className="text-[13px] text-foreground leading-relaxed">{d.reason}</p>
                    <p className="text-[11px] text-muted mt-2">기록자: {d.recorder}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
