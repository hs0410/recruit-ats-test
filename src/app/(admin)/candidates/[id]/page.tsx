'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft, Mail, Phone, Briefcase, Clock, FileText, MessageSquare,
  ChevronRight, ClipboardList, ThumbsUp, ThumbsDown, Minus,
  Brain, BarChart3, Users, Zap, TrendingUp, Shield, AlertTriangle,
  CheckCircle2, XCircle, Star, Target, Award, Eye
} from 'lucide-react'
import { type Stage, ALL_STAGES } from '@/lib/types'

// ─── Mock 후보자 데이터 ───
const mockCandidates: Record<string, {
  id: string; name: string; email: string; phone: string; job: string; stage: Stage;
  applied_at: string; memo: string; resume_url: string | null
}> = {
  '1': { id: '1', name: '김현수', email: 'kim@email.com', phone: '010-1234-5678', job: '백엔드 개발자', stage: '2차면접', applied_at: '2026-04-01', memo: '경력 3년, Java/Spring 주력', resume_url: null },
  '2': { id: '2', name: '이지은', email: 'lee@email.com', phone: '010-2345-6789', job: '백엔드 개발자', stage: '서류접수', applied_at: '2026-04-02', memo: '', resume_url: null },
  '3': { id: '3', name: '박서준', email: 'park@email.com', phone: '010-3456-7890', job: '프론트엔드 개발자', stage: '1차면접', applied_at: '2026-03-25', memo: 'React/Next.js 포트폴리오 우수', resume_url: null },
  '4': { id: '4', name: '최유진', email: 'choi@email.com', phone: '010-4567-8901', job: '프론트엔드 개발자', stage: '1차면접', applied_at: '2026-03-28', memo: '', resume_url: null },
  '5': { id: '5', name: '정민호', email: 'jung@email.com', phone: '010-5678-9012', job: '백엔드 개발자', stage: '2차면접', applied_at: '2026-03-20', memo: '기술면접 통과, CTO 면접 예정', resume_url: null },
  '6': { id: '6', name: '한소희', email: 'han@email.com', phone: '010-6789-0123', job: 'PM', stage: '처우협의', applied_at: '2026-03-15', memo: '희망연봉 5500만원', resume_url: null },
  '7': { id: '7', name: '윤서연', email: 'yoon@email.com', phone: '010-7890-1234', job: '백엔드 개발자', stage: '입사확정', applied_at: '2026-03-01', memo: '4월 14일 입사 예정', resume_url: null },
}

// ─── Mock AI 분석 결과 ───
const mockAiAnalysis: Record<string, {
  overallScore: number; grade: string; gradeColor: string; gradeBg: string;
  dimensions: { name: string; score: number; posAvg: number; basis: string }[]
  strengths: string[]; weaknesses: string[]; analyzedAt: string
}> = {
  '1': {
    overallScore: 72,
    grade: 'B',
    gradeColor: 'text-green-600',
    gradeBg: 'bg-green-50',
    dimensions: [
      { name: '기술력', score: 78, posAvg: 70, basis: 'Java/Spring 3년 경력, MSA 구축 경험' },
      { name: '경력 관련성', score: 75, posAvg: 65, basis: '직무와 80% 이상 일치하는 프로젝트 경험' },
      { name: '리더십', score: 55, posAvg: 50, basis: '팀 리딩 경험 부족, 주니어 멘토링만 수행' },
      { name: '커뮤니케이션', score: 60, posAvg: 55, basis: '기술 문서화 경험 있으나 발표 경험 제한적' },
      { name: '문화 적합도', score: 70, posAvg: 60, basis: '팀 협업 프로젝트 다수 참여' },
      { name: '성장 가능성', score: 80, posAvg: 65, basis: '최신 기술 학습 의지 높음, 개인 프로젝트 활발' },
    ],
    strengths: ['Java/Spring 생태계 깊은 이해', '성장 의지와 학습 속도 우수', '직무 관련성 높은 프로젝트 경험'],
    weaknesses: ['리더십/매니지먼트 경험 부족', '발표/프레젠테이션 경험 제한적'],
    analyzedAt: '2026-04-01 14:30'
  },
  '3': {
    overallScore: 81,
    grade: 'A',
    gradeColor: 'text-blue-600',
    gradeBg: 'bg-blue-50',
    dimensions: [
      { name: '기술력', score: 85, posAvg: 72, basis: 'React/Next.js 능숙, TypeScript 완벽 활용' },
      { name: '경력 관련성', score: 82, posAvg: 68, basis: '프론트엔드 전문 경력 4년, 동일 직무' },
      { name: '리더십', score: 70, posAvg: 55, basis: '소규모 팀 리딩 1년 경험' },
      { name: '커뮤니케이션', score: 78, posAvg: 60, basis: '기술 블로그 운영, 컨퍼런스 발표 경험' },
      { name: '문화 적합도', score: 85, posAvg: 65, basis: '오픈소스 기여, 코드리뷰 문화 익숙' },
      { name: '성장 가능성', score: 88, posAvg: 70, basis: '지속적 학습, 사이드 프로젝트 다수' },
    ],
    strengths: ['프론트엔드 기술 스택 깊은 전문성', '커뮤니케이션 역량 우수', '오픈소스 문화 경험'],
    weaknesses: ['백엔드 이해도 보완 필요'],
    analyzedAt: '2026-03-26 10:15'
  }
}

// ─── Mock 면접 피드백 ───
interface FeedbackItem {
  id: string; stage: string; interviewer: string; date: string;
  scores: { category: string; score: number }[];
  strengths: string; concerns: string; recommendation: '강력추천' | '추천' | '보류' | '비추천'
}
const mockFeedbacks: Record<string, FeedbackItem[]> = {
  '1': [
    {
      id: 'f1', stage: '1차면접', interviewer: '이기술 (Tech Lead)', date: '2026-04-03',
      scores: [{ category: '기술역량', score: 4 }, { category: '문제해결', score: 3 }, { category: '커뮤니케이션', score: 3 }, { category: '팀워크', score: 4 }],
      strengths: 'Spring Boot 아키텍처 이해도 높음. 트러블슈팅 경험 풍부.',
      concerns: '시스템 설계에서 큰 그림 제시 능력이 다소 부족.',
      recommendation: '추천'
    },
    {
      id: 'f2', stage: '2차면접', interviewer: '박팀장 (Engineering Manager)', date: '2026-04-06',
      scores: [{ category: '리더십 잠재력', score: 3 }, { category: '비전 얼라인먼트', score: 4 }, { category: '성장 가능성', score: 4 }, { category: '조직적합성', score: 3 }],
      strengths: '회사의 기술 방향에 대한 이해도 높고 동기부여 뚜렷.',
      concerns: '팀 갈등 상황에서의 대응 경험이 부족해 보임.',
      recommendation: '추천'
    },
  ],
  '3': [
    {
      id: 'f3', stage: '1차면접', interviewer: '김프론트 (Senior FE)', date: '2026-03-27',
      scores: [{ category: '기술역량', score: 5 }, { category: '문제해결', score: 4 }, { category: '커뮤니케이션', score: 4 }, { category: '팀워크', score: 5 }],
      strengths: 'React 생태계 최상위 수준. 코드 품질에 대한 높은 기준 보유.',
      concerns: '특이사항 없음.',
      recommendation: '강력추천'
    },
  ]
}

// ─── Mock 5·3·1 평가 결과 ───
interface EvalResult {
  dimension: string; weight: number;
  scores: { criterion: string; score: 5 | 3 | 1; label: string }[]
  avg: number
}
const mockEvalResults: Record<string, { evaluator: string; date: string; dimensions: EvalResult[]; totalAvg: number; verdict: string; verdictEmoji: string; verdictColor: string; verdictBg: string }> = {
  '1': {
    evaluator: '채용담당 박지영', date: '2026-04-06',
    dimensions: [
      {
        dimension: '직무전문기술', weight: 0.6,
        scores: [
          { criterion: 'Java/Spring 숙련도', score: 5, label: '우수' },
          { criterion: '시스템 설계', score: 3, label: '보통' },
          { criterion: 'DB 설계/최적화', score: 3, label: '보통' },
          { criterion: '코드 품질', score: 5, label: '우수' },
          { criterion: 'DevOps 이해도', score: 3, label: '보통' },
        ],
        avg: 3.8
      },
      {
        dimension: '멀티역량', weight: 0.4,
        scores: [
          { criterion: '커뮤니케이션', score: 3, label: '보통' },
          { criterion: '문제해결력', score: 3, label: '보통' },
          { criterion: '팀워크', score: 5, label: '우수' },
          { criterion: '자기주도성', score: 5, label: '우수' },
        ],
        avg: 4.0
      }
    ],
    totalAvg: 3.88,
    verdict: '추천', verdictEmoji: '👍', verdictColor: 'text-blue-600', verdictBg: 'bg-blue-50'
  }
}

// ─── 전형 결과 타입 ───
type DecisionResult = '합격' | '보류' | '불합격'
type DecisionStage = '서류전형' | '1차면접' | '2차면접' | '처우협의'

interface DecisionRecord {
  id: string; date: string; stage: DecisionStage;
  result: DecisionResult; reason: string; recorder: string
}

const resultBadgeStyle: Record<DecisionResult, { bg: string; text: string; icon: typeof ThumbsUp }> = {
  '합격': { bg: 'bg-[#e8f5e9]', text: 'text-[#2e7d32]', icon: ThumbsUp },
  '보류': { bg: 'bg-[#fff8e1]', text: 'text-[#f59e0b]', icon: Minus },
  '불합격': { bg: 'bg-[#fce4ec]', text: 'text-[#c62828]', icon: ThumbsDown },
}

const recBadgeStyle: Record<string, { bg: string; text: string }> = {
  '강력추천': { bg: 'bg-purple-50', text: 'text-purple-600' },
  '추천': { bg: 'bg-blue-50', text: 'text-blue-600' },
  '보류': { bg: 'bg-amber-50', text: 'text-amber-600' },
  '비추천': { bg: 'bg-red-50', text: 'text-red-600' },
}

const mockDecisions: Record<string, DecisionRecord[]> = {
  '1': [
    { id: 'd1', date: '2026-04-02', stage: '서류전형', result: '합격', reason: '직무 관련 경력 3년 이상, Java/Spring 기반 프로젝트 다수 수행. 포트폴리오 내 코드 품질 양호.', recorder: '채용담당 박지영' },
    { id: 'd2', date: '2026-04-05', stage: '1차면접', result: '합격', reason: '기술 역량 양호. Spring Boot 아키텍처 이해도 높음. 2차 면접 진행.', recorder: '채용담당 박지영' },
  ],
  '3': [
    { id: 'd3', date: '2026-03-26', stage: '서류전형', result: '합격', reason: '프론트엔드 전문 경력 4년, React/Next.js 포트폴리오 우수. 즉시 면접 진행.', recorder: '채용담당 박지영' },
  ],
}

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

// ─── 미니 레이더 차트 (SVG) ───
function MiniRadarChart({ dimensions }: { dimensions: { name: string; score: number; posAvg: number }[] }) {
  const size = 200
  const cx = size / 2, cy = size / 2
  const maxR = 75
  const n = dimensions.length
  const angleStep = (2 * Math.PI) / n

  const getPoint = (i: number, val: number) => {
    const angle = angleStep * i - Math.PI / 2
    const r = (val / 100) * maxR
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const scorePath = dimensions.map((d, i) => getPoint(i, d.score)).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'
  const avgPath = dimensions.map((d, i) => getPoint(i, d.posAvg)).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[200px] mx-auto">
      {/* 배경 그리드 */}
      {[20, 40, 60, 80, 100].map(v => {
        const points = Array.from({ length: n }, (_, i) => getPoint(i, v))
        return <polygon key={v} points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
      })}
      {/* 축 */}
      {dimensions.map((_, i) => {
        const p = getPoint(i, 100)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth="0.5" />
      })}
      {/* 포지션 평균 */}
      <path d={avgPath} fill="rgba(156,163,175,0.15)" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" />
      {/* 지원자 점수 */}
      <path d={scorePath} fill="rgba(49,130,246,0.15)" stroke="#3182f6" strokeWidth="1.5" />
      {/* 라벨 */}
      {dimensions.map((d, i) => {
        const p = getPoint(i, 115)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-[#6b7280]">
            {d.name}
          </text>
        )
      })}
    </svg>
  )
}

// ─── 점수 바 컴포넌트 ───
function ScoreBar({ score, posAvg, label }: { score: number; posAvg: number; label: string }) {
  const color = score >= 80 ? '#3182f6' : score >= 60 ? '#f59e0b' : '#ef4444'
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-muted">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{score}점</span>
      </div>
      <div className="relative h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
        <div className="absolute h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
        <div className="absolute h-full w-0.5 bg-gray-400" style={{ left: `${posAvg}%` }} title={`포지션 평균: ${posAvg}`} />
      </div>
    </div>
  )
}

type TabType = 'overview' | 'ai-analysis' | 'feedback' | 'eval531' | 'decisions' | 'memo'

export default function CandidateDetailPage() {
  const params = useParams()
  const id = params.id as string
  const candidate = mockCandidates[id]
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [stage, setStage] = useState<Stage>(candidate?.stage ?? '서류접수')
  const [memo, setMemo] = useState(candidate?.memo ?? '')

  // 전형 결과 기록 폼
  const [decisionStage, setDecisionStage] = useState<DecisionStage>('서류전형')
  const [decisionResult, setDecisionResult] = useState<DecisionResult>('합격')
  const [decisionReason, setDecisionReason] = useState('')
  const [decisions, setDecisions] = useState<DecisionRecord[]>(mockDecisions[id] || [])

  const aiAnalysis = mockAiAnalysis[id]
  const feedbacks = mockFeedbacks[id] || []
  const evalResult = mockEvalResults[id]

  if (!candidate) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-[14px]">후보자를 찾을 수 없습니다.</p>
        <Link href="/candidates" className="text-primary text-[13px] mt-2 inline-block hover:underline">목록으로 돌아가기</Link>
      </div>
    )
  }

  const badge = stageBadge[stage]

  const handleStageChange = (newStage: Stage) => setStage(newStage)

  const handleRecordDecision = () => {
    if (!decisionReason.trim()) return
    const newDecision: DecisionRecord = {
      id: `d${Date.now()}`, date: new Date().toISOString().split('T')[0],
      stage: decisionStage, result: decisionResult,
      reason: decisionReason.trim(), recorder: '채용담당 박지영',
    }
    setDecisions([newDecision, ...decisions])
    setDecisionReason('')
  }

  // AI vs 면접관 vs 5·3·1 종합 비교 데이터
  const comparisonData = (() => {
    const aiScore = aiAnalysis?.overallScore ?? null
    const feedbackAvg = feedbacks.length > 0
      ? Math.round(feedbacks.flatMap(f => f.scores.map(s => s.score)).reduce((a, b) => a + b, 0) / feedbacks.flatMap(f => f.scores).length * 20)
      : null
    const evalScore = evalResult ? Math.round(evalResult.totalAvg * 20) : null
    return { aiScore, feedbackAvg, evalScore }
  })()

  const tabs: { key: TabType; label: string; icon: typeof Brain; count?: number }[] = [
    { key: 'overview', label: '종합 대시보드', icon: BarChart3 },
    { key: 'ai-analysis', label: 'AI 분석', icon: Brain, count: aiAnalysis ? 1 : 0 },
    { key: 'feedback', label: '면접 피드백', icon: Users, count: feedbacks.length },
    { key: 'eval531', label: '5·3·1 평가', icon: Target, count: evalResult ? 1 : 0 },
    { key: 'decisions', label: '전형 기록', icon: ClipboardList, count: decisions.length },
    { key: 'memo', label: '메모', icon: MessageSquare },
  ]

  const decisionStages: DecisionStage[] = ['서류전형', '1차면접', '2차면접', '처우협의']
  const decisionResults: DecisionResult[] = ['합격', '보류', '불합격']

  return (
    <div>
      <Link href="/candidates" className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> 후보자 목록
      </Link>

      {/* ── 프로필 헤더 ── */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-[20px] font-bold" style={{ backgroundColor: getInitialColor(candidate.name) }}>
              {candidate.name[0]}
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-foreground">{candidate.name}</h1>
              <p className="text-[14px] text-muted mt-0.5">{candidate.job}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* AI 분석 배지 */}
            {aiAnalysis && (
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${aiAnalysis.gradeBg} ${aiAnalysis.gradeColor}`}>
                AI {aiAnalysis.grade}등급
              </span>
            )}
            <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${badge.bg} ${badge.text}`}>
              {stage}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 pt-5 border-t border-border/60">
          <div className="flex items-center gap-2 text-[13px] text-muted"><Mail size={14} />{candidate.email}</div>
          <div className="flex items-center gap-2 text-[13px] text-muted"><Phone size={14} />{candidate.phone}</div>
          <div className="flex items-center gap-2 text-[13px] text-muted"><Briefcase size={14} />{candidate.job}</div>
          <div className="flex items-center gap-2 text-[13px] text-muted"><Clock size={14} />지원일 {candidate.applied_at}</div>
        </div>

        {/* 요약 지표 카드 */}
        <div className="grid grid-cols-4 gap-3 mt-5">
          <div className="bg-card-hover rounded-xl p-3 text-center">
            <Brain size={16} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] text-muted">AI 점수</p>
            <p className="text-[18px] font-bold text-foreground">{aiAnalysis ? aiAnalysis.overallScore : '—'}</p>
          </div>
          <div className="bg-card-hover rounded-xl p-3 text-center">
            <Users size={16} className="text-[#6366f1] mx-auto mb-1" />
            <p className="text-[10px] text-muted">면접 피드백</p>
            <p className="text-[18px] font-bold text-foreground">{feedbacks.length}건</p>
          </div>
          <div className="bg-card-hover rounded-xl p-3 text-center">
            <Target size={16} className="text-[#8b5cf6] mx-auto mb-1" />
            <p className="text-[10px] text-muted">5·3·1 평가</p>
            <p className="text-[18px] font-bold text-foreground">{evalResult ? evalResult.totalAvg.toFixed(1) : '—'}</p>
          </div>
          <div className="bg-card-hover rounded-xl p-3 text-center">
            <ClipboardList size={16} className="text-[#00c471] mx-auto mb-1" />
            <p className="text-[10px] text-muted">전형 기록</p>
            <p className="text-[18px] font-bold text-foreground">{decisions.length}건</p>
          </div>
        </div>
      </div>

      {/* ── 탭 네비게이션 ── */}
      <div className="flex gap-1 mb-5 bg-card-hover rounded-xl p-1 overflow-x-auto">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap px-3 ${
                activeTab === t.key ? 'bg-white text-foreground shadow-soft' : 'text-muted hover:text-foreground'
              }`}
            >
              <Icon size={14} />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="text-[10px] bg-primary-light text-primary px-1.5 py-0.5 rounded-full ml-1">{t.count}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* ── 메인 콘텐츠 (2/3) ── */}
        <div className="col-span-2">

          {/* === 종합 대시보드 탭 === */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* AI vs 면접관 vs 5·3·1 비교 */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={16} className="text-primary" />
                  <h3 className="text-[14px] font-bold text-foreground">AI vs 면접관 vs 구조화 평가 비교</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { label: 'AI 이력서 분석', score: comparisonData.aiScore, icon: Brain, color: '#3182f6' },
                    { label: '면접관 평균', score: comparisonData.feedbackAvg, icon: Users, color: '#6366f1' },
                    { label: '5·3·1 평가', score: comparisonData.evalScore, icon: Target, color: '#8b5cf6' },
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-2">
                          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                            <circle cx="40" cy="40" r="34" fill="none" stroke="#f2f4f6" strokeWidth="6" />
                            {item.score !== null && (
                              <circle cx="40" cy="40" r="34" fill="none" stroke={item.color} strokeWidth="6"
                                strokeDasharray={`${(item.score / 100) * 213.6} 213.6`} strokeLinecap="round" />
                            )}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[16px] font-bold text-foreground">
                              {item.score !== null ? item.score : '—'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 justify-center">
                          <Icon size={12} style={{ color: item.color }} />
                          <span className="text-[11px] text-muted">{item.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 일치도 분석 */}
                {comparisonData.aiScore && comparisonData.feedbackAvg && (
                  <div className="bg-card-hover rounded-xl p-4 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      {Math.abs(comparisonData.aiScore - comparisonData.feedbackAvg) <= 15
                        ? <><CheckCircle2 size={14} className="text-[#00c471]" /><span className="text-[12px] font-semibold text-[#00c471]">AI-면접관 판단 일치</span></>
                        : <><AlertTriangle size={14} className="text-amber-500" /><span className="text-[12px] font-semibold text-amber-600">AI-면접관 판단 차이 발생</span></>
                      }
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      AI 분석 ({comparisonData.aiScore}점)과 면접관 평가 ({comparisonData.feedbackAvg}점)의 차이: {Math.abs(comparisonData.aiScore - comparisonData.feedbackAvg)}점
                      {Math.abs(comparisonData.aiScore - comparisonData.feedbackAvg) > 15
                        ? '. 큰 차이가 있으므로 추가 검증을 권장합니다.'
                        : '. 유사한 평가 결과로, 신뢰도가 높습니다.'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* 평가 타임라인 */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-primary" />
                  <h3 className="text-[14px] font-bold text-foreground">평가 타임라인</h3>
                </div>
                <div className="space-y-0">
                  {[
                    ...(aiAnalysis ? [{ date: aiAnalysis.analyzedAt.split(' ')[0], type: 'ai' as const, title: 'AI 이력서 분석', detail: `종합 ${aiAnalysis.overallScore}점 (${aiAnalysis.grade}등급)`, color: '#3182f6' }] : []),
                    ...feedbacks.map(f => ({ date: f.date, type: 'feedback' as const, title: `${f.stage} — ${f.interviewer}`, detail: `추천: ${f.recommendation}`, color: '#6366f1' })),
                    ...(evalResult ? [{ date: evalResult.date, type: 'eval' as const, title: '5·3·1 구조화 평가', detail: `종합 ${evalResult.totalAvg.toFixed(1)}점 — ${evalResult.verdict}`, color: '#8b5cf6' }] : []),
                    ...decisions.map(d => ({ date: d.date, type: 'decision' as const, title: `${d.stage} ${d.result}`, detail: d.reason.slice(0, 60) + '...', color: d.result === '합격' ? '#00c471' : d.result === '불합격' ? '#ef4444' : '#f59e0b' }))
                  ]
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((item, i, arr) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: item.color }} />
                          {i < arr.length - 1 && <div className="w-0.5 h-full bg-border min-h-[40px]" />}
                        </div>
                        <div className="pb-5">
                          <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
                          <p className="text-[11px] text-muted mt-0.5">{item.detail}</p>
                          <p className="text-[10px] text-muted/60 mt-1">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  {!aiAnalysis && feedbacks.length === 0 && !evalResult && decisions.length === 0 && (
                    <p className="text-[13px] text-muted text-center py-6">아직 평가 데이터가 없습니다.</p>
                  )}
                </div>
              </div>

              {/* 강점/약점 종합 */}
              {aiAnalysis && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 size={14} className="text-[#00c471]" />
                      <h4 className="text-[13px] font-bold text-foreground">강점</h4>
                    </div>
                    <ul className="space-y-2">
                      {aiAnalysis.strengths.map((s, i) => (
                        <li key={i} className="text-[12px] text-foreground flex items-start gap-2">
                          <Star size={10} className="text-amber-400 mt-0.5 flex-shrink-0" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={14} className="text-amber-500" />
                      <h4 className="text-[13px] font-bold text-foreground">보완 필요</h4>
                    </div>
                    <ul className="space-y-2">
                      {aiAnalysis.weaknesses.map((w, i) => (
                        <li key={i} className="text-[12px] text-foreground flex items-start gap-2">
                          <XCircle size={10} className="text-red-400 mt-0.5 flex-shrink-0" />{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === AI 분석 탭 === */}
          {activeTab === 'ai-analysis' && (
            <div className="space-y-5">
              {aiAnalysis ? (
                <>
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Brain size={16} className="text-primary" />
                        <h3 className="text-[14px] font-bold text-foreground">AI 이력서 분석 결과</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[12px] font-bold px-3 py-1 rounded-lg ${aiAnalysis.gradeBg} ${aiAnalysis.gradeColor}`}>
                          {aiAnalysis.grade}등급
                        </span>
                        <span className="text-[20px] font-bold text-foreground">{aiAnalysis.overallScore}점</span>
                      </div>
                    </div>

                    {/* 레이더 차트 */}
                    <MiniRadarChart dimensions={aiAnalysis.dimensions} />

                    {/* 점수 상세 */}
                    <div className="space-y-3 mt-5">
                      {aiAnalysis.dimensions.map(d => (
                        <div key={d.name}>
                          <ScoreBar score={d.score} posAvg={d.posAvg} label={d.name} />
                          <p className="text-[10px] text-muted mt-0.5 pl-1">{d.basis}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card-hover rounded-xl p-4">
                    <p className="text-[11px] text-muted">
                      <Shield size={12} className="inline mr-1" />
                      분석 시점: {aiAnalysis.analyzedAt} | Gemini 2.5 Flash 기반 | 참고용 보조 지표
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-12 shadow-soft text-center">
                  <Brain size={32} className="text-muted mx-auto mb-3" />
                  <p className="text-[14px] font-semibold text-foreground mb-1">AI 분석 결과 없음</p>
                  <p className="text-[12px] text-muted">이력서 분석 페이지에서 AI 분석을 먼저 실행해주세요.</p>
                  <Link href="/resume" className="inline-block mt-4 px-4 py-2 rounded-xl text-[12px] font-semibold bg-primary text-white hover:opacity-90">
                    AI 분석 하러가기
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* === 면접 피드백 탭 === */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              {feedbacks.length > 0 ? feedbacks.map(f => (
                <div key={f.id} className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-[14px] font-bold text-foreground">{f.stage}</h4>
                      <p className="text-[12px] text-muted mt-0.5">{f.interviewer} · {f.date}</p>
                    </div>
                    <span className={`text-[12px] font-bold px-3 py-1 rounded-lg ${recBadgeStyle[f.recommendation]?.bg || 'bg-gray-50'} ${recBadgeStyle[f.recommendation]?.text || 'text-gray-600'}`}>
                      {f.recommendation}
                    </span>
                  </div>

                  {/* 점수 그리드 */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {f.scores.map(s => (
                      <div key={s.category} className="bg-card-hover rounded-lg p-2 text-center">
                        <p className="text-[10px] text-muted">{s.category}</p>
                        <p className="text-[16px] font-bold text-foreground">{s.score}<span className="text-[10px] text-muted">/5</span></p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-[11px] font-semibold text-green-700 mb-1">💪 강점</p>
                      <p className="text-[12px] text-green-800">{f.strengths}</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-[11px] font-semibold text-amber-700 mb-1">⚠️ 우려사항</p>
                      <p className="text-[12px] text-amber-800">{f.concerns}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="bg-card rounded-2xl border border-border p-12 shadow-soft text-center">
                  <Users size={32} className="text-muted mx-auto mb-3" />
                  <p className="text-[14px] font-semibold text-foreground mb-1">면접 피드백 없음</p>
                  <p className="text-[12px] text-muted">면접 후 피드백이 수합되면 여기에 표시됩니다.</p>
                </div>
              )}
            </div>
          )}

          {/* === 5·3·1 평가 탭 === */}
          {activeTab === 'eval531' && (
            <div className="space-y-5">
              {evalResult ? (
                <>
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-[#8b5cf6]" />
                        <h3 className="text-[14px] font-bold text-foreground">5·3·1 구조화 평가</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[20px] font-bold text-foreground">{evalResult.totalAvg.toFixed(1)}</span>
                        <span className={`text-[12px] font-bold px-3 py-1 rounded-lg ${evalResult.verdictBg} ${evalResult.verdictColor}`}>
                          {evalResult.verdictEmoji} {evalResult.verdict}
                        </span>
                      </div>
                    </div>

                    {evalResult.dimensions.map(dim => (
                      <div key={dim.dimension} className="mb-5 last:mb-0">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-[13px] font-bold text-foreground">{dim.dimension}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-muted">가중치 {Math.round(dim.weight * 100)}%</span>
                            <span className="text-[13px] font-bold text-foreground">{dim.avg.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {dim.scores.map(s => {
                            const scoreColor = s.score === 5 ? 'text-primary bg-primary-light' : s.score === 3 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'
                            return (
                              <div key={s.criterion} className="flex items-center justify-between bg-card-hover rounded-lg px-4 py-2.5">
                                <span className="text-[12px] text-foreground">{s.criterion}</span>
                                <span className={`text-[12px] font-bold px-2.5 py-0.5 rounded-lg ${scoreColor}`}>
                                  {s.score}점 · {s.label}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-card-hover rounded-xl p-4">
                    <p className="text-[11px] text-muted">
                      평가자: {evalResult.evaluator} | 평가일: {evalResult.date} | 직무전문기술 60% + 멀티역량 40%
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-12 shadow-soft text-center">
                  <Target size={32} className="text-muted mx-auto mb-3" />
                  <p className="text-[14px] font-semibold text-foreground mb-1">5·3·1 평가 미완료</p>
                  <p className="text-[12px] text-muted">평가 기준표에서 해당 후보자의 평가를 진행해주세요.</p>
                  <Link href="/evaluation" className="inline-block mt-4 px-4 py-2 rounded-xl text-[12px] font-semibold bg-[#8b5cf6] text-white hover:opacity-90">
                    평가하러 가기
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* === 전형 기록 탭 === */}
          {activeTab === 'decisions' && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-5">
                <ClipboardList size={16} className="text-primary" />
                <h2 className="text-[15px] font-bold text-foreground">전형 결과 기록</h2>
              </div>

              {/* 기록 폼 */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[12px] font-semibold text-muted mb-1.5">전형 단계</label>
                  <select value={decisionStage} onChange={(e) => setDecisionStage(e.target.value as DecisionStage)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer">
                    {decisionStages.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-muted mb-2">결과</label>
                  <div className="flex gap-2">
                    {decisionResults.map(r => {
                      const style = resultBadgeStyle[r]
                      const Icon = style.icon
                      return (
                        <button key={r} type="button" onClick={() => setDecisionResult(r)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all border ${
                            decisionResult === r ? `${style.bg} ${style.text} border-current/20 ring-2 ring-current/10` : 'bg-card-hover text-muted border-border hover:text-foreground'
                          }`}>
                          <Icon size={14} />{r}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-muted mb-1.5">판단 사유</label>
                  <textarea value={decisionReason} onChange={(e) => setDecisionReason(e.target.value)} rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    placeholder="판단 근거를 기록해주세요. 추후 감사 대응 시 활용됩니다." />
                </div>

                <button onClick={handleRecordDecision} disabled={!decisionReason.trim()}
                  className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft disabled:opacity-40 disabled:cursor-not-allowed">
                  기록 저장
                </button>
              </div>

              {/* 기록 이력 */}
              {decisions.length > 0 && (
                <div className="pt-5 border-t border-border/60">
                  <h3 className="text-[13px] font-bold text-foreground mb-4">기록 이력</h3>
                  <div className="space-y-3">
                    {decisions.map(d => {
                      const style = resultBadgeStyle[d.result]
                      const Icon = style.icon
                      return (
                        <div key={d.id} className="bg-card-hover rounded-xl p-4 border border-border/40">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-muted bg-[#f2f4f6] px-2.5 py-0.5 rounded-lg">{d.stage}</span>
                              <span className={`flex items-center gap-1 text-[12px] font-semibold px-2.5 py-0.5 rounded-lg ${style.bg} ${style.text}`}>
                                <Icon size={12} />{d.result}
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
          )}

          {/* === 메모 탭 === */}
          {activeTab === 'memo' && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h2 className="text-[15px] font-bold text-foreground mb-4">메모</h2>
              <textarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={8}
                className="w-full px-4 py-3 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                placeholder="후보자에 대한 메모를 남겨보세요..." />
              <button className="mt-3 bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft">
                저장
              </button>
            </div>
          )}
        </div>

        {/* ── 오른쪽 사이드바 (1/3) ── */}
        <div className="space-y-5">
          {/* 채용 단계 */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h2 className="text-[15px] font-bold text-foreground mb-4">채용 단계</h2>
            <div className="space-y-2">
              {ALL_STAGES.map(s => {
                const sBadge = stageBadge[s]
                const isActive = s === stage
                return (
                  <button key={s} onClick={() => handleStageChange(s)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${
                      isActive ? `${sBadge.bg} ${sBadge.text} ring-2 ring-current/20` : 'bg-card-hover text-muted hover:text-foreground'
                    }`}>
                    {s}
                    {isActive && <ChevronRight size={14} />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 빠른 이동 */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
            <h3 className="text-[13px] font-bold text-foreground mb-3">빠른 이동</h3>
            <div className="space-y-2">
              <Link href="/resume" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Brain size={14} className="text-primary" /> AI 이력서 분석
              </Link>
              <Link href="/feedback" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Users size={14} className="text-[#6366f1]" /> 면접 피드백 수합
              </Link>
              <Link href="/evaluation" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Target size={14} className="text-[#8b5cf6]" /> 5·3·1 평가 기준표
              </Link>
              <Link href="/emails" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-all">
                <Mail size={14} className="text-[#00c471]" /> 이메일 발송
              </Link>
            </div>
          </div>

          {/* AI 레이더 미니 (overview가 아닐 때 사이드에 표시) */}
          {activeTab !== 'overview' && activeTab !== 'ai-analysis' && aiAnalysis && (
            <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
              <h3 className="text-[13px] font-bold text-foreground mb-3">AI 분석 요약</h3>
              <MiniRadarChart dimensions={aiAnalysis.dimensions} />
              <div className="text-center mt-2">
                <span className={`text-[12px] font-bold px-2.5 py-0.5 rounded-lg ${aiAnalysis.gradeBg} ${aiAnalysis.gradeColor}`}>
                  {aiAnalysis.grade}등급 · {aiAnalysis.overallScore}점
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
