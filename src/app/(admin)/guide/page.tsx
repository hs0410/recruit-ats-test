'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, GraduationCap, ClipboardCheck, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { interviewQuestions, categoryLabels, type InterviewQuestion } from '@/lib/interview-questions'

const tabs = [
  { key: 'behavioral' as const, label: '행동면접', desc: '과거 경험 기반 질문' },
  { key: 'technical' as const, label: '기술면접', desc: '직무 역량 평가 질문' },
  { key: 'culture' as const, label: '컬처핏', desc: '조직 적합도 질문' },
]

function QuestionCard({ q }: { q: InterviewQuestion }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 text-left flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-foreground leading-relaxed">{q.question}</p>
          {q.position && (
            <span className="inline-block mt-2 text-[11px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full">
              {q.position}
            </span>
          )}
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

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'behavioral' | 'technical' | 'culture'>('behavioral')
  const [search, setSearch] = useState('')

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
      <div className="bg-gradient-to-r from-primary-light to-[#eef2ff] rounded-2xl p-5 mb-6 border border-primary/10">
        <p className="text-[13px] font-bold text-foreground mb-1">STAR 프레임워크</p>
        <p className="text-[12px] text-muted">
          <span className="font-semibold text-primary">S</span>ituation (상황) →
          <span className="font-semibold text-primary"> T</span>ask (과제) →
          <span className="font-semibold text-primary"> A</span>ction (행동) →
          <span className="font-semibold text-primary"> R</span>esult (결과) 순서로 답변을 유도하세요
        </p>
      </div>

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
          <QuestionCard key={q.id} q={q} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[13px] text-muted">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  )
}
