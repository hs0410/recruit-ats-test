'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Plus, X } from 'lucide-react'

const initialInterviews = [
  { id: '1', candidate: '박서준', job: '프론트엔드 개발자', date: '2026-04-07', time: '10:00', interviewer: '이팀장', location: '회의실 A', stage: '1차면접', color: '#3182f6' },
  { id: '2', candidate: '최유진', job: '프론트엔드 개발자', date: '2026-04-07', time: '14:00', interviewer: '김리드', location: '회의실 B', stage: '1차면접', color: '#3182f6' },
  { id: '3', candidate: '정민호', job: '백엔드 개발자', date: '2026-04-08', time: '11:00', interviewer: '박CTO', location: '회의실 A', stage: '2차면접', color: '#6366f1' },
  { id: '4', candidate: '한소희', job: 'PM', date: '2026-04-09', time: '15:00', interviewer: '정대표', location: '대표실', stage: '처우협의', color: '#8b5cf6' },
]

export default function SchedulePage() {
  const [mockInterviews, setMockInterviews] = useState(initialInterviews)
  const [showModal, setShowModal] = useState(false)
  const [newSchedule, setNewSchedule] = useState({ candidate: '', job: '', date: '', time: '', interviewer: '', location: '', stage: '1차면접' })
  const weekDates = [
    new Date(2026, 3, 6),  // 월
    new Date(2026, 3, 7),  // 화
    new Date(2026, 3, 8),  // 수
    new Date(2026, 3, 9),  // 목
    new Date(2026, 3, 10), // 금
  ]

  const daysKo = ['월', '화', '수', '목', '금']

  const formatDate = (d: Date) => {
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `2026-${m}-${day}`
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground">면접 일정</h1>
          <p className="text-[14px] text-muted mt-1">이번 주 면접 {mockInterviews.length}건</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft flex items-center gap-2"
        >
          <Plus size={16} />
          일정 등록
        </button>
      </div>

      {/* 주간 네비게이션 */}
      <div className="flex items-center gap-4 mb-6">
        <button className="p-2 rounded-xl hover:bg-card border border-border shadow-soft">
          <ChevronLeft size={16} className="text-muted" />
        </button>
        <h2 className="text-[15px] font-bold text-foreground">2026년 4월 1주차</h2>
        <button className="p-2 rounded-xl hover:bg-card border border-border shadow-soft">
          <ChevronRight size={16} className="text-muted" />
        </button>
        <button className="ml-2 text-[13px] text-primary font-semibold bg-primary-light px-3 py-1.5 rounded-lg">
          오늘
        </button>
      </div>

      {/* 주간 캘린더 */}
      <div className="grid grid-cols-5 gap-4">
        {weekDates.map((date, idx) => {
          const dateStr = formatDate(date)
          const dayInterviews = mockInterviews.filter(i => i.date === dateStr)
          const isToday = dateStr === '2026-04-06'

          return (
            <div key={dateStr} className="min-h-[480px]">
              {/* 날짜 헤더 */}
              <div className={`text-center mb-3 py-3 rounded-xl ${isToday ? 'bg-primary' : 'bg-card border border-border shadow-soft'}`}>
                <p className={`text-[12px] ${isToday ? 'text-white/70' : 'text-muted'}`}>{daysKo[idx]}</p>
                <p className={`text-[20px] font-bold ${isToday ? 'text-white' : 'text-foreground'}`}>
                  {date.getDate()}
                </p>
              </div>

              {/* 면접 카드 */}
              <div className="space-y-2.5">
                {dayInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="bg-card rounded-xl border border-border p-4 shadow-soft hover-lift cursor-pointer"
                    style={{ borderLeft: `3px solid ${interview.color}` }}
                  >
                    <p className="text-[14px] font-semibold text-foreground">{interview.candidate}</p>
                    <p className="text-[12px] text-muted mt-0.5">{interview.job}</p>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[12px] text-muted">
                        <Clock size={12} />
                        {interview.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-muted">
                        <User size={12} />
                        {interview.interviewer}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-muted">
                        <MapPin size={12} />
                        {interview.location}
                      </div>
                    </div>

                    <span
                      className="inline-block mt-3 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${interview.color}15`, color: interview.color }}
                    >
                      {interview.stage}
                    </span>
                  </div>
                ))}

                {dayInterviews.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-[12px] text-muted/50">일정 없음</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 일정 등록 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-bold text-foreground">면접 일정 등록</h3>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-foreground mb-1.5">후보자명 *</label>
                <input type="text" value={newSchedule.candidate} onChange={(e) => setNewSchedule({ ...newSchedule, candidate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="이름" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-foreground mb-1.5">날짜 *</label>
                  <input type="date" value={newSchedule.date} onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-foreground mb-1.5">시간 *</label>
                  <input type="time" value={newSchedule.time} onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-foreground mb-1.5">면접관</label>
                  <input type="text" value={newSchedule.interviewer} onChange={(e) => setNewSchedule({ ...newSchedule, interviewer: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="면접관" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-foreground mb-1.5">장소</label>
                  <input type="text" value={newSchedule.location} onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="회의실" />
                </div>
              </div>
              <button
                onClick={() => {
                  if (newSchedule.candidate && newSchedule.date && newSchedule.time) {
                    const stageColors: Record<string, string> = { '1차면접': '#3182f6', '2차면접': '#6366f1', '처우협의': '#8b5cf6' }
                    setMockInterviews([...mockInterviews, {
                      id: String(mockInterviews.length + 1),
                      ...newSchedule,
                      color: stageColors[newSchedule.stage] ?? '#3182f6',
                    }])
                    setNewSchedule({ candidate: '', job: '', date: '', time: '', interviewer: '', location: '', stage: '1차면접' })
                    setShowModal(false)
                  }
                }}
                className="w-full bg-gradient-to-r from-primary to-[#6366f1] text-white py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
