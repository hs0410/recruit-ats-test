'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronUp, Clock, CheckSquare, Square } from 'lucide-react'
import { trainingModules } from '@/lib/training-modules'

export default function TrainingPage() {
  const [openModule, setOpenModule] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      <Link href="/guide" className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        면접 가이드
      </Link>

      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">면접관 교육 모듈</h1>
        <p className="text-[14px] text-muted mt-1">공정하고 효과적인 면접을 위한 필수 교육</p>
      </div>

      <div className="space-y-4">
        {trainingModules.map((mod) => {
          const isOpen = openModule === mod.id
          return (
            <div key={mod.id} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              {/* 모듈 헤더 */}
              <button
                onClick={() => setOpenModule(isOpen ? null : mod.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[28px]">{mod.icon}</span>
                  <div>
                    <p className="text-[16px] font-bold text-foreground">{mod.title}</p>
                    <p className="text-[12px] text-muted mt-0.5">{mod.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <Clock size={12} />
                    {mod.duration}
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${mod.levelColor}`}>
                    {mod.level}
                  </span>
                  {isOpen ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </div>
              </button>

              {/* 모듈 내용 */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-3">
                  {mod.sections.map((section, si) => {
                    const sectionKey = `${mod.id}-${si}`
                    const isSectionOpen = openSections[sectionKey] !== false
                    return (
                      <div key={si} className="rounded-xl bg-card-hover overflow-hidden">
                        <button
                          onClick={() => toggleSection(sectionKey)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between"
                        >
                          <p className="text-[14px] font-semibold text-foreground">{section.title}</p>
                          {isSectionOpen ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                        </button>
                        {isSectionOpen && (
                          <div className="px-5 pb-4 space-y-4">
                            <div className="text-[13px] text-muted leading-relaxed whitespace-pre-line">
                              {section.content.split('**').map((part, i) =>
                                i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : <span key={i}>{part}</span>
                              )}
                            </div>
                            {section.checklist && (
                              <div className="bg-white rounded-xl p-4 border border-border/60">
                                <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-3">체크리스트</p>
                                <div className="space-y-2">
                                  {section.checklist.map((item, ci) => {
                                    const checkKey = `${sectionKey}-${ci}`
                                    const isChecked = checkedItems[checkKey]
                                    return (
                                      <button
                                        key={ci}
                                        onClick={() => toggleCheck(checkKey)}
                                        className="flex items-start gap-2.5 text-[13px] text-left w-full group"
                                      >
                                        {isChecked
                                          ? <CheckSquare size={16} className="text-success mt-0.5 flex-shrink-0" />
                                          : <Square size={16} className="text-muted mt-0.5 flex-shrink-0 group-hover:text-primary" />
                                        }
                                        <span className={isChecked ? 'text-muted line-through' : 'text-foreground'}>
                                          {item}
                                        </span>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
