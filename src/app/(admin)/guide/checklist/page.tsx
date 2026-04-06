'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckSquare, Square, AlertTriangle, Clock, RotateCcw } from 'lucide-react'

interface CheckItem {
  id: string
  text: string
  category: 'preparation' | 'documents' | 'environment' | 'legal'
}

const checklistItems: CheckItem[] = [
  // 사전 준비
  { id: 'p1', text: 'JD(직무기술서)를 다시 한번 확인했는가?', category: 'preparation' },
  { id: 'p2', text: '지원자 이력서와 포트폴리오를 꼼꼼히 검토했는가?', category: 'preparation' },
  { id: 'p3', text: '면접 질문 리스트를 준비했는가?', category: 'preparation' },
  { id: 'p4', text: '평가 기준표(스코어카드)를 인쇄/준비했는가?', category: 'preparation' },
  { id: 'p5', text: '다른 면접관과 역할 분담을 했는가? (질문 담당, 기록 담당 등)', category: 'preparation' },
  { id: 'p6', text: '면접 시간과 소요 시간을 확인했는가?', category: 'preparation' },
  // 서류/자료
  { id: 'd1', text: '지원자의 이전 면접 기록/평가를 확인했는가? (2차 이상)', category: 'documents' },
  { id: 'd2', text: '필기구와 메모지를 준비했는가?', category: 'documents' },
  { id: 'd3', text: '회사/팀 소개 자료를 준비했는가?', category: 'documents' },
  // 환경
  { id: 'e1', text: '면접실을 예약하고 정리했는가?', category: 'environment' },
  { id: 'e2', text: '화상 면접인 경우 카메라/마이크/네트워크를 테스트했는가?', category: 'environment' },
  { id: 'e3', text: '물/음료를 준비했는가?', category: 'environment' },
  { id: 'e4', text: '면접실 안내 동선을 확인했는가?', category: 'environment' },
  // 법적 주의사항
  { id: 'l1', text: '금지 질문(출신지역, 혼인여부, 재산, 가족 학력/직업)을 질문 리스트에서 제외했는가?', category: 'legal' },
  { id: 'l2', text: '직무와 무관한 신체 조건(키, 몸무게)을 묻지 않을 것인가?', category: 'legal' },
  { id: 'l3', text: '종교에 대해 묻지 않을 것인가?', category: 'legal' },
  { id: 'l4', text: '모든 지원자에게 동일한 질문과 기준을 적용할 것인가?', category: 'legal' },
  { id: 'l5', text: '면접 내용을 기록으로 남길 준비가 되었는가?', category: 'legal' },
]

const categories = [
  { key: 'preparation' as const, label: '사전 준비', icon: '📋', color: 'text-primary' },
  { key: 'documents' as const, label: '서류/자료', icon: '📄', color: 'text-[#6366f1]' },
  { key: 'environment' as const, label: '면접 환경', icon: '🏢', color: 'text-[#8b5cf6]' },
  { key: 'legal' as const, label: '법적 주의사항', icon: '⚖️', color: 'text-danger' },
]

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const resetAll = () => setChecked({})

  const totalItems = checklistItems.length
  const checkedCount = Object.values(checked).filter(Boolean).length
  const progress = Math.round((checkedCount / totalItems) * 100)

  return (
    <div>
      <Link href="/guide" className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        면접 가이드
      </Link>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
            <Clock size={24} className="text-primary" />
            면접 30분 전 체크리스트
          </h1>
          <p className="text-[14px] text-muted mt-1">면접 시작 전 반드시 확인하세요</p>
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-muted bg-card-hover px-3 py-1.5 rounded-lg hover:text-foreground transition-colors"
        >
          <RotateCcw size={14} />
          초기화
        </button>
      </div>

      {/* 프로그레스 바 */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-semibold text-foreground">진행률</p>
          <p className="text-[13px] font-bold text-primary">{checkedCount}/{totalItems} ({progress}%)</p>
        </div>
        <div className="w-full h-3 bg-card-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-[#6366f1] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-[12px] text-success font-semibold mt-3 flex items-center gap-1">
            <CheckSquare size={14} />
            모든 항목을 확인했습니다. 면접 준비 완료!
          </p>
        )}
      </div>

      {/* 체크리스트 */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const items = checklistItems.filter(i => i.category === cat.key)
          const catChecked = items.filter(i => checked[i.id]).length
          return (
            <div key={cat.key} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[20px]">{cat.icon}</span>
                  <div>
                    <p className={`text-[14px] font-bold ${cat.color}`}>{cat.label}</p>
                    <p className="text-[11px] text-muted">{catChecked}/{items.length} 완료</p>
                  </div>
                </div>
                {cat.key === 'legal' && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-danger bg-danger-light px-2.5 py-1 rounded-full">
                    <AlertTriangle size={12} />
                    필수 확인
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1">
                {items.map((item) => {
                  const isChecked = checked[item.id]
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-3 px-3 py-3 rounded-xl w-full text-left hover:bg-card-hover transition-colors group"
                    >
                      {isChecked
                        ? <CheckSquare size={18} className="text-success mt-0.5 flex-shrink-0" />
                        : <Square size={18} className="text-muted mt-0.5 flex-shrink-0 group-hover:text-primary" />
                      }
                      <span className={`text-[13px] ${isChecked ? 'text-muted line-through' : 'text-foreground'}`}>
                        {item.text}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
