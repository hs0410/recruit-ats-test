'use client'

import { useState } from 'react'
import { Save, Check } from 'lucide-react'

export default function SettingsPage() {
  const [stages, setStages] = useState(['서류접수', '1차면접', '2차면접', '처우협의', '입사확정'])
  const [newStage, setNewStage] = useState('')
  const [saved, setSaved] = useState(false)

  const addStage = () => {
    if (newStage.trim() && !stages.includes(newStage.trim())) {
      setStages([...stages, newStage.trim()])
      setNewStage('')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">설정</h1>

      {/* 채용 단계 관리 */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">채용 단계 관리</h2>
        <div className="space-y-2 mb-4">
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center justify-between bg-background rounded-lg px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-foreground/40 w-6">{i + 1}</span>
                <span className="text-sm">{stage}</span>
              </div>
              <button
                onClick={() => setStages(stages.filter((_, idx) => idx !== i))}
                className="text-xs text-danger hover:underline"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addStage()}
            placeholder="새 단계 추가"
            className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={addStage}
            className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm hover:bg-primary-hover"
          >
            추가
          </button>
        </div>
      </div>

      {/* 알림 설정 */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">알림 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">결과 미입력 알림</p>
              <p className="text-xs text-foreground/50">면접 후 N일이 지나도 결과가 입력되지 않으면 알림</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={2} min={1} className="w-16 px-3 py-2 rounded-lg border border-border text-sm text-center" />
              <span className="text-sm text-foreground/60">일</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">장기 미진행 알림</p>
              <p className="text-xs text-foreground/50">단계 변경 없이 N일이 지나면 알림</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={7} min={1} className="w-16 px-3 py-2 rounded-lg border border-border text-sm text-center" />
              <span className="text-sm text-foreground/60">일</span>
            </div>
          </div>
        </div>
      </div>

      {/* 회사 정보 */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">회사 정보 (채용 페이지용)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">회사명</label>
            <input type="text" defaultValue="" placeholder="회사명 입력" className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">회사 소개</label>
            <textarea rows={3} placeholder="채용 페이지에 표시될 회사 소개" className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }}
        className="mt-6 bg-gradient-to-r from-primary to-[#6366f1] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-soft"
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? '저장 완료!' : '저장하기'}
      </button>

      {/* 토스트 알림 */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-foreground text-white px-5 py-3 rounded-xl shadow-soft-lg text-[13px] font-semibold flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
          <Check size={16} />
          설정이 저장되었습니다
        </div>
      )}
    </div>
  )
}
