'use client'

import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  Users,
  Edit3,
} from 'lucide-react'

// ── 타입 정의 ──
type OfferStage = '제안준비' | '1차제안' | '협의중' | '최종합의' | '입사확정'

interface NegotiationLog {
  date: string
  content: string
}

interface OfferCandidate {
  id: string
  name: string
  position: string
  stage: OfferStage
  proposedSalary: number    // 만원
  desiredSalary: number | null
  currentSalary: number | null
  startDate: string | null
  signingBonus: number | null
  stockOption: string | null
  benefits: string
  offerSentDate: string
  logs: NegotiationLog[]
}

// ── 단계 설정 ──
const OFFER_STAGES: OfferStage[] = ['제안준비', '1차제안', '협의중', '최종합의', '입사확정']

const stageConfig: Record<OfferStage, { color: string; bg: string }> = {
  '제안준비': { color: '#8b95a1', bg: '#f2f4f6' },
  '1차제안': { color: '#3182f6', bg: '#e8f3ff' },
  '협의중':  { color: '#f59e0b', bg: '#fef3c7' },
  '최종합의': { color: '#8b5cf6', bg: '#f3e8ff' },
  '입사확정': { color: '#00c471', bg: '#e8faf0' },
}

// ── 목 데이터 ──
const initialCandidates: OfferCandidate[] = [
  {
    id: '1',
    name: '한소희',
    position: 'PM',
    stage: '협의중',
    proposedSalary: 6500,
    desiredSalary: 7200,
    currentSalary: 5800,
    startDate: '2026-05-12',
    signingBonus: 300,
    stockOption: '스톡옵션 200주 (4년 베스팅)',
    benefits: '원격근무 주2회, 자기계발비 연 200만원',
    offerSentDate: '2026-03-28',
    logs: [
      { date: '2026-03-28', content: '1차 제안서 발송 (6,500만원)' },
      { date: '2026-04-01', content: '후보자 희망 연봉 7,200만원 회신' },
      { date: '2026-04-03', content: '사이닝 보너스 300만원 추가 제안' },
    ],
  },
  {
    id: '2',
    name: '정민호',
    position: '백엔드 개발자',
    stage: '1차제안',
    proposedSalary: 5800,
    desiredSalary: null,
    currentSalary: 5200,
    startDate: null,
    signingBonus: null,
    stockOption: null,
    benefits: '',
    offerSentDate: '2026-04-04',
    logs: [
      { date: '2026-04-04', content: '1차 제안서 발송 (5,800만원)' },
    ],
  },
  {
    id: '3',
    name: '이지은',
    position: '프론트엔드 개발자',
    stage: '최종합의',
    proposedSalary: 6000,
    desiredSalary: 6200,
    currentSalary: 5500,
    startDate: '2026-05-06',
    signingBonus: 200,
    stockOption: 'RSU 100주 (3년 베스팅)',
    benefits: '유연근무, 건강검진 프리미엄',
    offerSentDate: '2026-03-20',
    logs: [
      { date: '2026-03-20', content: '1차 제안서 발송 (5,700만원)' },
      { date: '2026-03-24', content: '후보자 6,200만원 희망 회신' },
      { date: '2026-03-27', content: '6,000만원 + 사이닝 200만원 역제안' },
      { date: '2026-04-02', content: '후보자 수락, 최종 합의 완료' },
    ],
  },
  {
    id: '4',
    name: '박서준',
    position: '데이터 분석가',
    stage: '제안준비',
    proposedSalary: 5000,
    desiredSalary: 5500,
    currentSalary: 4600,
    startDate: null,
    signingBonus: null,
    stockOption: null,
    benefits: '',
    offerSentDate: '2026-04-06',
    logs: [
      { date: '2026-04-06', content: '처우 제안 초안 작성 중' },
    ],
  },
]

// ── 유틸 ──
function formatSalary(val: number) {
  return val.toLocaleString() + '만원'
}

function daysSince(dateStr: string) {
  const diff = new Date().getTime() - new Date(dateStr).getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

function getInitialColor(name: string) {
  const colors = ['#3182f6', '#00c471', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1']
  return colors[name.charCodeAt(0) % colors.length]
}

// ── 탭 타입 ──
type Tab = 'board' | 'comparison'

export default function OfferPage() {
  const [candidates, setCandidates] = useState<OfferCandidate[]>(initialCandidates)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('board')
  const [editField, setEditField] = useState<string | null>(null)

  const selected = candidates.find(c => c.id === selectedId) || null

  // ── 통계 계산 ──
  const activeCount = candidates.filter(c => c.stage !== '입사확정').length
  const avgProposed = Math.round(
    candidates.reduce((sum, c) => sum + c.proposedSalary, 0) / candidates.length
  )
  const agreedCount = candidates.filter(c => c.stage === '최종합의' || c.stage === '입사확정').length
  const agreementRate = Math.round((agreedCount / candidates.length) * 100)
  const avgDays = Math.round(
    candidates.reduce((sum, c) => sum + daysSince(c.offerSentDate), 0) / candidates.length
  )

  // ── 필드 업데이트 ──
  const updateCandidate = (id: string, updates: Partial<OfferCandidate>) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  // ── 협상 로그 추가 ──
  const addLog = (id: string, content: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, logs: [...c.logs, { date: new Date().toISOString().slice(0, 10), content }] }
          : c
      )
    )
  }

  // ── 단계 변경 ──
  const moveStage = (id: string, direction: 'next' | 'prev') => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id !== id) return c
        const idx = OFFER_STAGES.indexOf(c.stage)
        const newIdx = direction === 'next' ? Math.min(idx + 1, OFFER_STAGES.length - 1) : Math.max(idx - 1, 0)
        return { ...c, stage: OFFER_STAGES[newIdx] }
      })
    )
  }

  return (
    <div>
      {/* ── 페이지 헤더 ── */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center">
            <DollarSign size={18} className="text-white" />
          </div>
          처우 협의 관리
        </h1>
        <p className="text-[14px] text-muted mt-1">오퍼 제안부터 최종 합의까지 한눈에 관리하세요</p>
      </div>

      {/* ── 요약 통계 ── */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: '진행중 협의', value: `${activeCount}건`, icon: Users, color: '#3182f6', bg: '#e8f3ff' },
          { label: '평균 제안액', value: formatSalary(avgProposed), icon: DollarSign, color: '#00c471', bg: '#e8faf0' },
          { label: '합의율', value: `${agreementRate}%`, icon: TrendingUp, color: '#8b5cf6', bg: '#f3e8ff' },
          { label: '평균 소요일', value: `${avgDays}일`, icon: Clock, color: '#f59e0b', bg: '#fef3c7' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <span className="text-[12px] text-muted font-medium">{stat.label}</span>
            </div>
            <p className="text-[22px] font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── 탭 전환 ── */}
      <div className="flex gap-1 bg-card-hover rounded-xl p-1 mb-6 w-fit">
        {([
          { key: 'board' as Tab, label: '협의 보드' },
          { key: 'comparison' as Tab, label: '비교 테이블' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSelectedId(null) }}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 메인 컨텐츠 ── */}
      {activeTab === 'board' && (
        <div className="flex gap-6">
          {/* 왼쪽: 협의 보드 */}
          <div className={`${selectedId ? 'w-[420px] flex-shrink-0' : 'flex-1'} transition-all`}>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {OFFER_STAGES.map((stage) => {
                const config = stageConfig[stage]
                const stageCandidates = candidates.filter(c => c.stage === stage)
                return (
                  <div key={stage} className={`${selectedId ? 'w-[200px]' : 'flex-1 min-w-[220px]'} flex-shrink-0`}>
                    {/* 단계 헤더 */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                      <span className="text-[13px] font-bold text-foreground">{stage}</span>
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: config.color, backgroundColor: config.bg }}
                      >
                        {stageCandidates.length}
                      </span>
                    </div>

                    {/* 카드 목록 */}
                    <div className="space-y-2.5">
                      {stageCandidates.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedId(selectedId === c.id ? null : c.id)}
                          className={`w-full text-left bg-card rounded-2xl border p-4 shadow-soft hover-lift transition-all ${
                            selectedId === c.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 mb-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                              style={{ backgroundColor: getInitialColor(c.name) }}
                            >
                              {c.name[0]}
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-foreground">{c.name}</p>
                              <p className="text-[11px] text-muted">{c.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="font-semibold text-foreground">
                              {formatSalary(c.proposedSalary)}
                            </span>
                            <span className="text-muted flex items-center gap-1">
                              <Clock size={11} />
                              {daysSince(c.offerSentDate)}일
                            </span>
                          </div>
                          {c.desiredSalary && (
                            <div className="mt-2 text-[11px] text-muted">
                              희망: {formatSalary(c.desiredSalary)}
                              <span className="ml-1" style={{ color: c.desiredSalary > c.proposedSalary ? '#f04452' : '#00c471' }}>
                                ({c.desiredSalary > c.proposedSalary ? '+' : ''}{formatSalary(c.desiredSalary - c.proposedSalary)})
                              </span>
                            </div>
                          )}
                        </button>
                      ))}

                      {stageCandidates.length === 0 && (
                        <div className="rounded-xl border-2 border-dashed border-border py-8 text-center">
                          <p className="text-[12px] text-muted">해당 단계 없음</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 오른쪽: 상세 패널 */}
          {selected && (
            <div className="flex-1 min-w-0">
              <div className="bg-card rounded-2xl border border-border shadow-soft p-6 sticky top-6">
                {/* 상세 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[16px] font-bold"
                      style={{ backgroundColor: getInitialColor(selected.name) }}
                    >
                      {selected.name[0]}
                    </div>
                    <div>
                      <h2 className="text-[18px] font-bold text-foreground">{selected.name}</h2>
                      <p className="text-[13px] text-muted">{selected.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {OFFER_STAGES.indexOf(selected.stage) > 0 && (
                      <button
                        onClick={() => moveStage(selected.id, 'prev')}
                        className="text-[12px] text-muted hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:bg-card-hover transition-colors"
                      >
                        이전
                      </button>
                    )}
                    {OFFER_STAGES.indexOf(selected.stage) < OFFER_STAGES.length - 1 && (
                      <button
                        onClick={() => moveStage(selected.id, 'next')}
                        className="text-[12px] text-white px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 transition-opacity flex items-center gap-1"
                      >
                        다음 단계 <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 현재 단계 */}
                <div className="flex items-center gap-1.5 mb-6">
                  {OFFER_STAGES.map((stage, i) => {
                    const isCurrent = stage === selected.stage
                    const isPast = OFFER_STAGES.indexOf(selected.stage) > i
                    const config = stageConfig[stage]
                    return (
                      <div key={stage} className="flex items-center gap-1.5">
                        <div
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            isCurrent ? 'ring-2 ring-offset-1' : ''
                          }`}
                          style={{
                            backgroundColor: isCurrent || isPast ? config.bg : '#f2f4f6',
                            color: isCurrent || isPast ? config.color : '#8b95a1',
                            boxShadow: isCurrent ? `0 0 0 2px ${config.color}` : undefined,
                          }}
                        >
                          {isCurrent && <CheckCircle2 size={10} className="inline mr-1" />}
                          {stage}
                        </div>
                        {i < OFFER_STAGES.length - 1 && (
                          <ArrowRight size={10} className="text-muted/40" />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* 처우 정보 그리드 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {/* 제안 연봉 */}
                  <div className="bg-card-hover/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-muted font-medium">제안 연봉</span>
                      <button onClick={() => setEditField(editField === 'proposed' ? null : 'proposed')}>
                        <Edit3 size={12} className="text-muted hover:text-primary" />
                      </button>
                    </div>
                    {editField === 'proposed' ? (
                      <input
                        type="number"
                        className="w-full text-[16px] font-bold text-foreground bg-card border border-border rounded-lg px-3 py-1.5"
                        value={selected.proposedSalary}
                        onChange={(e) => updateCandidate(selected.id, { proposedSalary: Number(e.target.value) })}
                        onBlur={() => setEditField(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditField(null)}
                        autoFocus
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-foreground">{formatSalary(selected.proposedSalary)}</p>
                    )}
                  </div>

                  {/* 희망 연봉 */}
                  <div className="bg-card-hover/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-muted font-medium">희망 연봉</span>
                      <button onClick={() => setEditField(editField === 'desired' ? null : 'desired')}>
                        <Edit3 size={12} className="text-muted hover:text-primary" />
                      </button>
                    </div>
                    {editField === 'desired' ? (
                      <input
                        type="number"
                        className="w-full text-[16px] font-bold text-foreground bg-card border border-border rounded-lg px-3 py-1.5"
                        value={selected.desiredSalary || ''}
                        placeholder="미정"
                        onChange={(e) => updateCandidate(selected.id, { desiredSalary: e.target.value ? Number(e.target.value) : null })}
                        onBlur={() => setEditField(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditField(null)}
                        autoFocus
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-foreground">
                        {selected.desiredSalary ? formatSalary(selected.desiredSalary) : '미정'}
                      </p>
                    )}
                    {selected.desiredSalary && selected.desiredSalary !== selected.proposedSalary && (
                      <p className="text-[11px] mt-1" style={{ color: selected.desiredSalary > selected.proposedSalary ? '#f04452' : '#00c471' }}>
                        차이 {selected.desiredSalary > selected.proposedSalary ? '+' : ''}{formatSalary(selected.desiredSalary - selected.proposedSalary)}
                      </p>
                    )}
                  </div>

                  {/* 현재 연봉 */}
                  <div className="bg-card-hover/50 rounded-xl p-4">
                    <span className="text-[11px] text-muted font-medium block mb-2">현재 연봉</span>
                    <p className="text-[16px] font-bold text-foreground">
                      {selected.currentSalary ? formatSalary(selected.currentSalary) : '미확인'}
                    </p>
                    {selected.currentSalary && (
                      <p className="text-[11px] text-muted mt-1">
                        인상률 {Math.round(((selected.proposedSalary - selected.currentSalary) / selected.currentSalary) * 100)}%
                      </p>
                    )}
                  </div>

                  {/* 입사 희망일 */}
                  <div className="bg-card-hover/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-muted font-medium">입사 희망일</span>
                      <button onClick={() => setEditField(editField === 'startDate' ? null : 'startDate')}>
                        <Edit3 size={12} className="text-muted hover:text-primary" />
                      </button>
                    </div>
                    {editField === 'startDate' ? (
                      <input
                        type="date"
                        className="w-full text-[14px] font-bold text-foreground bg-card border border-border rounded-lg px-3 py-1.5"
                        value={selected.startDate || ''}
                        onChange={(e) => updateCandidate(selected.id, { startDate: e.target.value || null })}
                        onBlur={() => setEditField(null)}
                        autoFocus
                      />
                    ) : (
                      <p className="text-[16px] font-bold text-foreground flex items-center gap-1.5">
                        <Calendar size={14} className="text-muted" />
                        {selected.startDate || '미정'}
                      </p>
                    )}
                  </div>
                </div>

                {/* 추가 보상 */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-[13px] font-bold text-foreground">추가 보상</h3>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-card-hover/50 rounded-xl p-3">
                      <span className="text-[11px] text-muted font-medium block mb-1">사이닝 보너스</span>
                      <p className="text-[14px] font-semibold text-foreground">
                        {selected.signingBonus ? formatSalary(selected.signingBonus) : '없음'}
                      </p>
                    </div>
                    <div className="flex-1 bg-card-hover/50 rounded-xl p-3">
                      <span className="text-[11px] text-muted font-medium block mb-1">스톡옵션/RSU</span>
                      <p className="text-[14px] font-semibold text-foreground">
                        {selected.stockOption || '없음'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-card-hover/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted font-medium">기타 복리후생</span>
                      <button onClick={() => setEditField(editField === 'benefits' ? null : 'benefits')}>
                        <Edit3 size={12} className="text-muted hover:text-primary" />
                      </button>
                    </div>
                    {editField === 'benefits' ? (
                      <textarea
                        className="w-full text-[13px] text-foreground bg-card border border-border rounded-lg px-3 py-2 resize-none"
                        rows={2}
                        value={selected.benefits}
                        onChange={(e) => updateCandidate(selected.id, { benefits: e.target.value })}
                        onBlur={() => setEditField(null)}
                        autoFocus
                      />
                    ) : (
                      <p className="text-[13px] text-foreground">
                        {selected.benefits || '없음'}
                      </p>
                    )}
                  </div>
                </div>

                {/* 협상 히스토리 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[13px] font-bold text-foreground flex items-center gap-1.5">
                      <FileText size={14} className="text-muted" />
                      협상 히스토리
                    </h3>
                    <button
                      onClick={() => {
                        const content = prompt('협상 내용을 입력하세요:')
                        if (content) addLog(selected.id, content)
                      }}
                      className="text-[11px] text-primary font-semibold hover:opacity-80 transition-opacity"
                    >
                      + 기록 추가
                    </button>
                  </div>
                  <div className="space-y-2 max-h-[240px] overflow-y-auto">
                    {selected.logs.map((log, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                          {i < selected.logs.length - 1 && (
                            <div className="w-px h-full bg-border min-h-[24px]" />
                          )}
                        </div>
                        <div className="pb-3">
                          <p className="text-[11px] text-muted">{log.date}</p>
                          <p className="text-[13px] text-foreground">{log.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 비교 테이블 ── */}
      {activeTab === 'comparison' && (
        <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['후보자', '포지션', '제안 연봉', '희망 연봉', '차이', '현재 연봉', '인상률', '사이닝 보너스', '단계', '소요일'].map((h) => (
                  <th key={h} className="text-[12px] font-semibold text-muted text-left px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => {
                const gap = c.desiredSalary ? c.desiredSalary - c.proposedSalary : null
                const raiseRate = c.currentSalary
                  ? Math.round(((c.proposedSalary - c.currentSalary) / c.currentSalary) * 100)
                  : null
                const config = stageConfig[c.stage]
                return (
                  <tr
                    key={c.id}
                    className="border-b border-border/60 hover:bg-card-hover/50 transition-colors cursor-pointer"
                    onClick={() => { setActiveTab('board'); setSelectedId(c.id) }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                          style={{ backgroundColor: getInitialColor(c.name) }}
                        >
                          {c.name[0]}
                        </div>
                        <span className="text-[13px] font-semibold text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">{c.position}</td>
                    <td className="px-4 py-3 text-[13px] font-semibold text-foreground">{formatSalary(c.proposedSalary)}</td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {c.desiredSalary ? formatSalary(c.desiredSalary) : '-'}
                    </td>
                    <td className="px-4 py-3 text-[13px] font-semibold" style={{ color: gap && gap > 0 ? '#f04452' : gap && gap < 0 ? '#00c471' : '#8b95a1' }}>
                      {gap !== null ? `${gap > 0 ? '+' : ''}${formatSalary(gap)}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {c.currentSalary ? formatSalary(c.currentSalary) : '-'}
                    </td>
                    <td className="px-4 py-3 text-[13px] font-semibold" style={{ color: raiseRate && raiseRate > 0 ? '#00c471' : '#8b95a1' }}>
                      {raiseRate !== null ? `${raiseRate}%` : '-'}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {c.signingBonus ? formatSalary(c.signingBonus) : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: config.color, backgroundColor: config.bg }}
                      >
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-muted">
                      {daysSince(c.offerSentDate)}일
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
