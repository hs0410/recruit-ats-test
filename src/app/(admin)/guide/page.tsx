'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, GraduationCap, ClipboardCheck, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Clock, Plus, X, Flame, History } from 'lucide-react'
import { interviewQuestions, categoryLabels, type InterviewQuestion } from '@/lib/interview-questions'

/* ── 질문 이력 데이터 ── */
interface QuestionHistory {
  id: string
  date: string
  candidate: string
  position: string
  interviewer: string
  questions: string[]
  notes: string
}

const initialHistory: QuestionHistory[] = [
  { id: 'h1', date: '2026-04-03', candidate: '박서준', position: '프론트엔드 개발자', interviewer: '김팀장', questions: ['React 상태관리 경험을 설명해주세요', '팀 내 갈등 상황에서 어떻게 해결했나요?'], notes: '기술 역량 우수, STAR 구조로 답변. React 깊이 있음.' },
  { id: 'h2', date: '2026-04-01', candidate: '최유진', position: '백엔드 개발자', interviewer: '이매니저', questions: ['MSA 전환 경험이 있나요?', '장애 대응 경험을 말씀해주세요', '코드리뷰를 어떻게 하시나요?'], notes: '경험 풍부하나 커뮤니케이션 보완 필요.' },
  { id: 'h3', date: '2026-03-28', candidate: '정민호', position: 'PM', interviewer: '박팀장', questions: ['제품 우선순위를 어떻게 결정하나요?', '데이터 기반 의사결정 경험을 공유해주세요'], notes: '논리적 사고력 좋음. 정량적 접근 우수.' },
  { id: 'h4', date: '2026-03-25', candidate: '한소희', position: '마케터', interviewer: '김팀장', questions: ['성과 측정은 어떤 지표로 하나요?', '실패한 캠페인 경험을 말씀해주세요'], notes: '정량적 사고 뛰어남. GA/Amplitude 능숙.' },
  { id: 'h5', date: '2026-03-20', candidate: '이준호', position: '백엔드 개발자', interviewer: '이매니저', questions: ['대규모 트래픽 처리 경험이 있나요?', 'DB 최적화 사례를 설명해주세요'], notes: '신입 치고 깊이 있는 답변. 성장 가능성 높음.' },
]

// 질문별 사용 횟수 계산
function getQuestionUsageCount(questionText: string, history: QuestionHistory[]): number {
  return history.reduce((count, h) => {
    return count + h.questions.filter(q => q.includes(questionText.slice(0, 10)) || questionText.includes(q.slice(0, 10))).length
  }, 0)
}

const tabs = [
  { key: 'behavioral' as const, label: '행동면접', desc: '과거 경험 기반 질문' },
  { key: 'technical' as const, label: '기술면접', desc: '직무 역량 평가 질문' },
  { key: 'culture' as const, label: '컬처핏', desc: '조직 적합도 질문' },
  { key: 'history' as const, label: '질문 이력', desc: '면접 질문 사용 기록' },
]

type TabKey = 'behavioral' | 'technical' | 'culture' | 'history'

function QuestionCard({ q, usageCount }: { q: InterviewQuestion; usageCount: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 text-left flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-foreground leading-relaxed">{q.question}</p>
            {usageCount >= 3 && <Flame size={14} className="text-orange-400 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 mt-2">
            {q.position && (
              <span className="text-[11px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                {q.position}
              </span>
            )}
            {usageCount > 0 && (
              <span className="text-[10px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">
                사용 {usageCount}회
              </span>
            )}
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-muted mt-1 flex-shrink-0" /> : <ChevronDown size={16} className="text-muted mt-1 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 space-y-4 border-t border-border/60 pt-4">
          <div>
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">질문 의도</p>
            <p className="text-[13px] text-foreground">{q.intent}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-success uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> 좋은 신호
              </p>
              <ul className="space-y-1.5">
                {q.goodSignals.map((s, i) => (
                  <li key={i} className="text-[12px] text-muted flex items-start gap-2">
                    <span className="text-success mt-0.5">+</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-danger uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertTriangle size={12} /> 레드 플래그
              </p>
              <ul className="space-y-1.5">
                {q.redFlags.map((s, i) => (
                  <li key={i} className="text-[12px] text-muted flex items-start gap-2">
                    <span className="text-danger mt-0.5">-</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── 질문 이력 탭 컨텐츠 ── */
function HistoryTab({ history, setHistory }: { history: QuestionHistory[]; setHistory: (h: QuestionHistory[]) => void }) {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ candidate: '', position: '', interviewer: '', date: '2026-04-07', questions: '' as string, notes: '' })

  // 가장 많이 사용된 질문 TOP5
  const allQuestions = history.flatMap(h => h.questions)
  const qCount: Record<string, number> = {}
  allQuestions.forEach(q => { qCount[q] = (qCount[q] || 0) + 1 })
  const topQuestions = Object.entries(qCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const maxCount = topQuestions[0]?.[1] || 1

  // 카테고리 분포
  const totalQ = allQuestions.length || 1
  const categoryDist = [
    { label: '인성', count: Math.round(totalQ * 0.4), color: 'bg-primary' },
    { label: '직무', count: Math.round(totalQ * 0.45), color: 'bg-[#8b5cf6]' },
    { label: '상황', count: Math.round(totalQ * 0.15), color: 'bg-emerald-500' },
  ]

  const handleSave = () => {
    if (!form.candidate || !form.questions) return
    const newEntry: QuestionHistory = {
      id: `h${Date.now()}`,
      date: form.date,
      candidate: form.candidate,
      position: form.position,
      interviewer: form.interviewer,
      questions: form.questions.split('\n').filter(q => q.trim()),
      notes: form.notes,
    }
    setHistory([newEntry, ...history])
    setForm({ candidate: '', position: '', interviewer: '', date: '2026-04-07', questions: '', notes: '' })
    setShowModal(false)
  }

  return (
    <div>
      {/* 통계 */}
      <div className="grid grid-cols-2 gap-5 mb-6">
        {/* TOP 5 질문 */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <h4 className="text-[13px] font-bold text-foreground mb-3 flex items-center gap-2">
            <Flame size={14} className="text-orange-400" />
            가장 많이 사용된 질문 TOP 5
          </h4>
          <div className="space-y-2.5">
            {topQuestions.map(([q, count], i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-[11px] text-foreground truncate mr-2">{q}</span>
                  <span className="text-[11px] font-bold text-primary flex-shrink-0">{count}회</span>
                </div>
                <div className="h-1.5 bg-card-hover rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리 분포 */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <h4 className="text-[13px] font-bold text-foreground mb-3">직무별 질문 분포</h4>
          <div className="space-y-3">
            {categoryDist.map(c => (
              <div key={c.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[12px] font-semibold text-foreground">{c.label}</span>
                  <span className="text-[12px] text-muted">{c.count}건 ({Math.round(c.count / totalQ * 100)}%)</span>
                </div>
                <div className="h-2 bg-card-hover rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.count / totalQ * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted mt-3">총 {totalQ}개 질문 기록</p>
        </div>
      </div>

      {/* 기록 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[14px] font-bold text-foreground">면접 질문 기록</h4>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-[#6366f1] text-white px-4 py-2 rounded-xl text-[12px] font-semibold hover:opacity-90"
        >
          <Plus size={14} />
          면접 질문 기록
        </button>
      </div>

      {/* 이력 카드 */}
      <div className="space-y-3">
        {history.map(h => (
          <div key={h.id} className="bg-card rounded-2xl border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-[#8b5cf6]/10 flex items-center justify-center">
                  <History size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground">{h.candidate} · {h.position}</p>
                  <p className="text-[11px] text-muted">면접관: {h.interviewer} · {h.date}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {h.questions.map((q, i) => (
                <span key={i} className="text-[11px] font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full">
                  {q}
                </span>
              ))}
            </div>
            {h.notes && (
              <p className="text-[12px] text-muted bg-card-hover rounded-xl px-3 py-2">
                📝 {h.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 기록 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl border border-border p-6 w-[520px] shadow-soft-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[16px] font-bold text-foreground">면접 질문 기록</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-muted mb-1 block">후보자명 *</label>
                  <input value={form.candidate} onChange={e => setForm({ ...form, candidate: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-border text-[13px]" placeholder="이름" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted mb-1 block">포지션</label>
                  <input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-border text-[13px]" placeholder="직무" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted mb-1 block">면접관</label>
                  <input value={form.interviewer} onChange={e => setForm({ ...form, interviewer: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-border text-[13px]" placeholder="면접관" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted mb-1 block">날짜</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-border text-[13px]" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-muted mb-1 block">질문 목록 * (줄바꿈으로 구분)</label>
                <textarea value={form.questions} onChange={e => setForm({ ...form, questions: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-xl border border-border text-[13px] resize-none" placeholder="질문 1&#10;질문 2&#10;질문 3" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-muted mb-1 block">메모</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-xl border border-border text-[13px] resize-none" placeholder="면접 소감, 후보자 인상 등" />
              </div>
              <button
                onClick={handleSave}
                disabled={!form.candidate || !form.questions}
                className="w-full bg-gradient-to-r from-primary to-[#6366f1] text-white py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 disabled:opacity-40"
              >
                기록 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── 메인 페이지 ── */
export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('behavioral')
  const [search, setSearch] = useState('')
  const [history, setHistory] = useState<QuestionHistory[]>(initialHistory)

  const filtered = interviewQuestions.filter(q => {
    const matchCategory = q.category === activeTab
    const matchSearch = !search || q.question.includes(search) || (q.position?.includes(search) ?? false)
    return matchCategory && matchSearch
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#6366f1] flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            면접 가이드
          </h1>
          <p className="text-[14px] text-muted mt-1">포지션별 면접 질문과 평가 가이드</p>
        </div>
        <div className="flex gap-2">
          <Link href="/guide/training" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold bg-card-hover text-muted hover:text-foreground transition-colors border border-border">
            <GraduationCap size={14} />
            면접관 교육
          </Link>
          <Link href="/guide/checklist" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold bg-card-hover text-muted hover:text-foreground transition-colors border border-border">
            <ClipboardCheck size={14} />
            면접 전 체크리스트
          </Link>
        </div>
      </div>

      {/* STAR 가이드 */}
      {activeTab !== 'history' && (
        <div className="bg-gradient-to-r from-primary-light to-[#eef2ff] rounded-2xl p-5 mb-6 border border-primary/10">
          <p className="text-[13px] font-bold text-foreground mb-1">STAR 프레임워크</p>
          <p className="text-[12px] text-muted">
            <span className="font-semibold text-primary">S</span>ituation (상황) →
            <span className="font-semibold text-primary"> T</span>ask (과제) →
            <span className="font-semibold text-primary"> A</span>ction (행동) →
            <span className="font-semibold text-primary"> R</span>esult (결과) 순서로 답변을 유도하세요
          </p>
        </div>
      )}

      {/* 탭 */}
      <div className="flex gap-1 mb-5 bg-card-hover rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 rounded-lg text-[13px] font-semibold transition-all ${
              activeTab === tab.key ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
            }`}
          >
            {tab.label}
            <span className="block text-[10px] font-normal text-muted mt-0.5">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* 질문 이력 탭 */}
      {activeTab === 'history' ? (
        <HistoryTab history={history} setHistory={setHistory} />
      ) : (
        <>
          {/* 검색 */}
          <div className="relative mb-5">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="질문 또는 포지션으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-card text-[13px] placeholder:text-muted/60"
            />
          </div>

          {/* 질문 리스트 */}
          <div className="space-y-3">
            {filtered.map((q) => (
              <QuestionCard key={q.id} q={q} usageCount={getQuestionUsageCount(q.question, history)} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[13px] text-muted">검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
