'use client'

import { useState } from 'react'
import {
  CalendarCheck,
  Video,
  Building2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Star,
  Play,
  CheckSquare,
  Square,
  Globe,
  Users,
  Newspaper,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react'

/* ────────────────────────────────────────
   면접 준비 페이지
   구직자가 면접을 체계적으로 준비할 수 있도록 지원
   ──────────────────────────────────────── */

const upcomingInterviews = [
  {
    company: '토스',
    position: '프론트엔드 개발자',
    date: '2026-04-10 (금) 14:00',
    type: '화상',
    typeIcon: Video,
    dDay: 'D-4',
    color: 'from-[#10b981] to-[#06b6d4]',
  },
  {
    company: '카카오',
    position: '백엔드 개발자',
    date: '2026-04-15 (수) 10:00',
    type: '대면',
    typeIcon: Building2,
    dDay: 'D-9',
    color: 'from-[#06b6d4] to-[#8b5cf6]',
  },
]

type QuestionCategory = '인성' | '직무' | '상황'

interface Question {
  id: number
  category: QuestionCategory
  text: string
  tip: string
}

const questions: Question[] = [
  // 인성
  { id: 1, category: '인성', text: '본인의 강점과 약점을 말씀해주세요.', tip: '약점은 개선 노력과 함께 언급하면 좋습니다.' },
  { id: 2, category: '인성', text: '팀에서 갈등이 생기면 어떻게 해결하시나요?', tip: '구체적인 경험과 해결 과정을 STAR 기법으로 정리하세요.' },
  { id: 3, category: '인성', text: '왜 이 회사에 지원하셨나요?', tip: '회사의 비전, 서비스, 기술 스택과 본인의 목표를 연결하세요.' },
  { id: 4, category: '인성', text: '5년 후 어떤 모습이길 원하시나요?', tip: '회사 내 성장 경로와 연결하여 답변하면 설득력이 높아집니다.' },
  { id: 5, category: '인성', text: '스트레스를 어떻게 관리하시나요?', tip: '건전한 해소법과 업무 효율 유지 방법을 함께 언급하세요.' },
  // 직무
  { id: 6, category: '직무', text: 'RESTful API 설계 원칙에 대해 설명해주세요.', tip: 'HTTP 메서드, 상태 코드, 리소스 설계 관점에서 답변하세요.' },
  { id: 7, category: '직무', text: '성능 최적화 경험이 있으신가요?', tip: '측정 → 병목 분석 → 개선 → 결과 순으로 설명하세요.' },
  { id: 8, category: '직무', text: 'Git 브랜치 전략은 어떤 것을 선호하시나요?', tip: 'Git Flow, Trunk-based 등 장단점을 비교하며 답변하세요.' },
  { id: 9, category: '직무', text: '테스트 코드 작성에 대한 생각을 말씀해주세요.', tip: '단위/통합/E2E 테스트의 차이와 경험을 언급하세요.' },
  { id: 10, category: '직무', text: '최근 관심 있는 기술 트렌드가 있나요?', tip: '단순 나열보다 왜 관심을 갖게 되었는지 이유를 설명하세요.' },
  // 상황
  { id: 11, category: '상황', text: '촉박한 마감 상황에서 어떻게 대처하셨나요?', tip: '우선순위 설정과 커뮤니케이션 과정을 강조하세요.' },
  { id: 12, category: '상황', text: '동료와 기술적 의견이 다를 때 어떻게 하셨나요?', tip: '데이터/근거 기반으로 논의한 경험을 공유하세요.' },
  { id: 13, category: '상황', text: '프로젝트 실패 경험과 배운 점을 말씀해주세요.', tip: '실패 자체보다 학습과 성장 포인트에 초점을 맞추세요.' },
  { id: 14, category: '상황', text: '갑자기 요구사항이 변경되면 어떻게 대응하시나요?', tip: '유연성과 체계적 대응 프로세스를 보여주세요.' },
  { id: 15, category: '상황', text: '본인이 리드한 프로젝트 경험을 알려주세요.', tip: '역할, 의사결정 과정, 결과를 구체적 수치와 함께 설명하세요.' },
]

const starMethod = [
  { label: 'Situation (상황)', desc: '어떤 상황이었는지 배경을 설명합니다', emoji: '🎯' },
  { label: 'Task (과제)', desc: '본인에게 주어진 역할/과제를 명확히 합니다', emoji: '📋' },
  { label: 'Action (행동)', desc: '구체적으로 어떤 행동을 했는지 설명합니다', emoji: '🚀' },
  { label: 'Result (결과)', desc: '행동의 결과와 배운 점을 공유합니다', emoji: '✅' },
]

const companyInfo = {
  name: '토스',
  industry: '핀테크 / IT 서비스',
  size: '임직원 약 3,000명',
  founded: '2013년',
  news: [
    '2026년 1분기 해외 결제 서비스 확장',
    '시리즈 H 투자 유치 완료',
    'AI 기반 개인화 금융 서비스 출시',
  ],
  culture: '자율과 책임, 빠른 실행, 데이터 기반 의사결정',
}

const checklistItems = [
  '면접 장소/링크 확인 및 접속 테스트',
  '지원한 포지션 JD 다시 읽기',
  '자기소개 1분 버전 리허설',
  '면접관에게 할 질문 3개 준비',
  '복장 및 준비물 점검',
]

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState<QuestionCategory>('인성')
  const [expandedQ, setExpandedQ] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [checklist, setChecklist] = useState<boolean[]>(Array(5).fill(false))
  const [toast, setToast] = useState(false)

  const tabs: QuestionCategory[] = ['인성', '직무', '상황']
  const filtered = questions.filter((q) => q.category === activeTab)

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <div className="relative">
      {/* 토스트 */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg text-[13px] animate-fade-in">
          준비 중인 기능입니다
        </div>
      )}

      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">면접 준비</h1>
        <p className="text-[14px] text-muted mt-1">체계적인 면접 준비로 합격 확률을 높이세요</p>
      </div>

      {/* ── 다가오는 면접 배너 ── */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        {upcomingInterviews.map((itv) => {
          const TypeIcon = itv.typeIcon
          return (
            <div
              key={itv.company}
              className="relative overflow-hidden bg-card border border-border rounded-2xl p-6 shadow-soft hover-lift"
            >
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br ${itv.color} rounded-full -translate-y-6 translate-x-6`} />
              </div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">다가오는 면접</p>
                  <h3 className="text-[17px] font-bold text-foreground">{itv.company}</h3>
                  <p className="text-[13px] text-muted mt-0.5">{itv.position}</p>
                </div>
                <span className={`bg-gradient-to-r ${itv.color} text-white text-[12px] font-bold px-3 py-1 rounded-xl`}>
                  {itv.dDay}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-[12px] text-muted">
                  <CalendarCheck size={14} />
                  {itv.date}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-muted">
                  <TypeIcon size={14} />
                  {itv.type} 면접
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── 메인 2컬럼 레이아웃 ── */}
      <div className="grid grid-cols-3 gap-6">
        {/* 왼쪽: 질문 은행 + STAR + 모의면접 */}
        <div className="col-span-2 space-y-6">
          {/* 질문 은행 */}
          <div className="bg-card border border-border rounded-2xl shadow-soft">
            <div className="p-6 pb-0">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle size={18} className="text-emerald-500" />
                <h2 className="text-[16px] font-bold text-foreground">면접 질문 은행</h2>
              </div>
              <p className="text-[12px] text-muted mb-4">자주 나오는 질문을 미리 연습해보세요</p>

              {/* 탭 */}
              <div className="flex gap-1 border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setExpandedQ(null) }}
                    className={`px-4 py-2.5 text-[13px] font-medium transition-all relative ${
                      activeTab === tab
                        ? 'text-emerald-600'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 pt-4 space-y-2">
              {filtered.map((q) => {
                const isOpen = expandedQ === q.id
                return (
                  <div key={q.id} className="border border-border/60 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedQ(isOpen ? null : q.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/5 transition-colors"
                    >
                      <span className="text-[13px] text-foreground font-medium pr-4">{q.text}</span>
                      {isOpen ? <ChevronUp size={16} className="text-muted shrink-0" /> : <ChevronDown size={16} className="text-muted shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 space-y-3">
                        <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3">
                          <Lightbulb size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                          <p className="text-[12px] text-emerald-700 dark:text-emerald-300">{q.tip}</p>
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-muted mb-1 block">내 답변 작성</label>
                          <textarea
                            className="w-full border border-border rounded-xl p-3 text-[13px] text-foreground bg-background resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                            rows={4}
                            placeholder="여기에 답변을 작성해보세요..."
                            value={answers[q.id] || ''}
                            onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* STAR 기법 가이드 */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-1">
              <Star size={18} className="text-amber-500" />
              <h2 className="text-[16px] font-bold text-foreground">STAR 기법 가이드</h2>
            </div>
            <p className="text-[12px] text-muted mb-5">경험 기반 질문에 구조화된 답변을 만드는 프레임워크</p>

            <div className="grid grid-cols-4 gap-3">
              {starMethod.map((step, idx) => (
                <div key={step.label} className="relative">
                  <div className="bg-gradient-to-b from-emerald-50 to-transparent dark:from-emerald-950/20 border border-border/60 rounded-xl p-4 text-center h-full">
                    <span className="text-2xl mb-2 block">{step.emoji}</span>
                    <p className="text-[13px] font-bold text-foreground mb-1">{step.label}</p>
                    <p className="text-[11px] text-muted leading-relaxed">{step.desc}</p>
                  </div>
                  {idx < 3 && (
                    <ArrowRight size={14} className="absolute right-[-14px] top-1/2 -translate-y-1/2 text-muted/40 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI 모의면접 */}
          <div className="bg-gradient-to-r from-[#10b981]/10 to-[#06b6d4]/10 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={18} className="text-emerald-500" />
                  <h2 className="text-[16px] font-bold text-foreground">AI 모의면접</h2>
                </div>
                <p className="text-[12px] text-muted">실전처럼 연습하고 AI 피드백을 받아보세요</p>
              </div>
              <button
                onClick={showToast}
                className="flex items-center gap-2 bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play size={15} />
                AI 모의면접 시작
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽: 기업 정보 + 체크리스트 */}
        <div className="space-y-6">
          {/* 기업 리서치 */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={18} className="text-cyan-500" />
              <h2 className="text-[16px] font-bold text-foreground">기업 리서치</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
                  <Building2 size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-foreground">{companyInfo.name}</p>
                  <p className="text-[11px] text-muted">{companyInfo.industry}</p>
                </div>
              </div>

              <div className="border-t border-border/60 pt-3 space-y-2.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-muted">기업 규모</span>
                  <span className="text-foreground font-medium">{companyInfo.size}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-muted">설립</span>
                  <span className="text-foreground font-medium">{companyInfo.founded}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-muted">조직문화</span>
                  <span className="text-foreground font-medium text-right max-w-[160px]">{companyInfo.culture}</span>
                </div>
              </div>

              <div className="border-t border-border/60 pt-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Newspaper size={13} className="text-muted" />
                  <p className="text-[11px] font-semibold text-muted">최근 뉴스</p>
                </div>
                <ul className="space-y-1.5">
                  {companyInfo.news.map((n, i) => (
                    <li key={i} className="text-[12px] text-foreground flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-1 shrink-0">-</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 면접 전날 체크리스트 */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare size={18} className="text-emerald-500" />
              <h2 className="text-[16px] font-bold text-foreground">면접 전날 체크리스트</h2>
            </div>
            <p className="text-[12px] text-muted mb-4">하나씩 확인하며 완벽하게 준비하세요</p>

            <div className="space-y-2">
              {checklistItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    setChecklist((prev) => {
                      const next = [...prev]
                      next[idx] = !next[idx]
                      return next
                    })
                  }
                  className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-muted/5 transition-colors text-left"
                >
                  {checklist[idx] ? (
                    <CheckSquare size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  ) : (
                    <Square size={16} className="text-muted/50 mt-0.5 shrink-0" />
                  )}
                  <span
                    className={`text-[13px] ${
                      checklist[idx] ? 'text-muted line-through' : 'text-foreground'
                    }`}
                  >
                    {item}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border/60">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-muted">완료</span>
                <span className="text-emerald-600 font-bold">
                  {checklist.filter(Boolean).length} / {checklistItems.length}
                </span>
              </div>
              <div className="mt-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] transition-all duration-300"
                  style={{ width: `${(checklist.filter(Boolean).length / checklistItems.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
