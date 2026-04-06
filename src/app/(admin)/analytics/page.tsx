'use client'

import { useState } from 'react'
import { BarChart3, TrendingDown, TrendingUp, Clock, Users, Target, AlertTriangle, ArrowRight, Filter } from 'lucide-react'

// ─── Mock Data ─────────────────────────────────────────────
const funnelData = [
  { stage: '지원', count: 120, color: '#d0e3ff' },
  { stage: '서류통과', count: 45, color: '#a8ccff' },
  { stage: '1차면접', count: 20, color: '#79b0ff' },
  { stage: '2차면접', count: 10, color: '#4d94ff' },
  { stage: '처우협의', count: 5, color: '#3182f6' },
  { stage: '입사확정', count: 3, color: '#1b64da' },
]

const stageDays = [
  { stage: '서류검토', days: 5, isBottleneck: false },
  { stage: '1차면접', days: 8, isBottleneck: false },
  { stage: '2차면접', days: 7, isBottleneck: false },
  { stage: '처우협의', days: 8, isBottleneck: true },
]

const monthlyData = [
  { month: '1월', applications: 18, hires: 2, avgDays: 32 },
  { month: '2월', applications: 22, hires: 3, avgDays: 30 },
  { month: '3월', applications: 25, hires: 2, avgDays: 29 },
  { month: '4월', applications: 30, hires: 4, avgDays: 27 },
  { month: '5월', applications: 28, hires: 3, avgDays: 28 },
  { month: '6월', applications: 35, hires: 4, avgDays: 26 },
]

const positions = [
  { name: '프론트엔드 개발자', applicants: 35, stages: { '서류': 10, '1차': 5, '2차': 3, '처우': 1, '확정': 0 }, days: 22, status: '진행중' },
  { name: '백엔드 개발자', applicants: 28, stages: { '서류': 8, '1차': 4, '2차': 2, '처우': 1, '확정': 1 }, days: 30, status: '진행중' },
  { name: '프로덕트 디자이너', applicants: 22, stages: { '서류': 6, '1차': 3, '2차': 1, '처우': 0, '확정': 0 }, days: 18, status: '진행중' },
  { name: '데이터 분석가', applicants: 20, stages: { '서류': 5, '1차': 2, '2차': 0, '처우': 0, '확정': 0 }, days: 14, status: '진행중' },
  { name: '인사담당자', applicants: 15, stages: { '서류': 0, '1차': 0, '2차': 0, '처우': 0, '확정': 2 }, days: 35, status: '마감' },
]

// ─── 탭 정의 ─────────────────────────────────────────────
const tabs = [
  { key: 'overview', label: '전체 현황' },
  { key: 'funnel', label: '채용 퍼널' },
  { key: 'trend', label: '월별 추이' },
  { key: 'positions', label: '포지션별' },
] as const

type TabKey = (typeof tabs)[number]['key']

// ─── 컴포넌트 ──────────────────────────────────────────────
export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-foreground">채용 분석</h1>
            <p className="text-[14px] text-muted mt-1">데이터 기반으로 채용 프로세스를 개선하세요</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-[13px] text-muted hover:bg-muted/10 transition-colors">
            <Filter size={14} />
            기간 필터
          </button>
        </div>
      </div>

      {/* 요약 통계 카드 (상단 4개) */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {/* 평균 채용 소요일 */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-gradient-to-br from-[#3182f6] to-[#6366f1] p-2.5 rounded-xl">
              <Clock size={18} className="text-white" />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-[#00c471]">
              <TrendingDown size={12} />
              -3일
            </span>
          </div>
          <p className="text-[13px] text-muted mb-1">평균 채용 소요일</p>
          <p className="text-[28px] font-bold text-foreground">28<span className="text-[14px] font-normal text-muted ml-0.5">일</span></p>
          <p className="text-[11px] text-muted mt-1">vs 전월</p>
        </div>

        {/* 전형별 평균 소요일 */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] p-2.5 rounded-xl">
              <BarChart3 size={18} className="text-white" />
            </div>
          </div>
          <p className="text-[13px] text-muted mb-2">전형별 평균 소요일</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[{ label: '서류', days: 5 }, { label: '1차', days: 8 }, { label: '2차', days: 7 }, { label: '처우', days: 8 }].map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1 px-2 py-1 bg-[#f2f4f6] rounded-lg text-[11px] text-foreground">
                {s.label} <strong className="text-[#3182f6]">{s.days}일</strong>
              </span>
            ))}
          </div>
        </div>

        {/* 전체 합격률 */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-gradient-to-br from-[#00c471] to-[#06b6d4] p-2.5 rounded-xl">
              <Target size={18} className="text-white" />
            </div>
            <span className="flex items-center gap-1 text-[12px] font-medium text-[#00c471]">
              <TrendingUp size={12} />
              +2.1%
            </span>
          </div>
          <p className="text-[13px] text-muted mb-1">전체 합격률</p>
          <p className="text-[28px] font-bold text-foreground">12.5<span className="text-[14px] font-normal text-muted ml-0.5">%</span></p>
          <p className="text-[11px] text-muted mt-1">지원 대비 입사확정</p>
        </div>

        {/* 활성 포지션 */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-gradient-to-br from-[#f59e0b] to-[#ef4444] p-2.5 rounded-xl">
              <Users size={18} className="text-white" />
            </div>
          </div>
          <p className="text-[13px] text-muted mb-1">활성 포지션</p>
          <p className="text-[28px] font-bold text-foreground">6<span className="text-[14px] font-normal text-muted ml-0.5">건</span></p>
          <p className="text-[11px] text-muted mt-1">현재 채용 진행 중</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex items-center gap-1 p-1 bg-[#f2f4f6] rounded-xl mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'funnel' && <FunnelTab />}
      {activeTab === 'trend' && <TrendTab />}
      {activeTab === 'positions' && <PositionsTab />}
    </div>
  )
}

// ─── 전체 현황 탭 ──────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 채용 퍼널 미니 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-foreground mb-5">채용 퍼널</h3>
        <FunnelChart />
      </div>

      {/* 병목 구간 분석 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-foreground mb-5">전형별 소요일 & 병목 분석</h3>
        <BottleneckChart />
      </div>

      {/* 월별 추이 미니 */}
      <div className="col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-foreground mb-5">월별 채용 추이 (2026)</h3>
        <MonthlyChart />
      </div>
    </div>
  )
}

// ─── 채용 퍼널 탭 ──────────────────────────────────────────
function FunnelTab() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <h3 className="text-[15px] font-semibold text-foreground mb-2">채용 퍼널 분석</h3>
      <p className="text-[13px] text-muted mb-6">각 전형 단계별 전환율을 확인하세요</p>
      <FunnelChart large />
      {/* 전환율 요약 */}
      <div className="mt-8 grid grid-cols-5 gap-3">
        {funnelData.slice(0, -1).map((item, i) => {
          const next = funnelData[i + 1]
          const rate = Math.round((next.count / item.count) * 100)
          return (
            <div key={item.stage} className="text-center p-3 bg-[#f8f9fa] rounded-xl">
              <p className="text-[11px] text-muted mb-1">{item.stage} → {next.stage}</p>
              <p className="text-[18px] font-bold text-[#3182f6]">{rate}%</p>
              <p className="text-[11px] text-muted">{item.count}명 → {next.count}명</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── 월별 추이 탭 ──────────────────────────────────────────
function TrendTab() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-foreground mb-2">월별 지원 & 합격 추이</h3>
        <p className="text-[13px] text-muted mb-6">2026년 상반기 채용 트렌드</p>
        <MonthlyChart />
      </div>
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-foreground mb-5">월별 상세 데이터</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#f8f9fa]">
                <th className="text-left p-3 font-medium text-muted">월</th>
                <th className="text-right p-3 font-medium text-muted">지원수</th>
                <th className="text-right p-3 font-medium text-muted">합격수</th>
                <th className="text-right p-3 font-medium text-muted">합격률</th>
                <th className="text-right p-3 font-medium text-muted">평균 소요일</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m) => (
                <tr key={m.month} className="border-t border-border hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-3 font-medium text-foreground">{m.month}</td>
                  <td className="p-3 text-right text-foreground">{m.applications}명</td>
                  <td className="p-3 text-right text-foreground">{m.hires}명</td>
                  <td className="p-3 text-right text-[#3182f6] font-medium">{((m.hires / m.applications) * 100).toFixed(1)}%</td>
                  <td className="p-3 text-right text-foreground">{m.avgDays}일</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── 포지션별 탭 ─────────────────────────────────────────
function PositionsTab() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <h3 className="text-[15px] font-semibold text-foreground mb-2">포지션별 채용 현황</h3>
      <p className="text-[13px] text-muted mb-6">각 포지션의 진행 상태를 확인하세요</p>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#f8f9fa]">
              <th className="text-left p-3 font-medium text-muted">포지션</th>
              <th className="text-right p-3 font-medium text-muted">지원자</th>
              <th className="text-center p-3 font-medium text-muted">서류</th>
              <th className="text-center p-3 font-medium text-muted">1차</th>
              <th className="text-center p-3 font-medium text-muted">2차</th>
              <th className="text-center p-3 font-medium text-muted">처우</th>
              <th className="text-center p-3 font-medium text-muted">확정</th>
              <th className="text-right p-3 font-medium text-muted">소요일</th>
              <th className="text-center p-3 font-medium text-muted">상태</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => (
              <tr key={pos.name} className="border-t border-border hover:bg-[#f8f9fa] transition-colors">
                <td className="p-3 font-medium text-foreground">{pos.name}</td>
                <td className="p-3 text-right text-foreground">{pos.applicants}명</td>
                {(['서류', '1차', '2차', '처우', '확정'] as const).map((key) => (
                  <td key={key} className="p-3 text-center">
                    {pos.stages[key] > 0 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#e8f3ff] text-[12px] font-medium text-[#3182f6]">
                        {pos.stages[key]}
                      </span>
                    ) : (
                      <span className="text-[12px] text-muted">-</span>
                    )}
                  </td>
                ))}
                <td className="p-3 text-right text-foreground">{pos.days}일</td>
                <td className="p-3 text-center">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${
                    pos.status === '진행중'
                      ? 'bg-[#e8f3ff] text-[#3182f6]'
                      : 'bg-[#f2f4f6] text-[#8b95a1]'
                  }`}>
                    {pos.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── SVG: 퍼널 차트 ────────────────────────────────────────
function FunnelChart({ large = false }: { large?: boolean }) {
  const maxCount = funnelData[0].count
  const barHeight = large ? 48 : 36
  const gap = large ? 8 : 6
  const svgHeight = funnelData.length * (barHeight + gap)
  const svgWidth = large ? 700 : 500

  return (
    <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
      {funnelData.map((item, i) => {
        const barWidth = (item.count / maxCount) * (svgWidth * 0.6)
        const x = (svgWidth * 0.6 - barWidth) / 2 + (large ? 80 : 60)
        const y = i * (barHeight + gap)
        const nextItem = funnelData[i + 1]
        const rate = nextItem ? Math.round((nextItem.count / item.count) * 100) : null

        return (
          <g key={item.stage}>
            {/* 바 */}
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={barHeight / 2}
              fill={item.color}
            />
            {/* 스테이지명 */}
            <text
              x={large ? 0 : 0}
              y={y + barHeight / 2 + 1}
              dominantBaseline="middle"
              className="text-[12px] fill-[#4e5968] font-medium"
            >
              {item.stage}
            </text>
            {/* 인원수 */}
            <text
              x={x + barWidth / 2}
              y={y + barHeight / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[12px] fill-[#191f28] font-bold"
            >
              {item.count}명
            </text>
            {/* 전환율 화살표 */}
            {rate !== null && (
              <g>
                <text
                  x={svgWidth * 0.6 + (large ? 120 : 90)}
                  y={y + barHeight + gap / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[11px] fill-[#8b95a1]"
                >
                  {rate}% →
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ─── SVG: 병목 구간 차트 ────────────────────────────────────
function BottleneckChart() {
  const maxDays = Math.max(...stageDays.map((s) => s.days))
  const barHeight = 36
  const gap = 12
  const svgHeight = stageDays.length * (barHeight + gap)
  const chartWidth = 400

  return (
    <div>
      <svg width="100%" viewBox={`0 0 500 ${svgHeight}`} className="overflow-visible">
        {stageDays.map((item, i) => {
          const barWidth = (item.days / maxDays) * chartWidth
          const y = i * (barHeight + gap)
          const isMax = item.days === maxDays

          return (
            <g key={item.stage}>
              {/* 스테이지명 */}
              <text
                x={0}
                y={y + barHeight / 2 + 1}
                dominantBaseline="middle"
                className="text-[12px] fill-[#4e5968] font-medium"
              >
                {item.stage}
              </text>
              {/* 배경 바 */}
              <rect
                x={80}
                y={y}
                width={chartWidth}
                height={barHeight}
                rx={8}
                fill="#f2f4f6"
              />
              {/* 값 바 */}
              <rect
                x={80}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                fill={isMax ? '#ff6b6b' : '#3182f6'}
                opacity={isMax ? 1 : 0.8}
              />
              {/* 일수 라벨 */}
              <text
                x={80 + barWidth + 10}
                y={y + barHeight / 2 + 1}
                dominantBaseline="middle"
                className={`text-[12px] font-bold ${isMax ? 'fill-[#ff6b6b]' : 'fill-[#3182f6]'}`}
              >
                {item.days}일
              </text>
              {/* 병목 배지 */}
              {item.isBottleneck && (
                <g>
                  <rect
                    x={80 + barWidth + 42}
                    y={y + barHeight / 2 - 10}
                    width={68}
                    height={20}
                    rx={10}
                    fill="#fff5f5"
                    stroke="#ff6b6b"
                    strokeWidth={1}
                  />
                  <text
                    x={80 + barWidth + 76}
                    y={y + barHeight / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-[#ff6b6b] font-semibold"
                  >
                    병목 구간
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
      <div className="flex items-center gap-2 mt-4 p-3 bg-[#fff8e1] rounded-xl">
        <AlertTriangle size={14} className="text-[#f59e0b] flex-shrink-0" />
        <p className="text-[12px] text-[#92742e]">
          처우협의 단계가 가장 오래 걸립니다. 오퍼 레터 템플릿 준비로 단축할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

// ─── SVG: 월별 차트 ────────────────────────────────────────
function MonthlyChart() {
  const maxApps = Math.max(...monthlyData.map((m) => m.applications))
  const maxDays = Math.max(...monthlyData.map((m) => m.avgDays))
  const chartWidth = 660
  const chartHeight = 200
  const padding = { top: 20, right: 60, bottom: 40, left: 40 }
  const plotW = chartWidth - padding.left - padding.right
  const plotH = chartHeight - padding.top - padding.bottom
  const barGroupWidth = plotW / monthlyData.length
  const barWidth = 24

  // 평균 소요일 선 그래프 좌표
  const linePoints = monthlyData.map((m, i) => {
    const x = padding.left + barGroupWidth * i + barGroupWidth / 2
    const y = padding.top + plotH - (m.avgDays / maxDays) * plotH
    return `${x},${y}`
  }).join(' ')

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
        {/* 가로 그리드 선 */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + plotH * (1 - ratio)
          return (
            <line
              key={ratio}
              x1={padding.left}
              y1={y}
              x2={chartWidth - padding.right}
              y2={y}
              stroke="#f2f4f6"
              strokeWidth={1}
            />
          )
        })}

        {monthlyData.map((m, i) => {
          const groupX = padding.left + barGroupWidth * i + barGroupWidth / 2
          const appBarH = (m.applications / maxApps) * plotH
          const hireBarH = (m.hires / maxApps) * plotH

          return (
            <g key={m.month}>
              {/* 지원수 바 */}
              <rect
                x={groupX - barWidth - 2}
                y={padding.top + plotH - appBarH}
                width={barWidth}
                height={appBarH}
                rx={4}
                fill="#3182f6"
                opacity={0.7}
              />
              {/* 합격수 바 */}
              <rect
                x={groupX + 2}
                y={padding.top + plotH - hireBarH}
                width={barWidth}
                height={hireBarH}
                rx={4}
                fill="#00c471"
                opacity={0.8}
              />
              {/* 월 라벨 */}
              <text
                x={groupX}
                y={chartHeight - 8}
                textAnchor="middle"
                className="text-[11px] fill-[#8b95a1]"
              >
                {m.month}
              </text>
            </g>
          )
        })}

        {/* 평균 소요일 선 그래프 */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {monthlyData.map((m, i) => {
          const x = padding.left + barGroupWidth * i + barGroupWidth / 2
          const y = padding.top + plotH - (m.avgDays / maxDays) * plotH
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={3.5}
              fill="#fff"
              stroke="#f59e0b"
              strokeWidth={2}
            />
          )
        })}
      </svg>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className="w-3 h-3 rounded-sm bg-[#3182f6] opacity-70 inline-block" />
          지원수
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className="w-3 h-3 rounded-sm bg-[#00c471] opacity-80 inline-block" />
          합격수
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className="w-2.5 h-0.5 bg-[#f59e0b] inline-block rounded-full" />
          평균 소요일
        </span>
      </div>
    </div>
  )
}
