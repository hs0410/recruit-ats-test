'use client'

import { useState } from 'react'
import { Target, ArrowRight, ArrowLeftRight, Upload, ChevronDown, CheckCircle2, XCircle, MinusCircle, Sparkles, FileText } from 'lucide-react'

interface MatchResult {
  candidateName: string
  matchRate: number
  met: string[]
  partial: string[]
  notMet: string[]
  recommendation: 'interview' | 'hold' | 'reject'
  aiSummary: string
}

const mockJobs = [
  { id: '1', title: '백엔드 개발자', department: '개발' },
  { id: '2', title: '프론트엔드 개발자', department: '개발' },
  { id: '3', title: 'PM', department: '기획' },
]

// 공고 → 후보자 매칭 결과
const mockJobToCandidate: Record<string, MatchResult[]> = {
  '1': [
    {
      candidateName: '김현수', matchRate: 87,
      met: ['Java/Spring 숙련', '3년 이상 경력', 'REST API 설계 경험', 'AWS 경험'],
      partial: ['Docker/K8s (중급)'],
      notMet: ['NoSQL 경험 부족'],
      recommendation: 'interview',
      aiSummary: 'Spring 기반 백엔드 역량이 매우 우수하며, MSA 경험까지 보유. 즉시 면접 추천.',
    },
    {
      candidateName: '정민호', matchRate: 72,
      met: ['Node.js/TypeScript 숙련', 'REST API 경험'],
      partial: ['경력 2.5년 (3년 근접)', 'PostgreSQL (MySQL 아닌)'],
      notMet: ['Docker/K8s 경험 없음', 'AWS 경험 제한적'],
      recommendation: 'hold',
      aiSummary: 'Node.js 기반으로 Java 전환 가능성 있으나, 인프라 경험 보강 필요. 기술 면접에서 확인 추천.',
    },
    {
      candidateName: '이지은', matchRate: 45,
      met: ['Python 개발 경험'],
      partial: ['경력 1.5년'],
      notMet: ['Java/Spring 경험 없음', 'Docker/K8s 미경험', 'API 설계 경험 부족'],
      recommendation: 'reject',
      aiSummary: '현재 JD 요구사항과 기술 스택 불일치가 큼. 주니어 포지션이면 재검토 가능.',
    },
  ],
  '2': [
    {
      candidateName: '박서준', matchRate: 94,
      met: ['React/Next.js 숙련', '3년 이상 경력', 'TypeScript', '성능 최적화 경험', '디자인 시스템 경험'],
      partial: [],
      notMet: [],
      recommendation: 'interview',
      aiSummary: '모든 요구사항을 충족하며, 디자인 시스템 구축 경험은 JD 이상의 역량. 강력 추천.',
    },
    {
      candidateName: '최유진', matchRate: 68,
      met: ['React 경험', 'TypeScript'],
      partial: ['경력 2년 (3년 미만)', 'Next.js (학습 중)'],
      notMet: ['디자인 시스템 경험 없음'],
      recommendation: 'hold',
      aiSummary: 'React 기본기는 탄탄하나 Next.js와 디자인 시스템 경험이 부족. 성장 가능성은 높음.',
    },
  ],
  '3': [
    {
      candidateName: '한소희', matchRate: 91,
      met: ['PM 경력 6년', '데이터 분석 능력', '사용자 리서치', 'A/B 테스트'],
      partial: ['기술 이해 (SQL 수준)'],
      notMet: [],
      recommendation: 'interview',
      aiSummary: '데이터 기반 PM으로 최적. MAU 200% 성장 경험이 우리 제품 성장 단계와 부합.',
    },
  ],
}

// 이력서 → 공고 매칭 결과
const mockResumeToJob = [
  { jobTitle: '백엔드 개발자', department: '개발', matchRate: 87, topMatch: 'Java/Spring 완벽 일치' },
  { jobTitle: 'PM', department: '기획', matchRate: 32, topMatch: '직무 유형 불일치' },
  { jobTitle: '프론트엔드 개발자', department: '개발', matchRate: 28, topMatch: '기술 스택 불일치' },
]

const recConfig = {
  interview: { label: '면접 추천', bg: 'bg-success-light', text: 'text-success', icon: CheckCircle2 },
  hold: { label: '보류/검토', bg: 'bg-[#fff8e1]', text: 'text-[#f59e0b]', icon: MinusCircle },
  reject: { label: '부적합', bg: 'bg-danger-light', text: 'text-danger', icon: XCircle },
}

function MatchRateCircle({ rate }: { rate: number }) {
  const r = 30
  const circumference = 2 * Math.PI * r
  const offset = circumference - (rate / 100) * circumference
  const color = rate >= 80 ? '#00c471' : rate >= 60 ? '#f59e0b' : '#f04452'

  return (
    <div className="relative w-[76px] h-[76px] flex-shrink-0">
      <svg width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={r} fill="none" stroke="#f2f4f6" strokeWidth="6" />
        <circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 38 38)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[16px] font-bold" style={{ color }}>{rate}%</span>
      </div>
    </div>
  )
}

export default function MatchingPage() {
  const [mode, setMode] = useState<'job-to-candidate' | 'resume-to-job'>('job-to-candidate')
  const [selectedJob, setSelectedJob] = useState('1')
  const [showResumeResult, setShowResumeResult] = useState(false)

  const matchResults = mockJobToCandidate[selectedJob] || []

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00c471] to-[#06b6d4] flex items-center justify-center">
            <Target size={18} className="text-white" />
          </div>
          JD-이력서 매칭
        </h1>
        <p className="text-[14px] text-muted mt-1">공고와 후보자 간 적합도를 AI가 자동 분석합니다</p>
      </div>

      {/* 모드 선택 */}
      <div className="flex gap-1 mb-6 bg-card-hover rounded-xl p-1 max-w-lg">
        <button
          onClick={() => setMode('job-to-candidate')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            mode === 'job-to-candidate' ? 'bg-white text-foreground shadow-soft' : 'text-muted'
          }`}
        >
          <ArrowRight size={14} />
          공고 → 후보자 매칭
        </button>
        <button
          onClick={() => setMode('resume-to-job')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
            mode === 'resume-to-job' ? 'bg-white text-foreground shadow-soft' : 'text-muted'
          }`}
        >
          <ArrowLeftRight size={14} />
          이력서 → 공고 매칭
        </button>
      </div>

      {mode === 'job-to-candidate' ? (
        <>
          {/* 공고 선택 */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-soft mb-5">
            <p className="text-[12px] font-semibold text-muted mb-2">공고 선택</p>
            <div className="flex gap-2">
              {mockJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job.id)}
                  className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                    selectedJob === job.id
                      ? 'bg-gradient-to-r from-primary to-[#6366f1] text-white shadow-soft'
                      : 'bg-card-hover text-muted hover:text-foreground'
                  }`}
                >
                  {job.title}
                  <span className="ml-1.5 opacity-60">{job.department}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 매칭 결과 */}
          <div className="space-y-4">
            {matchResults.map((result, i) => {
              const rec = recConfig[result.recommendation]
              const RecIcon = rec.icon
              return (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-soft hover-lift">
                  <div className="flex items-start gap-5">
                    <MatchRateCircle rate={result.matchRate} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[16px] font-bold text-foreground">{result.candidateName}</h3>
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${rec.bg} ${rec.text}`}>
                            <RecIcon size={12} />
                            {rec.label}
                          </span>
                        </div>
                        <span className="text-[12px] font-semibold text-muted">#{i + 1}</span>
                      </div>

                      {/* 항목별 분석 */}
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div>
                          <p className="text-[10px] font-semibold text-success uppercase tracking-wider mb-1.5">충족</p>
                          {result.met.map((item, j) => (
                            <p key={j} className="text-[11px] text-muted flex items-start gap-1 mb-1">
                              <CheckCircle2 size={11} className="text-success mt-0.5 flex-shrink-0" />
                              {item}
                            </p>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-[#f59e0b] uppercase tracking-wider mb-1.5">부분 충족</p>
                          {result.partial.map((item, j) => (
                            <p key={j} className="text-[11px] text-muted flex items-start gap-1 mb-1">
                              <MinusCircle size={11} className="text-[#f59e0b] mt-0.5 flex-shrink-0" />
                              {item}
                            </p>
                          ))}
                          {result.partial.length === 0 && <p className="text-[11px] text-muted/40">없음</p>}
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-danger uppercase tracking-wider mb-1.5">미충족</p>
                          {result.notMet.map((item, j) => (
                            <p key={j} className="text-[11px] text-muted flex items-start gap-1 mb-1">
                              <XCircle size={11} className="text-danger mt-0.5 flex-shrink-0" />
                              {item}
                            </p>
                          ))}
                          {result.notMet.length === 0 && <p className="text-[11px] text-muted/40">없음</p>}
                        </div>
                      </div>

                      {/* AI 요약 */}
                      <div className="mt-3 pt-3 border-t border-border/60">
                        <p className="text-[12px] text-muted flex items-start gap-1.5">
                          <Sparkles size={12} className="text-primary mt-0.5 flex-shrink-0" />
                          {result.aiSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>
          {/* 이력서 업로드 → 공고 매칭 */}
          {!showResumeResult ? (
            <div
              onClick={() => setShowResumeResult(true)}
              className="bg-card rounded-2xl border-2 border-dashed border-border p-12 text-center shadow-soft cursor-pointer hover:border-primary/40 hover:bg-primary-light/30 transition-all"
            >
              <Upload size={32} className="text-primary mx-auto mb-4" />
              <p className="text-[15px] font-bold text-foreground mb-1">이력서를 업로드하면 등록된 공고와 매칭합니다</p>
              <p className="text-[12px] text-muted">클릭하여 샘플 결과 확인</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-primary" />
                  <div>
                    <p className="text-[14px] font-bold text-foreground">김현수_이력서.pdf</p>
                    <p className="text-[12px] text-muted">백엔드 개발자 · 3년차</p>
                  </div>
                </div>
                <button onClick={() => setShowResumeResult(false)} className="text-[12px] text-primary font-semibold hover:underline">
                  다시 업로드
                </button>
              </div>
              <div className="space-y-3">
                {mockResumeToJob.map((match, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-soft flex items-center gap-5">
                    <MatchRateCircle rate={match.matchRate} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-bold text-foreground">{match.jobTitle}</h3>
                        <span className="text-[11px] font-semibold text-muted bg-card-hover px-2 py-0.5 rounded-full">{match.department}</span>
                      </div>
                      <p className="text-[12px] text-muted mt-1">{match.topMatch}</p>
                    </div>
                    <span className={`text-[12px] font-bold ${
                      match.matchRate >= 80 ? 'text-success' : match.matchRate >= 50 ? 'text-[#f59e0b]' : 'text-danger'
                    }`}>
                      {match.matchRate >= 80 ? '적합' : match.matchRate >= 50 ? '검토' : '부적합'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
