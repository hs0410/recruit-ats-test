'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Copy, RefreshCw, Sparkles, Target, Globe, FileText, Eye, Wand2 } from 'lucide-react'
import { jdTemplates, JD_DEPARTMENTS, type JDTemplate } from '@/lib/jd-templates'

const steps = [
  { num: 1, label: 'WHY', desc: '채용 목적', icon: Target },
  { num: 2, label: 'WHERE', desc: '채널 선택', icon: Globe },
  { num: 3, label: 'HOW', desc: '상세 정보', icon: FileText },
  { num: 4, label: '미리보기', desc: '템플릿 참고', icon: Eye },
  { num: 5, label: '완성', desc: 'AI 생성', icon: Wand2 },
]

export default function NewJobWizardPage() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)

  // Step 1
  const [purpose, setPurpose] = useState<'branding' | 'efficiency' | ''>('')
  const [level, setLevel] = useState<'junior' | 'senior' | ''>('')

  // Step 2
  const [channel, setChannel] = useState<'online' | 'print' | 'hybrid' | ''>('')

  // Step 3
  const [form, setForm] = useState({
    title: '',
    department: '',
    tasks: '',
    qualifications: '',
    salary: '',
    benefits: '',
    tone: 'professional' as 'professional' | 'casual' | 'friendly',
    genderNeutral: true,
  })

  // Step 4
  const [selectedDept, setSelectedDept] = useState<string>('개발')
  const [selectedTemplate, setSelectedTemplate] = useState<JDTemplate | null>(null)

  // Step 5
  const [generated, setGenerated] = useState(false)
  const [generatedJD, setGeneratedJD] = useState('')

  const canNext = () => {
    switch (step) {
      case 1: return purpose && level
      case 2: return channel
      case 3: return form.title && form.department && form.tasks
      case 4: return true
      case 5: return true
      default: return false
    }
  }

  const generateJD = () => {
    const toneLabel = form.tone === 'casual' ? '캐주얼한' : form.tone === 'friendly' ? '친근한' : '전문적인'
    const levelLabel = level === 'senior' ? '경력직' : '신입/주니어'

    const jd = `[${form.department}] ${form.title}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 포지션 소개

${purpose === 'branding' ? '우리 팀은 최고의 동료와 함께 성장할 인재를 찾고 있습니다.' : '빠르게 성장하는 팀에서 즉시 활약할 수 있는 인재를 모집합니다.'}
${levelLabel} 대상으로, ${toneLabel} 분위기의 팀에서 함께할 분을 기다립니다.

📋 주요 업무

${form.tasks}

✅ 자격 요건

${form.qualifications || '- 해당 분야 실무 경험\n- 관련 도구/기술 활용 능력\n- 원활한 커뮤니케이션 능력'}

${form.salary ? `💰 급여\n\n${form.salary}\n` : ''}
🎁 복리후생

${form.benefits || '- 유연근무제\n- 교육비 지원\n- 건강검진 지원'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${form.genderNeutral ? '※ 본 공고는 성별, 연령, 학력 등에 관계없이 지원 가능합니다.' : ''}
채용 문의: hr@company.com`

    setGeneratedJD(jd)
    setGenerated(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedJD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const deptTemplates = jdTemplates.filter(t => t.department === selectedDept)

  return (
    <div>
      <Link href="/jobs" className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} />
        채용 공고 목록
      </Link>

      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          JD 위자드
        </h1>
        <p className="text-[14px] text-muted mt-1">5단계로 완성하는 채용 공고</p>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = s.num === step
          const isDone = s.num < step
          return (
            <div key={s.num} className="flex items-center gap-2">
              <button
                onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-[#6366f1] text-white shadow-soft'
                    : isDone
                    ? 'bg-success-light text-success'
                    : 'bg-card-hover text-muted'
                }`}
              >
                {isDone ? <Check size={14} /> : <Icon size={14} />}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
            </div>
          )
        })}
      </div>

      {/* Step 1: WHY */}
      {step === 1 && (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft space-y-8">
          <div>
            <h2 className="text-[18px] font-bold text-foreground mb-2">채용 목적은 무엇인가요?</h2>
            <p className="text-[13px] text-muted">공고의 톤과 방향을 결정합니다</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPurpose('branding')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                purpose === 'branding' ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
              }`}
            >
              <p className="text-[15px] font-bold text-foreground mb-1">채용 브랜딩</p>
              <p className="text-[12px] text-muted">회사/팀의 매력을 어필하여 우수 인재를 유치</p>
            </button>
            <button
              onClick={() => setPurpose('efficiency')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                purpose === 'efficiency' ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
              }`}
            >
              <p className="text-[15px] font-bold text-foreground mb-1">효율 중심</p>
              <p className="text-[12px] text-muted">명확한 요건으로 적합한 지원자를 빠르게 선별</p>
            </button>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-foreground mb-3">타겟 레벨</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setLevel('junior')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  level === 'junior' ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
                }`}
              >
                <p className="text-[14px] font-bold text-foreground">신입/주니어</p>
                <p className="text-[12px] text-muted mt-0.5">경력 0~3년</p>
              </button>
              <button
                onClick={() => setLevel('senior')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  level === 'senior' ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
                }`}
              >
                <p className="text-[14px] font-bold text-foreground">경력직/시니어</p>
                <p className="text-[12px] text-muted mt-0.5">경력 3년 이상</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: WHERE */}
      {step === 2 && (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft space-y-8">
          <div>
            <h2 className="text-[18px] font-bold text-foreground mb-2">어디에 공고를 올릴 예정인가요?</h2>
            <p className="text-[13px] text-muted">채널에 따라 공고 포맷이 달라집니다</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'online' as const, label: '온라인', desc: '잡포털, 링크드인, 자사 채용페이지' },
              { value: 'print' as const, label: '오프라인', desc: '신문, 잡지, 포스터' },
              { value: 'hybrid' as const, label: '하이브리드', desc: '온라인 + 오프라인 동시' },
            ].map((ch) => (
              <button
                key={ch.value}
                onClick={() => setChannel(ch.value)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  channel === ch.value ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
                }`}
              >
                <p className="text-[15px] font-bold text-foreground mb-1">{ch.label}</p>
                <p className="text-[12px] text-muted">{ch.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: HOW */}
      {step === 3 && (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft space-y-5">
          <div>
            <h2 className="text-[18px] font-bold text-foreground mb-2">상세 정보를 입력하세요</h2>
            <p className="text-[13px] text-muted">AI가 이 정보를 기반으로 공고를 생성합니다</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-2">공고 제목 *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="시니어 백엔드 개발자"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-2">부서 *</label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              >
                <option value="">부서 선택</option>
                <option value="개발">개발</option>
                <option value="기획">기획</option>
                <option value="디자인">디자인</option>
                <option value="마케팅">마케팅</option>
                <option value="영업">영업</option>
                <option value="HR">HR</option>
                <option value="품질">품질</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-2">주요 업무 *</label>
            <textarea
              value={form.tasks}
              onChange={(e) => setForm({ ...form, tasks: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="- 주요 업무 1&#10;- 주요 업무 2&#10;- 주요 업무 3"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-2">자격 요건</label>
            <textarea
              value={form.qualifications}
              onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="필수/우대 자격 요건"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-2">급여 정보</label>
              <input
                type="text"
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="예: 5,000~7,000만원 (협의)"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-foreground mb-2">톤 선택</label>
              <select
                value={form.tone}
                onChange={(e) => setForm({ ...form, tone: e.target.value as typeof form.tone })}
                className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              >
                <option value="professional">전문적</option>
                <option value="casual">캐주얼</option>
                <option value="friendly">친근한</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-2">복리후생</label>
            <textarea
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="- 유연근무제&#10;- 교육비 지원"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.genderNeutral}
              onChange={(e) => setForm({ ...form, genderNeutral: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
            />
            <span className="text-[13px] text-foreground">성별 중립 표현 사용</span>
          </label>
        </div>
      )}

      {/* Step 4: 템플릿 미리보기 */}
      {step === 4 && (
        <div className="space-y-5">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
            <h2 className="text-[18px] font-bold text-foreground mb-2">내부 템플릿 라이브러리</h2>
            <p className="text-[13px] text-muted mb-5">다른 회사의 공고를 참고하여 우리 공고를 더 잘 작성해보세요</p>

            {/* 부서 필터 */}
            <div className="flex gap-2 mb-5">
              {JD_DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => { setSelectedDept(dept); setSelectedTemplate(null) }}
                  className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${
                    selectedDept === dept
                      ? 'bg-gradient-to-r from-primary to-[#6366f1] text-white shadow-soft'
                      : 'bg-card-hover text-muted hover:text-foreground'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* 템플릿 그리드 */}
            <div className="grid grid-cols-2 gap-3">
              {deptTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTemplate?.id === t.id ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <p className="text-[14px] font-bold text-foreground">{t.title}</p>
                  <p className="text-[11px] text-muted mt-0.5">{t.company}</p>
                  <p className="text-[12px] text-muted mt-2 line-clamp-2">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 선택된 템플릿 상세 */}
          {selectedTemplate && (
            <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-bold text-foreground">{selectedTemplate.title}</h3>
                <span className="text-[11px] font-semibold text-muted bg-card-hover px-2.5 py-1 rounded-full">{selectedTemplate.company}</span>
              </div>
              <div className="space-y-4 text-[13px] text-muted">
                <div>
                  <p className="font-semibold text-foreground mb-1">주요 업무</p>
                  <p className="whitespace-pre-line">{selectedTemplate.tasks}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">자격 요건</p>
                  <p className="whitespace-pre-line">{selectedTemplate.qualifications}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">우대 사항</p>
                  <p className="whitespace-pre-line">{selectedTemplate.preferred}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">복리후생</p>
                  <p className="whitespace-pre-line">{selectedTemplate.benefits}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setForm({
                    ...form,
                    title: form.title || selectedTemplate.title,
                    tasks: form.tasks || selectedTemplate.tasks,
                    qualifications: form.qualifications || selectedTemplate.qualifications,
                    benefits: form.benefits || selectedTemplate.benefits,
                  })
                }}
                className="mt-4 text-[12px] font-semibold text-primary bg-primary-light px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                이 템플릿 적용하기
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 5: AI 생성 결과 */}
      {step === 5 && (
        <div className="bg-card rounded-2xl border border-border p-8 shadow-soft space-y-5">
          {!generated ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3182f6] to-[#8b5cf6] flex items-center justify-center mx-auto mb-5">
                <Wand2 size={28} className="text-white" />
              </div>
              <h2 className="text-[18px] font-bold text-foreground mb-2">AI 공고 생성</h2>
              <p className="text-[13px] text-muted mb-6">입력한 정보를 바탕으로 채용 공고를 자동 생성합니다</p>
              <button
                onClick={generateJD}
                className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-8 py-3 rounded-xl text-[14px] font-semibold hover:opacity-90 transition-opacity shadow-soft inline-flex items-center gap-2"
              >
                <Sparkles size={16} />
                공고 생성하기
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-foreground">생성된 공고</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? '복사됨!' : '복사'}
                  </button>
                  <button
                    onClick={generateJD}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-muted bg-card-hover px-3 py-1.5 rounded-lg hover:text-foreground transition-colors"
                  >
                    <RefreshCw size={14} />
                    재생성
                  </button>
                </div>
              </div>
              <div className="bg-card-hover rounded-xl p-6 text-[13px] text-foreground leading-relaxed whitespace-pre-line font-mono">
                {generatedJD}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => alert('공고가 등록되었습니다! (Supabase 연동 후 실제 저장)')}
                  className="bg-gradient-to-r from-primary to-[#6366f1] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity shadow-soft"
                >
                  공고 등록하기
                </button>
                <Link href="/jobs" className="px-6 py-2.5 rounded-xl text-[13px] border border-border hover:bg-card-hover transition-colors">
                  목록으로
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* 하단 네비게이션 */}
      {step < 5 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold border border-border hover:bg-card-hover transition-colors ${
              step === 1 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft size={14} />
            이전
          </button>
          <button
            onClick={() => setStep(Math.min(5, step + 1))}
            disabled={!canNext()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-gradient-to-r from-primary to-[#6366f1] text-white hover:opacity-90 transition-opacity shadow-soft disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
