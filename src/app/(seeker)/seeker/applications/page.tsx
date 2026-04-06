'use client'

import { useState } from 'react'
import { FileText, CheckCircle2, XCircle, Clock, Loader2, MessageSquare, BookOpen, ChevronRight } from 'lucide-react'

const stats = [
  { label: '총 지원', value: 12, icon: FileText, color: '#6b7280', bg: '#f3f4f6' },
  { label: '진행중', value: 5, icon: Loader2, color: '#3182f6', bg: '#eff6ff' },
  { label: '합격', value: 2, icon: CheckCircle2, color: '#10b981', bg: '#ecfdf5' },
  { label: '불합격', value: 3, icon: XCircle, color: '#ef4444', bg: '#fef2f2' },
  { label: '대기', value: 2, icon: Clock, color: '#f59e0b', bg: '#fffbeb' },
]

const filterTabs = ['전체', '진행중', '합격', '불합격']

type Stage = '지원완료' | '서류심사' | '1차면접' | '2차면접' | '최종'
type Status = '진행중' | '합격' | '불합격' | '대기'

interface Application {
  id: number
  company: string
  initial: string
  color: string
  position: string
  appliedDate: string
  currentStage: Stage
  status: Status
  statusColor: string
  statusBg: string
}

const stages: Stage[] = ['지원완료', '서류심사', '1차면접', '2차면접', '최종']

const mockApplications: Application[] = [
  {
    id: 1,
    company: '토스',
    initial: 'T',
    color: '#3182f6',
    position: '프론트엔드 개발자',
    appliedDate: '2026.03.28',
    currentStage: '2차면접',
    status: '진행중',
    statusColor: '#3182f6',
    statusBg: '#eff6ff',
  },
  {
    id: 2,
    company: '카카오',
    initial: 'K',
    color: '#fee500',
    position: '백엔드 개발자',
    appliedDate: '2026.03.25',
    currentStage: '최종',
    status: '합격',
    statusColor: '#10b981',
    statusBg: '#ecfdf5',
  },
  {
    id: 3,
    company: '네이버',
    initial: 'N',
    color: '#00c73c',
    position: '데이터 분석가',
    appliedDate: '2026.03.22',
    currentStage: '1차면접',
    status: '불합격',
    statusColor: '#ef4444',
    statusBg: '#fef2f2',
  },
  {
    id: 4,
    company: '쿠팡',
    initial: 'C',
    color: '#e4002b',
    position: '퍼포먼스 마케터',
    appliedDate: '2026.03.30',
    currentStage: '서류심사',
    status: '진행중',
    statusColor: '#3182f6',
    statusBg: '#eff6ff',
  },
  {
    id: 5,
    company: '라인',
    initial: 'L',
    color: '#06c755',
    position: '프로덕트 매니저',
    appliedDate: '2026.03.20',
    currentStage: '2차면접',
    status: '불합격',
    statusColor: '#ef4444',
    statusBg: '#fef2f2',
  },
  {
    id: 6,
    company: '배달의민족',
    initial: 'B',
    color: '#2ac1bc',
    position: '브랜드 디자이너',
    appliedDate: '2026.04.01',
    currentStage: '1차면접',
    status: '진행중',
    statusColor: '#3182f6',
    statusBg: '#eff6ff',
  },
  {
    id: 7,
    company: '비바리퍼블리카',
    initial: 'V',
    color: '#3182f6',
    position: 'HR 비즈니스 파트너',
    appliedDate: '2026.03.15',
    currentStage: '최종',
    status: '합격',
    statusColor: '#10b981',
    statusBg: '#ecfdf5',
  },
  {
    id: 8,
    company: '당근',
    initial: '당',
    color: '#ff6f0f',
    position: 'UX 디자이너',
    appliedDate: '2026.04.02',
    currentStage: '지원완료',
    status: '대기',
    statusColor: '#f59e0b',
    statusBg: '#fffbeb',
  },
]

function getStageIndex(stage: Stage) {
  return stages.indexOf(stage)
}

export default function SeekerApplicationsPage() {
  const [activeTab, setActiveTab] = useState('전체')

  const filtered = activeTab === '전체'
    ? mockApplications
    : mockApplications.filter(app => app.status === activeTab)

  return (
    <div className="max-w-[960px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-gray-900 mb-1">내 지원 현황</h1>
        <p className="text-[13px] text-gray-500">지원한 공고의 진행 상태를 확인하세요</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:shadow-sm transition-shadow"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: stat.bg }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <p className="text-[20px] font-bold text-gray-900">{stat.value}</p>
            <p className="text-[12px] text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
        {filterTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            <span className={`ml-1.5 text-[11px] ${activeTab === tab ? 'text-emerald-600' : 'text-gray-400'}`}>
              {tab === '전체' ? mockApplications.length : mockApplications.filter(a => a.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Application List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map(app => {
            const currentIdx = getStageIndex(app.currentStage)
            const isInterview = app.status === '진행중' && (app.currentStage === '1차면접' || app.currentStage === '2차면접')
            const isRejected = app.status === '불합격'

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[14px] font-bold shrink-0"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-semibold text-gray-900">{app.position}</h3>
                        <span
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
                          style={{ backgroundColor: app.statusBg, color: app.statusColor }}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-500">{app.company} · 지원일 {app.appliedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isInterview && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[12px] font-medium hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <BookOpen className="w-3 h-3" />
                        면접 준비
                      </button>
                    )}
                    {isRejected && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-[12px] font-medium hover:bg-gray-50 transition-colors">
                        <MessageSquare className="w-3 h-3" />
                        피드백 보기
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Pipeline */}
                <div className="flex items-center gap-1">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx <= currentIdx
                    const isCurrent = idx === currentIdx
                    const isFailed = isRejected && isCurrent

                    return (
                      <div key={stage} className="flex-1 flex items-center gap-1">
                        <div className="flex-1">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              isFailed
                                ? 'bg-red-400'
                                : isCompleted
                                ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4]'
                                : 'bg-gray-100'
                            }`}
                          />
                          <p
                            className={`text-[10px] mt-1 text-center font-medium ${
                              isFailed
                                ? 'text-red-500'
                                : isCurrent
                                ? 'text-emerald-600'
                                : isCompleted
                                ? 'text-gray-500'
                                : 'text-gray-300'
                            }`}
                          >
                            {stage}
                          </p>
                        </div>
                        {idx < stages.length - 1 && <div className="w-1" />}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-900 mb-1">해당하는 지원 내역이 없습니다</p>
          <p className="text-[13px] text-gray-500">다른 필터를 선택하거나 새로운 공고에 지원해보세요</p>
          <button className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[13px] font-medium hover:shadow-md transition-all">
            공고 둘러보기
          </button>
        </div>
      )}
    </div>
  )
}
