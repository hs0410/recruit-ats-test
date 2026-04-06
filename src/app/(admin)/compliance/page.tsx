'use client'

import { useState } from 'react'
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  Scale,
  Clock,
  AlertOctagon,
} from 'lucide-react'

/* ────────────────────────────────────────── 타입 정의 ── */
interface CheckItem {
  id: string
  label: string
  description?: string
}

interface CheckCategory {
  key: string
  title: string
  icon: React.ReactNode
  color: string
  bgColor: string
  items: CheckItem[]
}

interface LegalRef {
  article: string
  title: string
  summary: string
  penalty: string
  penaltyAmount?: string
}

/* ────────────────────────────── 체크리스트 데이터 ── */
const checkCategories: CheckCategory[] = [
  {
    key: 'posting',
    title: '채용공고 단계',
    icon: <FileText size={16} />,
    color: 'text-[#3182f6]',
    bgColor: 'bg-[#3182f6]/10',
    items: [
      { id: 'p1', label: '모집 직종, 업무내용, 근로조건 명시 여부', description: '채용절차법 제4조에 따라 채용공고에 필수 기재사항을 포함해야 합니다' },
      { id: 'p2', label: '채용일정 및 채용과정 고지', description: '전형 단계, 일정, 결과 통보 방법을 사전 공지해야 합니다' },
      { id: 'p3', label: '차별적 표현 점검 (성별/나이/출신 등)', description: '고용상 연령차별 금지법, 남녀고용평등법 위반 여부를 확인합니다' },
      { id: 'p4', label: '정규직/비정규직 구분 명시', description: '근로계약 형태를 공고에 명확히 표기해야 합니다' },
      { id: 'p5', label: '개인정보 수집 동의 안내', description: '개인정보보호법에 따라 수집 목적, 항목, 보유기간을 안내합니다' },
    ],
  },
  {
    key: 'screening',
    title: '서류전형 단계',
    icon: <Clock size={16} />,
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/10',
    items: [
      { id: 's1', label: '불합격자 통보 (14일 이내)', description: '채용절차법 제10조: 채용 여부를 14일 이내에 알려야 합니다' },
      { id: 's2', label: '채용서류 반환 고지', description: '채용절차법 제11조: 반환 청구 방법과 절차를 사전에 안내합니다' },
      { id: 's3', label: '개인정보 보유기간 안내', description: '채용 종료 후 개인정보 보유기간(최대 3년)을 고지합니다' },
      { id: 's4', label: '공정한 평가기준 문서화', description: '직무 관련 역량 중심의 평가 기준을 수립하고 문서화합니다' },
    ],
  },
  {
    key: 'interview',
    title: '면접전형 단계',
    icon: <Scale size={16} />,
    color: 'text-[#8b5cf6]',
    bgColor: 'bg-[#8b5cf6]/10',
    items: [
      { id: 'i1', label: '면접 일시/장소 사전 안내 (충분한 시간 확보)', description: '면접 일시를 합리적 기간 전에 통보하여 지원자 준비 시간을 보장합니다' },
      { id: 'i2', label: '차별적 질문 금지 (가족관계, 혼인여부, 종교 등)', description: '채용절차법 제4조의3: 직무와 무관한 개인정보 요구가 금지됩니다' },
      { id: 'i3', label: '면접 평가표 표준화', description: '모든 지원자에게 동일한 기준을 적용하는 평가표를 사용합니다' },
      { id: 'i4', label: '면접관 교육 이수 여부', description: '면접관 대상 채용 공정성, 차별 방지 교육 실시 여부를 확인합니다' },
    ],
  },
  {
    key: 'final',
    title: '최종/입사 단계',
    icon: <Shield size={16} />,
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/10',
    items: [
      { id: 'f1', label: '최종 불합격자 통보', description: '최종 탈락자에게 결과를 서면(이메일 포함)으로 통보합니다' },
      { id: 'f2', label: '채용서류 반환 절차 (원본 서류)', description: '채용절차법 제11조: 원본 서류를 14일 이내에 반환합니다' },
      { id: 'f3', label: '채용 확약서/근로계약서 교부', description: '근로기준법 제17조: 근로조건을 명시한 서면을 교부합니다' },
      { id: 'f4', label: '수습기간 조건 명시', description: '수습기간, 급여 조건, 평가 기준 등을 사전에 안내합니다' },
    ],
  },
]

/* ────────────────────────────── 법률 조항 데이터 ── */
const legalRefs: LegalRef[] = [
  {
    article: '제4조',
    title: '거짓 채용광고 등의 금지',
    summary: '거짓 채용광고나 거짓 근로조건을 제시하여 구직자를 채용하는 행위를 금지합니다. 모집 직종, 업무내용, 임금, 근로시간 등 근로조건을 정확히 명시해야 합니다.',
    penalty: '5년 이하의 징역 또는 2천만원 이하의 벌금',
    penaltyAmount: '2,000만원',
  },
  {
    article: '제4조의3',
    title: '출신지역 등 개인정보 요구 금지',
    summary: '직무 수행에 필요하지 않은 구직자의 개인정보(용모, 키, 체중, 출신지역, 혼인여부, 재산, 직계존비속 및 형제자매의 학력/직업/재산)를 요구하는 것을 금지합니다.',
    penalty: '과태료 500만원 이하',
    penaltyAmount: '500만원',
  },
  {
    article: '제10조',
    title: '채용 여부 통지의무',
    summary: '구인자는 채용대상자를 확정한 날부터 14일 이내에 구직자에게 채용 여부를 알려야 합니다. 서류심사, 필기시험, 면접 등 각 전형 단계별로 합격/불합격을 통보해야 합니다.',
    penalty: '과태료 300만원 이하',
    penaltyAmount: '300만원',
  },
  {
    article: '제11조',
    title: '채용서류의 반환',
    summary: '구직자가 채용서류의 반환을 청구하면 14일 이내에 반환해야 합니다. 반환에 소요되는 비용은 원칙적으로 구인자가 부담하며, 반환 청구 기간은 채용 여부 확정일로부터 180일입니다.',
    penalty: '과태료 300만원 이하',
    penaltyAmount: '300만원',
  },
]

/* ────────────────────────────── 컴포넌트 ── */
export default function CompliancePage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    posting: true,
    screening: true,
    interview: true,
    final: true,
  })

  // 전체 항목 수와 체크된 수
  const allItems = checkCategories.flatMap((c) => c.items)
  const totalItems = allItems.length
  const checkedCount = allItems.filter((item) => checked[item.id]).length
  const score = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  // 미이행 항목
  const uncheckedItems = allItems.filter((item) => !checked[item.id])

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // 점수별 색상
  const getScoreColor = (s: number) => {
    if (s >= 80) return { bar: 'bg-[#10b981]', text: 'text-[#10b981]', label: '양호' }
    if (s >= 60) return { bar: 'bg-[#f59e0b]', text: 'text-[#f59e0b]', label: '주의' }
    return { bar: 'bg-[#ef4444]', text: 'text-[#ef4444]', label: '위험' }
  }

  const scoreStyle = getScoreColor(score)

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#6366f1] flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          채용절차법 컴플라이언스
        </h1>
        <p className="text-[14px] text-muted mt-1">
          채용절차의 공정화에 관한 법률 준수 현황을 점검합니다
        </p>
      </div>

      {/* 컴플라이언스 점수 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${scoreStyle.bar} flex items-center justify-center`}>
              <Shield size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-foreground">전체 컴플라이언스 점수</p>
              <p className="text-[11px] text-muted">
                {totalItems}개 항목 중 {checkedCount}개 이행 완료
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-[28px] font-extrabold ${scoreStyle.text}`}>{score}%</p>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                score >= 80
                  ? 'bg-[#10b981]/10 text-[#10b981]'
                  : score >= 60
                    ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                    : 'bg-[#ef4444]/10 text-[#ef4444]'
              }`}
            >
              {scoreStyle.label}
            </span>
          </div>
        </div>
        <div className="w-full h-3 bg-card-hover rounded-full overflow-hidden">
          <div
            className={`h-full ${scoreStyle.bar} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>
        {score === 100 && (
          <p className="text-[12px] text-[#10b981] font-semibold mt-3 flex items-center gap-1.5">
            <CheckCircle2 size={14} />
            모든 컴플라이언스 항목을 이행했습니다
          </p>
        )}
      </div>

      {/* 미이행 항목 경고 */}
      {uncheckedItems.length > 0 && (
        <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ef4444]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertOctagon size={16} className="text-[#ef4444]" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#ef4444]">
              미이행 항목 {uncheckedItems.length}건
            </p>
            <p className="text-[12px] text-muted mt-0.5">
              아래 체크리스트에서 미이행 항목을 확인하고 조치해 주세요. 미이행 시 과태료 등 법적 제재를 받을 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* 체크리스트 카테고리 */}
      <div className="space-y-4 mb-8">
        {checkCategories.map((cat) => {
          const catItems = cat.items
          const catChecked = catItems.filter((item) => checked[item.id]).length
          const catTotal = catItems.length
          const catPercent = Math.round((catChecked / catTotal) * 100)
          const isOpen = openSections[cat.key]

          return (
            <div
              key={cat.key}
              className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden"
            >
              {/* 카테고리 헤더 */}
              <button
                onClick={() => toggleSection(cat.key)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-card-hover/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${cat.bgColor} flex items-center justify-center ${cat.color}`}
                  >
                    {cat.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-bold text-foreground">{cat.title}</p>
                    <p className="text-[11px] text-muted">
                      {catChecked}/{catTotal} 완료
                      {catPercent === 100 && (
                        <span className="text-[#10b981] ml-1.5 font-semibold">완료</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* 미니 프로그레스 */}
                  <div className="w-16 h-1.5 bg-card-hover rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        catPercent === 100
                          ? 'bg-[#10b981]'
                          : catPercent > 0
                            ? 'bg-[#3182f6]'
                            : 'bg-transparent'
                      }`}
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-semibold text-muted w-8 text-right">
                    {catPercent}%
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-muted" />
                  ) : (
                    <ChevronDown size={16} className="text-muted" />
                  )}
                </div>
              </button>

              {/* 체크 항목 리스트 */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-border/50">
                  <div className="mt-2 space-y-1">
                    {catItems.map((item) => {
                      const isChecked = checked[item.id]
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleCheck(item.id)}
                          className="flex items-start gap-3 px-3 py-3 rounded-xl w-full text-left hover:bg-card-hover transition-colors group"
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {isChecked ? (
                              <CheckCircle2 size={18} className="text-[#10b981]" />
                            ) : (
                              <div className="w-[18px] h-[18px] rounded-full border-2 border-muted/40 group-hover:border-[#3182f6] transition-colors" />
                            )}
                          </div>
                          <div>
                            <p
                              className={`text-[13px] font-medium ${
                                isChecked
                                  ? 'text-muted line-through'
                                  : 'text-foreground'
                              }`}
                            >
                              {item.label}
                            </p>
                            {item.description && !isChecked && (
                              <p className="text-[11px] text-muted mt-0.5">{item.description}</p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 관련 법률 조항 */}
      <div className="mb-2">
        <h2 className="text-[18px] font-bold text-foreground flex items-center gap-2 mb-4">
          <Scale size={18} className="text-[#3182f6]" />
          채용절차법 핵심 조항
        </h2>
        <p className="text-[13px] text-muted mb-5">
          채용절차의 공정화에 관한 법률의 주요 조항과 위반 시 제재 사항입니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {legalRefs.map((ref) => (
          <div
            key={ref.article}
            className="bg-card rounded-2xl border border-border p-5 shadow-soft"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3182f6]/10 flex items-center justify-center flex-shrink-0">
                <FileText size={14} className="text-[#3182f6]" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#3182f6]">{ref.article}</p>
                <p className="text-[14px] font-bold text-foreground">{ref.title}</p>
              </div>
            </div>
            <p className="text-[12px] text-muted leading-relaxed mb-4">{ref.summary}</p>
            <div className="flex items-center gap-2 bg-[#ef4444]/5 border border-[#ef4444]/15 rounded-xl px-3 py-2.5">
              <AlertTriangle size={14} className="text-[#ef4444] flex-shrink-0" />
              <div>
                <p className="text-[11px] text-muted">위반 시 제재</p>
                <p className="text-[12px] font-bold text-[#ef4444]">{ref.penalty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
