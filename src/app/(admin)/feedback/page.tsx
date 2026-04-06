'use client'

import { useState } from 'react'
import {
  MessageSquare,
  Star,
  Send,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
} from 'lucide-react'

/* ───── 타입 정의 ───── */
type Recommendation = '강력추천' | '추천' | '보류' | '비추천'

interface CategoryRating {
  기술역량: number
  커뮤니케이션: number
  문화적합도: number
  성장가능성: number
}

interface FeedbackEntry {
  interviewerName: string
  overall: number
  categories: CategoryRating
  strengths: string
  concerns: string
  recommendation: Recommendation
}

interface InterviewFeedback {
  id: string
  candidateName: string
  position: string
  interviewDate: string
  stage: string
  interviewers: {
    name: string
    status: '대기중' | '제출완료'
    feedback?: FeedbackEntry
  }[]
}

/* ───── 목 데이터 ───── */
const initialData: InterviewFeedback[] = [
  {
    id: '1',
    candidateName: '박서준',
    position: '프론트엔드 개발자',
    interviewDate: '2026-04-03',
    stage: '1차면접',
    interviewers: [
      {
        name: '이팀장',
        status: '제출완료',
        feedback: {
          interviewerName: '이팀장',
          overall: 4,
          categories: { 기술역량: 4, 커뮤니케이션: 5, 문화적합도: 4, 성장가능성: 5 },
          strengths: 'React/TypeScript 실무 경험이 탄탄하고, 커뮤니케이션 능력이 뛰어남. 복잡한 개념을 쉽게 설명하는 능력 보유.',
          concerns: '대규모 프로젝트 경험이 상대적으로 적음.',
          recommendation: '강력추천',
        },
      },
      {
        name: '김리드',
        status: '제출완료',
        feedback: {
          interviewerName: '김리드',
          overall: 4,
          categories: { 기술역량: 5, 커뮤니케이션: 4, 문화적합도: 3, 성장가능성: 4 },
          strengths: '코드 품질에 대한 높은 기준, 테스트 작성 습관이 좋음.',
          concerns: '팀 문화 적합도에 대해 추가 검증 필요.',
          recommendation: '추천',
        },
      },
      {
        name: '정시니어',
        status: '제출완료',
        feedback: {
          interviewerName: '정시니어',
          overall: 3,
          categories: { 기술역량: 3, 커뮤니케이션: 4, 문화적합도: 4, 성장가능성: 3 },
          strengths: '밝은 성격, 배우려는 자세가 좋음.',
          concerns: '시스템 설계 관련 깊이가 부족해 보임.',
          recommendation: '보류',
        },
      },
    ],
  },
  {
    id: '2',
    candidateName: '최유진',
    position: '프론트엔드 개발자',
    interviewDate: '2026-04-04',
    stage: '1차면접',
    interviewers: [
      {
        name: '이팀장',
        status: '대기중',
      },
      {
        name: '김리드',
        status: '대기중',
      },
    ],
  },
  {
    id: '3',
    candidateName: '정민호',
    position: '백엔드 개발자',
    interviewDate: '2026-04-05',
    stage: '2차면접',
    interviewers: [
      {
        name: '박CTO',
        status: '제출완료',
        feedback: {
          interviewerName: '박CTO',
          overall: 5,
          categories: { 기술역량: 5, 커뮤니케이션: 4, 문화적합도: 5, 성장가능성: 5 },
          strengths: '시스템 아키텍처에 대한 깊은 이해, JVM 튜닝 경험 인상적.',
          concerns: '특별한 우려 사항 없음.',
          recommendation: '강력추천',
        },
      },
      {
        name: '이팀장',
        status: '대기중',
      },
      {
        name: '최시니어',
        status: '제출완료',
        feedback: {
          interviewerName: '최시니어',
          overall: 4,
          categories: { 기술역량: 4, 커뮤니케이션: 5, 문화적합도: 4, 성장가능성: 4 },
          strengths: '논리적 사고력이 뛰어나고 문제 해결 접근 방식이 체계적.',
          concerns: '새로운 기술 도입에 다소 보수적인 성향.',
          recommendation: '추천',
        },
      },
    ],
  },
  {
    id: '4',
    candidateName: '한소희',
    position: 'PM',
    interviewDate: '2026-04-06',
    stage: '1차면접',
    interviewers: [
      {
        name: '정대표',
        status: '대기중',
      },
      {
        name: '오디렉터',
        status: '대기중',
      },
    ],
  },
]

/* ───── 헬퍼 ───── */
const categoryLabels: (keyof CategoryRating)[] = ['기술역량', '커뮤니케이션', '문화적합도', '성장가능성']
const recommendationOptions: Recommendation[] = ['강력추천', '추천', '보류', '비추천']

function getRecommendationColor(r: Recommendation) {
  switch (r) {
    case '강력추천': return 'text-[#00c471] bg-success-light'
    case '추천': return 'text-primary bg-primary-light'
    case '보류': return 'text-warning bg-warning-light'
    case '비추천': return 'text-danger bg-danger-light'
  }
}

function getStatusIcon(status: '대기중' | '제출완료') {
  if (status === '제출완료') return <CheckCircle2 size={14} className="text-[#00c471]" />
  return <Clock size={14} className="text-warning" />
}

function StarRating({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <Star
            size={readonly ? 14 : 18}
            className={star <= value ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-border'}
          />
        </button>
      ))}
    </div>
  )
}

/* ───── 메인 컴포넌트 ───── */
export default function FeedbackPage() {
  const [data, setData] = useState<InterviewFeedback[]>(initialData)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [feedbackFormTarget, setFeedbackFormTarget] = useState<{ interviewId: string; interviewerName: string } | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  // 피드백 폼 상태
  const [formOverall, setFormOverall] = useState(0)
  const [formCategories, setFormCategories] = useState<CategoryRating>({ 기술역량: 0, 커뮤니케이션: 0, 문화적합도: 0, 성장가능성: 0 })
  const [formStrengths, setFormStrengths] = useState('')
  const [formConcerns, setFormConcerns] = useState('')
  const [formRecommendation, setFormRecommendation] = useState<Recommendation | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const resetForm = () => {
    setFormOverall(0)
    setFormCategories({ 기술역량: 0, 커뮤니케이션: 0, 문화적합도: 0, 성장가능성: 0 })
    setFormStrengths('')
    setFormConcerns('')
    setFormRecommendation(null)
  }

  const openFeedbackForm = (interviewId: string, interviewerName: string) => {
    resetForm()
    setFeedbackFormTarget({ interviewId, interviewerName })
  }

  const submitFeedback = () => {
    if (!feedbackFormTarget || formOverall === 0 || !formRecommendation) return

    const newFeedback: FeedbackEntry = {
      interviewerName: feedbackFormTarget.interviewerName,
      overall: formOverall,
      categories: { ...formCategories },
      strengths: formStrengths,
      concerns: formConcerns,
      recommendation: formRecommendation,
    }

    setData(prev =>
      prev.map(item => {
        if (item.id !== feedbackFormTarget.interviewId) return item
        return {
          ...item,
          interviewers: item.interviewers.map(iv =>
            iv.name === feedbackFormTarget.interviewerName
              ? { ...iv, status: '제출완료' as const, feedback: newFeedback }
              : iv
          ),
        }
      })
    )

    setFeedbackFormTarget(null)
    resetForm()
    showToast('평가가 성공적으로 제출되었습니다.')
  }

  const sendLink = (candidateName: string) => {
    showToast(`${candidateName}의 면접관에게 평가표 링크를 발송했습니다.`)
  }

  const copyLink = () => {
    showToast('평가 링크가 클립보드에 복사되었습니다.')
  }

  /* ───── 집계 계산 ───── */
  const getAggregation = (interview: InterviewFeedback) => {
    const completedFeedbacks = interview.interviewers
      .filter(iv => iv.status === '제출완료' && iv.feedback)
      .map(iv => iv.feedback!)

    if (completedFeedbacks.length === 0) return null

    const avgOverall = completedFeedbacks.reduce((s, f) => s + f.overall, 0) / completedFeedbacks.length
    const avgCategories: Record<string, number> = {}
    categoryLabels.forEach(cat => {
      avgCategories[cat] = completedFeedbacks.reduce((s, f) => s + f.categories[cat], 0) / completedFeedbacks.length
    })

    const recCounts: Record<string, number> = {}
    completedFeedbacks.forEach(f => {
      recCounts[f.recommendation] = (recCounts[f.recommendation] || 0) + 1
    })

    return { avgOverall, avgCategories, recCounts, feedbacks: completedFeedbacks }
  }

  const pendingCount = data.reduce((s, d) => s + d.interviewers.filter(iv => iv.status === '대기중').length, 0)
  const completedCount = data.reduce((s, d) => s + d.interviewers.filter(iv => iv.status === '제출완료').length, 0)

  return (
    <div>
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#6366f1] flex items-center justify-center">
              <MessageSquare size={18} className="text-white" />
            </div>
            면접 피드백
          </h1>
          <p className="text-[14px] text-muted mt-1">면접관 평가를 수집하고 종합 결과를 확인합니다</p>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-warning" />
            <span className="text-[12px] font-semibold text-muted">대기중</span>
          </div>
          <p className="text-[28px] font-bold text-foreground">{pendingCount}<span className="text-[14px] text-muted font-normal ml-1">건</span></p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-[#00c471]" />
            <span className="text-[12px] font-semibold text-muted">제출완료</span>
          </div>
          <p className="text-[28px] font-bold text-foreground">{completedCount}<span className="text-[14px] text-muted font-normal ml-1">건</span></p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary" />
            <span className="text-[12px] font-semibold text-muted">총 후보자</span>
          </div>
          <p className="text-[28px] font-bold text-foreground">{data.length}<span className="text-[14px] text-muted font-normal ml-1">명</span></p>
        </div>
      </div>

      {/* 후보자 목록 */}
      <div className="space-y-4">
        {data.map((interview) => {
          const isExpanded = expandedId === interview.id
          const agg = getAggregation(interview)
          const allCompleted = interview.interviewers.every(iv => iv.status === '제출완료')
          const hasPending = interview.interviewers.some(iv => iv.status === '대기중')

          return (
            <div key={interview.id} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              {/* 후보자 헤더 */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : interview.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#6366f1] flex items-center justify-center text-white text-[14px] font-bold">
                    {interview.candidateName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-foreground">{interview.candidateName}</span>
                      <span className="text-[11px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">{interview.stage}</span>
                    </div>
                    <p className="text-[12px] text-muted mt-0.5">
                      {interview.position} &middot; {interview.interviewDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* 면접관 상태 뱃지 */}
                  <div className="flex items-center gap-2">
                    {interview.interviewers.map((iv) => (
                      <div key={iv.name} className="flex items-center gap-1 text-[11px] text-muted">
                        {getStatusIcon(iv.status)}
                        <span>{iv.name}</span>
                      </div>
                    ))}
                  </div>
                  {allCompleted && (
                    <span className="text-[11px] font-semibold text-[#00c471] bg-success-light px-2.5 py-1 rounded-full">완료</span>
                  )}
                  {hasPending && (
                    <span className="text-[11px] font-semibold text-warning bg-warning-light px-2.5 py-1 rounded-full">진행중</span>
                  )}
                  {isExpanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </div>
              </button>

              {/* 확장 영역 */}
              {isExpanded && (
                <div className="border-t border-border">
                  {/* 링크 발송 / 복사 */}
                  <div className="px-5 py-3 bg-card-hover flex items-center gap-2">
                    <button
                      onClick={() => sendLink(interview.candidateName)}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <Send size={12} />
                      면접관에게 평가표 링크 발송
                    </button>
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-muted bg-card px-3 py-1.5 rounded-lg border border-border hover:bg-card-hover transition-colors"
                    >
                      <Copy size={12} />
                      링크 복사
                    </button>
                  </div>

                  {/* 면접관별 피드백 상태 */}
                  <div className="p-5 space-y-3">
                    <p className="text-[13px] font-bold text-foreground mb-3">면접관별 평가 현황</p>
                    {interview.interviewers.map((iv) => (
                      <div key={iv.name} className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-card-hover">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-[12px] font-bold text-muted">
                            {iv.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-[13px] font-semibold text-foreground">{iv.name}</span>
                            <div className="flex items-center gap-1 mt-0.5">
                              {getStatusIcon(iv.status)}
                              <span className={`text-[11px] font-medium ${iv.status === '제출완료' ? 'text-[#00c471]' : 'text-warning'}`}>
                                {iv.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        {iv.status === '대기중' && (
                          <button
                            onClick={() => openFeedbackForm(interview.id, iv.name)}
                            className="text-[12px] font-semibold text-white bg-primary px-3 py-1.5 rounded-lg hover:bg-primary-hover transition-colors"
                          >
                            평가 입력
                          </button>
                        )}
                        {iv.status === '제출완료' && iv.feedback && (
                          <div className="flex items-center gap-3">
                            <StarRating value={iv.feedback.overall} readonly />
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getRecommendationColor(iv.feedback.recommendation)}`}>
                              {iv.feedback.recommendation}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 종합 결과 (모든 피드백 제출 완료 or 일부 제출 시) */}
                  {agg && (
                    <div className="border-t border-border p-5">
                      <p className="text-[13px] font-bold text-foreground mb-4 flex items-center gap-2">
                        <Users size={14} className="text-primary" />
                        종합 평가 결과
                        <span className="text-[11px] font-normal text-muted">({agg.feedbacks.length}명 평가 완료)</span>
                      </p>

                      {/* 평균 점수 */}
                      <div className="grid grid-cols-5 gap-3 mb-5">
                        <div className="bg-primary-light rounded-xl p-3 text-center">
                          <p className="text-[11px] font-semibold text-primary mb-1">종합 평균</p>
                          <p className="text-[22px] font-bold text-primary">{agg.avgOverall.toFixed(1)}</p>
                        </div>
                        {categoryLabels.map((cat) => (
                          <div key={cat} className="bg-card-hover rounded-xl p-3 text-center">
                            <p className="text-[11px] font-semibold text-muted mb-1">{cat}</p>
                            <p className="text-[20px] font-bold text-foreground">{agg.avgCategories[cat].toFixed(1)}</p>
                          </div>
                        ))}
                      </div>

                      {/* 추천 요약 */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-[12px] font-semibold text-muted">추천 종합:</span>
                        {Object.entries(agg.recCounts).map(([rec, count]) => (
                          <span key={rec} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${getRecommendationColor(rec as Recommendation)}`}>
                            {rec} {count}명
                          </span>
                        ))}
                      </div>

                      {/* 개별 면접관 상세 평가 */}
                      <div className="space-y-3">
                        <p className="text-[12px] font-bold text-muted">면접관별 상세 평가</p>
                        {agg.feedbacks.map((fb) => (
                          <div key={fb.interviewerName} className="bg-card-hover rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center text-[11px] font-bold text-muted">
                                  {fb.interviewerName.charAt(0)}
                                </div>
                                <span className="text-[13px] font-bold text-foreground">{fb.interviewerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <StarRating value={fb.overall} readonly />
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${getRecommendationColor(fb.recommendation)}`}>
                                  {fb.recommendation}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mb-3">
                              {categoryLabels.map((cat) => (
                                <div key={cat} className="text-center">
                                  <p className="text-[10px] text-muted">{cat}</p>
                                  <p className="text-[14px] font-bold text-foreground">{fb.categories[cat]}</p>
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-[12px]">
                              <div>
                                <p className="font-semibold text-[#00c471] mb-1 flex items-center gap-1">
                                  <CheckCircle2 size={11} /> 강점
                                </p>
                                <p className="text-muted leading-relaxed">{fb.strengths}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-warning mb-1 flex items-center gap-1">
                                  <AlertTriangle size={11} /> 우려사항
                                </p>
                                <p className="text-muted leading-relaxed">{fb.concerns}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 피드백 입력 모달 */}
      {feedbackFormTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-soft-lg border border-border w-[520px] max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-[18px] font-bold text-foreground">면접 평가 입력</h2>
              <p className="text-[13px] text-muted mt-1">
                {feedbackFormTarget.interviewerName} 면접관의 평가를 입력합니다
              </p>
            </div>

            <div className="p-6 space-y-5">
              {/* 종합 평점 */}
              <div>
                <label className="text-[13px] font-semibold text-foreground block mb-2">종합 평점</label>
                <StarRating value={formOverall} onChange={setFormOverall} />
              </div>

              {/* 카테고리별 평점 */}
              <div>
                <label className="text-[13px] font-semibold text-foreground block mb-3">항목별 평가</label>
                <div className="space-y-3">
                  {categoryLabels.map((cat) => (
                    <div key={cat} className="flex items-center justify-between py-2 px-3 rounded-xl bg-card-hover">
                      <span className="text-[13px] text-foreground">{cat}</span>
                      <StarRating
                        value={formCategories[cat]}
                        onChange={(v) => setFormCategories(prev => ({ ...prev, [cat]: v }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 강점 */}
              <div>
                <label className="text-[13px] font-semibold text-foreground block mb-2">강점</label>
                <textarea
                  value={formStrengths}
                  onChange={(e) => setFormStrengths(e.target.value)}
                  placeholder="후보자의 강점을 작성해주세요..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-[13px] placeholder:text-muted/60 resize-none"
                />
              </div>

              {/* 우려사항 */}
              <div>
                <label className="text-[13px] font-semibold text-foreground block mb-2">우려사항</label>
                <textarea
                  value={formConcerns}
                  onChange={(e) => setFormConcerns(e.target.value)}
                  placeholder="우려사항이 있다면 작성해주세요..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-[13px] placeholder:text-muted/60 resize-none"
                />
              </div>

              {/* 추천 여부 */}
              <div>
                <label className="text-[13px] font-semibold text-foreground block mb-3">추천 여부</label>
                <div className="grid grid-cols-4 gap-2">
                  {recommendationOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormRecommendation(opt)}
                      className={`py-2.5 rounded-xl text-[12px] font-semibold border transition-all ${
                        formRecommendation === opt
                          ? `${getRecommendationColor(opt)} border-current`
                          : 'text-muted border-border bg-card hover:bg-card-hover'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 모달 하단 버튼 */}
            <div className="p-6 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => { setFeedbackFormTarget(null); resetForm() }}
                className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-muted border border-border hover:bg-card-hover transition-colors"
              >
                취소
              </button>
              <button
                onClick={submitFeedback}
                disabled={formOverall === 0 || !formRecommendation}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <CheckCircle2 size={14} />
                평가 제출
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-white text-[13px] font-medium px-5 py-3 rounded-xl shadow-soft-lg animate-[fadeInUp_0.3s_ease]">
          {toast}
        </div>
      )}
    </div>
  )
}
