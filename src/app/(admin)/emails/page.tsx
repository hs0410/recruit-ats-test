'use client'

import { useState } from 'react'
import { Mail, Copy, Send, FileText, Check, Edit3, X, Eye } from 'lucide-react'

type Template = {
  id: string
  name: string
  category: string
  categoryColor: string
  subject: string
  body: string
  variables: string[]
}

const templates: Template[] = [
  {
    id: '1',
    name: '서류합격 안내',
    category: '합격',
    categoryColor: '#22c55e',
    subject: '{{회사명}} {{포지션}} 서류전형 합격 안내',
    body: `{{이름}}님, 안녕하세요.
{{회사명}} 채용팀입니다.

{{포지션}} 포지션에 지원해 주셔서 감사합니다.
서류전형 검토 결과, {{이름}}님의 지원서가 합격하셨음을 안내드립니다.

다음 전형(1차 면접) 일정은 별도로 안내드릴 예정이며,
궁금하신 사항이 있으시면 언제든 연락 부탁드립니다.

감사합니다.
{{회사명}} 채용팀 드림`,
    variables: ['이름', '포지션', '회사명'],
  },
  {
    id: '2',
    name: '면접 일정 안내',
    category: '면접',
    categoryColor: '#3182f6',
    subject: '{{회사명}} {{포지션}} 면접 일정 안내',
    body: `{{이름}}님, 안녕하세요.
{{회사명}} 채용팀입니다.

{{포지션}} 포지션 면접 일정을 안내드립니다.

■ 면접 일시: {{면접일시}}
■ 면접 장소: {{면접장소}}
■ 면접 형태: {{면접유형}}
■ 소요 시간: 약 1시간

준비물: 신분증, 포트폴리오(해당 시)
※ 일정 변경이 필요하시면 최소 2일 전까지 회신 부탁드립니다.

감사합니다.
{{회사명}} 채용팀 드림`,
    variables: ['이름', '포지션', '회사명', '면접일시', '면접장소', '면접유형'],
  },
  {
    id: '3',
    name: '불합격 안내',
    category: '불합격',
    categoryColor: '#ef4444',
    subject: '{{회사명}} {{포지션}} 전형 결과 안내',
    body: `{{이름}}님, 안녕하세요.
{{회사명}} 채용팀입니다.

{{포지션}} 포지션에 지원해 주셔서 진심으로 감사드립니다.
신중한 검토 끝에, 이번 전형에서는 함께하기 어렵게 되었음을 안내드립니다.

{{이름}}님의 역량과 경험은 충분히 인상적이었으나,
현재 포지션의 요구사항과의 적합도를 종합적으로 고려한 결과입니다.

앞으로의 커리어에 좋은 기회가 있으시길 진심으로 응원합니다.
다시 한번 지원에 감사드립니다.

{{회사명}} 채용팀 드림`,
    variables: ['이름', '포지션', '회사명'],
  },
  {
    id: '4',
    name: '처우 제안서',
    category: '처우',
    categoryColor: '#8b5cf6',
    subject: '{{회사명}} {{포지션}} 처우 제안 안내',
    body: `{{이름}}님, 안녕하세요.
{{회사명}} 채용팀입니다.

면접 과정에서 보여주신 역량에 깊은 인상을 받았습니다.
아래와 같이 처우를 제안드리오니 검토 부탁드립니다.

■ 포지션: {{포지션}}
■ 연봉: {{연봉}}
■ 입사 예정일: {{입사일}}
■ 근무 형태: {{근무형태}}
■ 기타 복리후생: 4대보험, 연차, 식대 지원 등

본 제안은 발송일로부터 7일간 유효하며,
궁금하신 사항이 있으시면 편하게 연락 부탁드립니다.

감사합니다.
{{회사명}} 채용팀 드림`,
    variables: ['이름', '포지션', '회사명', '연봉', '입사일', '근무형태'],
  },
  {
    id: '5',
    name: '입사 안내',
    category: '입사',
    categoryColor: '#f59e0b',
    subject: '{{회사명}} 입사를 환영합니다! 🎉',
    body: `{{이름}}님, 안녕하세요!
{{회사명}} 채용팀입니다.

{{회사명}}에 합류하시게 된 것을 진심으로 환영합니다! 🎉

입사에 필요한 사항을 안내드립니다.

■ 입사일: {{입사일}}
■ 출근 시간: 오전 9시
■ 출근 장소: {{출근장소}}
■ 준비물: 신분증, 통장사본, 증명사진 1매

첫 날 안내:
1. 1층 안내데스크에서 방문 등록
2. HR팀에서 오리엔테이션 진행
3. 팀 소개 및 업무 환경 세팅

궁금하신 사항은 언제든 연락 주세요.
{{이름}}님과 함께할 날을 기대하고 있겠습니다!

{{회사명}} 채용팀 드림`,
    variables: ['이름', '회사명', '입사일', '출근장소'],
  },
]

const sampleData: Record<string, string> = {
  이름: '박서준',
  포지션: '프론트엔드 개발자',
  회사명: '토스',
  면접일시: '2026년 4월 10일 (목) 오후 2시',
  면접장소: '서울 강남구 테헤란로 131 한독빌딩 5층',
  면접유형: '대면 면접 (1:2)',
  연봉: '6,000만원',
  입사일: '2026년 5월 1일',
  근무형태: '주 5일 (하이브리드)',
  출근장소: '서울 강남구 테헤란로 131 한독빌딩 5층',
}

function fillVariables(text: string, data: Record<string, string>): string {
  let result = text
  for (const [key, value] of Object.entries(data)) {
    result = result.replaceAll(`{{${key}}}`, value)
  }
  return result
}

export default function EmailsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [editSubject, setEditSubject] = useState('')
  const [editBody, setEditBody] = useState('')
  const [localTemplates, setLocalTemplates] = useState(templates)

  const selected = localTemplates.find(t => t.id === selectedId) ?? null

  const handleSelect = (t: Template) => {
    setSelectedId(t.id)
    setEditSubject(t.subject)
    setEditBody(t.body)
    setIsEditing(false)
    setIsPreview(false)
    setCopied(false)
    setSent(false)
  }

  const handleSave = () => {
    if (!selected) return
    setLocalTemplates(prev =>
      prev.map(t =>
        t.id === selected.id ? { ...t, subject: editSubject, body: editBody } : t
      )
    )
    setIsEditing(false)
  }

  const handleCopy = async () => {
    if (!selected) return
    const text = isPreview
      ? `제목: ${fillVariables(editSubject, sampleData)}\n\n${fillVariables(editBody, sampleData)}`
      : `제목: ${editSubject}\n\n${editBody}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 복사 실패 시 무시
    }
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[26px] font-bold text-foreground">이메일 템플릿</h1>
          <p className="text-[14px] text-muted mt-1">채용 단계별 이메일 템플릿 {localTemplates.length}개</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* 왼쪽: 템플릿 목록 */}
        <div className="w-[320px] shrink-0 space-y-3">
          {localTemplates.map(t => {
            const isActive = selectedId === t.id
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-soft'
                    : 'border-border bg-card hover:border-primary/30 shadow-soft'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: t.categoryColor + '18' }}
                  >
                    <Mail size={16} style={{ color: t.categoryColor }} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-foreground">{t.name}</span>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: t.categoryColor + '18',
                          color: t.categoryColor,
                        }}
                      >
                        {t.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted truncate">{t.subject}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {t.variables.map(v => (
                        <span
                          key={v}
                          className="text-[10px] bg-background text-muted px-1.5 py-0.5 rounded"
                        >
                          {`{{${v}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* 오른쪽: 템플릿 상세/편집 */}
        <div className="flex-1 min-w-0">
          {!selected ? (
            <div className="bg-card rounded-2xl border border-border shadow-soft p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-primary" />
              </div>
              <p className="text-[15px] font-semibold text-foreground mb-1">템플릿을 선택해 주세요</p>
              <p className="text-[13px] text-muted">왼쪽 목록에서 이메일 템플릿을 클릭하면<br />미리보기와 편집이 가능합니다.</p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              {/* 상단 도구 바 */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: selected.categoryColor + '18' }}
                  >
                    <Mail size={14} style={{ color: selected.categoryColor }} />
                  </div>
                  <span className="text-[15px] font-bold text-foreground">{selected.name}</span>
                  <span
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: selected.categoryColor + '18',
                      color: selected.categoryColor,
                    }}
                  >
                    {selected.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* 미리보기 토글 */}
                  <button
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all ${
                      isPreview
                        ? 'bg-primary text-white'
                        : 'bg-background border border-border text-muted hover:text-foreground'
                    }`}
                  >
                    <Eye size={14} />
                    {isPreview ? '미리보기 ON' : '미리보기'}
                  </button>
                  {/* 편집 토글 */}
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold bg-background border border-border text-muted hover:text-foreground transition-all"
                    >
                      <Edit3 size={14} />
                      편집
                    </button>
                  ) : (
                    <div className="flex gap-1.5">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold bg-primary text-white transition-all"
                      >
                        <Check size={14} />
                        저장
                      </button>
                      <button
                        onClick={() => {
                          setEditSubject(selected.subject)
                          setEditBody(selected.body)
                          setIsEditing(false)
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold bg-background border border-border text-muted hover:text-foreground transition-all"
                      >
                        <X size={14} />
                        취소
                      </button>
                    </div>
                  )}
                  {/* 복사 */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold bg-background border border-border text-muted hover:text-foreground transition-all"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copied ? '복사됨' : '복사'}
                  </button>
                  {/* 발송 시뮬레이션 */}
                  <button
                    onClick={handleSend}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold bg-gradient-to-r from-primary to-[#6366f1] text-white shadow-soft hover:opacity-90 transition-all"
                  >
                    <Send size={14} />
                    발송
                  </button>
                </div>
              </div>

              {/* 변수 미리보기 안내 */}
              {isPreview && (
                <div className="px-6 py-3 bg-primary/5 border-b border-primary/10">
                  <p className="text-[12px] text-primary font-medium">
                    미리보기 모드 — 변수에 샘플 데이터가 자동으로 채워집니다
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selected.variables.map(v => (
                      <span key={v} className="text-[11px] bg-white rounded-lg px-2 py-1 border border-primary/10">
                        <span className="text-primary font-semibold">{`{{${v}}}`}</span>
                        <span className="text-muted mx-1">→</span>
                        <span className="text-foreground">{sampleData[v] ?? '—'}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 제목 */}
              <div className="px-6 pt-5 pb-3 border-b border-border">
                <label className="text-[11px] text-muted font-semibold uppercase tracking-wide mb-1.5 block">
                  제목
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editSubject}
                    onChange={e => setEditSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
                  />
                ) : (
                  <p className="text-[14px] font-semibold text-foreground">
                    {isPreview ? fillVariables(editSubject, sampleData) : editSubject}
                  </p>
                )}
              </div>

              {/* 본문 */}
              <div className="px-6 py-5">
                <label className="text-[11px] text-muted font-semibold uppercase tracking-wide mb-1.5 block">
                  본문
                </label>
                {isEditing ? (
                  <textarea
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    rows={16}
                    className="w-full px-4 py-3 rounded-xl border border-border text-[13px] text-foreground leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background resize-none"
                  />
                ) : (
                  <div className="bg-background rounded-xl p-5 border border-border">
                    <pre className="text-[13px] text-foreground leading-relaxed whitespace-pre-wrap font-sans">
                      {isPreview ? fillVariables(editBody, sampleData) : editBody}
                    </pre>
                  </div>
                )}
              </div>

              {/* 하단: 사용 변수 목록 */}
              <div className="px-6 py-4 border-t border-border bg-background/50">
                <p className="text-[11px] text-muted font-semibold mb-2">사용 변수</p>
                <div className="flex flex-wrap gap-2">
                  {selected.variables.map(v => (
                    <span
                      key={v}
                      className="text-[11px] bg-card border border-border text-muted px-2.5 py-1 rounded-lg font-mono"
                    >
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 발송 완료 토스트 */}
      {sent && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2.5 bg-foreground text-white px-5 py-3 rounded-2xl shadow-lg">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold">발송 완료</span>
            <span className="text-[12px] text-white/60">이메일이 성공적으로 발송되었습니다</span>
          </div>
        </div>
      )}
    </div>
  )
}
