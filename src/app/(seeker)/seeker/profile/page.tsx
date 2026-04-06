'use client'

import { useState } from 'react'
import {
  Camera, Edit3, Mail, Phone, Calendar, Banknote, Building2,
  Briefcase, GraduationCap, Award, Star, ChevronRight,
  MapPin, Globe, CheckCircle2, AlertCircle
} from 'lucide-react'

/* ── 스킬 레벨 색상 (skillLevelConfig 패턴) ── */
const skillLevelConfig = {
  expert: { bg: 'bg-[#d1fae5]', text: 'text-[#059669]', label: '전문가', dot: 'bg-[#059669]' },
  advanced: { bg: 'bg-[#cffafe]', text: 'text-[#0891b2]', label: '상급', dot: 'bg-[#0891b2]' },
  intermediate: { bg: 'bg-[#eef2ff]', text: 'text-[#6366f1]', label: '중급', dot: 'bg-[#6366f1]' },
  beginner: { bg: 'bg-[#f2f4f6]', text: 'text-[#6b7280]', label: '초급', dot: 'bg-[#6b7280]' },
}

/* ── 기본 정보 ── */
const basicInfo = {
  name: '김지원',
  targetRole: '프론트엔드 개발자',
  intro: '사용자 경험을 최우선으로 생각하는 3년차 프론트엔드 개발자입니다',
  email: 'jiwon.kim@email.com',
  phone: '010-1234-5678',
  birthYear: '1996',
  desiredSalary: '5,500 ~ 7,000만원',
  workPreference: '하이브리드',
  location: '서울특별시',
}

/* ── 경력 사항 ── */
const experiences = [
  {
    company: '스타트업허브',
    role: '프론트엔드 개발자',
    period: '2024.03 ~ 현재',
    isCurrent: true,
    achievements: [
      'React + TypeScript 기반 B2B SaaS 대시보드 개발 (MAU 5만)',
      '페이지 로딩 속도 40% 개선 (Lighthouse 점수 52 → 89)',
      '디자인 시스템 구축 및 Storybook 문서화 (컴포넌트 40개+)',
    ],
  },
  {
    company: '디지털크리에이티브',
    role: '주니어 프론트엔드 개발자',
    period: '2022.07 ~ 2024.02',
    isCurrent: false,
    achievements: [
      '기업 홈페이지 및 이커머스 프론트엔드 구축 (5개 프로젝트)',
      'Vue.js → React 마이그레이션 프로젝트 참여',
      'API 연동 및 상태관리(Zustand) 도입으로 코드 복잡도 30% 감소',
    ],
  },
]

/* ── 학력 ── */
const education = {
  university: '한양대학교',
  major: '컴퓨터공학과',
  degree: '학사',
  gpa: '3.8 / 4.5',
  period: '2015.03 ~ 2022.02',
}

/* ── 스킬 ── */
const skills = [
  { name: 'React', level: 'expert' },
  { name: 'TypeScript', level: 'expert' },
  { name: 'Next.js', level: 'advanced' },
  { name: 'Tailwind CSS', level: 'advanced' },
  { name: 'Zustand', level: 'advanced' },
  { name: 'Storybook', level: 'intermediate' },
  { name: 'Node.js', level: 'intermediate' },
  { name: 'Figma', level: 'intermediate' },
  { name: 'Docker', level: 'beginner' },
  { name: 'AWS', level: 'beginner' },
]

/* ── 자격증 ── */
const certifications = [
  { name: '정보처리기사', issuer: '한국산업인력공단', date: '2021.11', icon: '🏅' },
  { name: 'SQLD', issuer: '한국데이터산업진흥원', date: '2021.06', icon: '🎖️' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2023.03', icon: '☁️' },
  { name: 'TOEIC 905', issuer: 'ETS', date: '2022.01', icon: '🌐' },
  { name: 'OPIC IH', issuer: 'ACTFL', date: '2022.05', icon: '🗣️' },
]

/* ── 자기소개 ── */
const defaultSelfIntro = '안녕하세요, 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자 김지원입니다.\n\n스타트업과 에이전시에서 다양한 프로젝트를 경험하며, React와 TypeScript를 중심으로 견고하고 유지보수하기 쉬운 코드를 작성하는 데 집중해왔습니다. 특히 디자인 시스템을 구축하고 Storybook으로 문서화하는 과정에서, 개발 효율과 디자인 일관성을 동시에 높이는 경험을 했습니다.\n\n페이지 로딩 속도를 40% 개선한 경험을 통해, 성능 최적화에 대한 깊은 이해를 갖추고 있습니다. 앞으로도 기술적 성장과 함께, 팀과 사용자 모두에게 가치를 전달하는 개발자가 되고 싶습니다.'

/* ── 프로필 완성도 계산 ── */
const completenessItems = [
  { label: '기본 정보', done: true },
  { label: '경력 사항', done: true },
  { label: '학력', done: true },
  { label: '스킬', done: true },
  { label: '자격증', done: true },
  { label: '자기소개', done: true },
  { label: '프로필 사진', done: false },
  { label: '포트폴리오 링크', done: false },
]
const completeness = Math.round((completenessItems.filter(i => i.done).length / completenessItems.length) * 100)

export default function SeekerProfilePage() {
  const [selfIntro, setSelfIntro] = useState(defaultSelfIntro)
  const [isEditingIntro, setIsEditingIntro] = useState(false)

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-[26px] font-bold text-foreground">내 프로필</h1>
        <p className="text-[14px] text-muted mt-1">이력서와 프로필 정보를 관리하세요</p>
      </div>

      {/* 프로필 완성도 바 */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-soft mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[#f59e0b]" />
            <p className="text-[14px] font-bold text-foreground">프로필 완성도 {completeness}%</p>
          </div>
          <span className="text-[12px] text-muted">완성도를 높이면 추천 정확도가 올라갑니다</span>
        </div>
        <div className="w-full h-2.5 bg-[#f2f4f6] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-full transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {completenessItems.filter(i => !i.done).map((item) => (
            <span key={item.label} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center gap-1">
              <AlertCircle size={10} /> {item.label} 추가하기
            </span>
          ))}
        </div>
      </div>

      {/* 프로필 헤더 카드 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center gap-5">
          {/* 프로필 사진 */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center text-white text-[28px] font-bold">
              {basicInfo.name[0]}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border border-border shadow-soft flex items-center justify-center">
              <Camera size={12} className="text-muted" />
            </button>
          </div>
          {/* 기본 정보 */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] font-bold text-foreground">{basicInfo.name}</h2>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#d1fae5] text-[#059669]">
                {basicInfo.targetRole}
              </span>
            </div>
            <p className="text-[13px] text-muted mt-1">{basicInfo.intro}</p>
          </div>
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#10b981] hover:underline px-4 py-2 rounded-xl border border-[#10b981]/20 hover:bg-[#d1fae5]/50 transition-colors">
            <Edit3 size={14} /> 수정
          </button>
        </div>
      </div>

      {/* 기본 정보 카드 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <h3 className="text-[15px] font-bold text-foreground mb-4">기본 정보</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Mail, label: '이메일', value: basicInfo.email },
            { icon: Phone, label: '연락처', value: basicInfo.phone },
            { icon: Calendar, label: '출생연도', value: basicInfo.birthYear + '년' },
            { icon: Banknote, label: '희망 연봉', value: basicInfo.desiredSalary },
            { icon: Building2, label: '근무 형태', value: basicInfo.workPreference },
            { icon: MapPin, label: '거주 지역', value: basicInfo.location },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-card-hover">
                <div className="w-8 h-8 rounded-lg bg-[#d1fae5] flex items-center justify-center">
                  <Icon size={14} className="text-[#059669]" />
                </div>
                <div>
                  <p className="text-[11px] text-muted">{item.label}</p>
                  <p className="text-[13px] font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 경력 사항 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
            <Briefcase size={16} className="text-[#10b981]" /> 경력 사항
          </h3>
          <button className="text-[12px] text-[#10b981] font-medium hover:underline flex items-center gap-1">
            추가 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div key={i} className="rounded-xl bg-card-hover p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold text-foreground">{exp.company}</p>
                    {exp.isCurrent && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#d1fae5] text-[#059669]">재직중</span>
                    )}
                  </div>
                  <p className="text-[13px] text-muted mt-0.5">{exp.role} · {exp.period}</p>
                </div>
                <button className="text-muted hover:text-foreground">
                  <Edit3 size={13} />
                </button>
              </div>
              <ul className="mt-3 space-y-1.5">
                {exp.achievements.map((ach, j) => (
                  <li key={j} className="text-[12px] text-muted flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-[#10b981] mt-0.5 flex-shrink-0" />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 학력 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 mb-4">
          <GraduationCap size={16} className="text-[#06b6d4]" /> 학력
        </h3>
        <div className="rounded-xl bg-card-hover p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[14px] font-bold text-foreground">{education.university}</p>
              <p className="text-[13px] text-muted mt-0.5">{education.major} · {education.degree}</p>
              <div className="flex items-center gap-3 mt-2 text-[12px] text-muted">
                <span className="flex items-center gap-1"><Calendar size={11} /> {education.period}</span>
                <span className="flex items-center gap-1"><Star size={11} className="text-[#f59e0b]" /> GPA {education.gpa}</span>
              </div>
            </div>
            <button className="text-muted hover:text-foreground">
              <Edit3 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 스킬 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2 mb-4">
          <Globe size={16} className="text-[#8b5cf6]" /> 보유 스킬
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const config = skillLevelConfig[skill.level as keyof typeof skillLevelConfig]
            return (
              <span key={skill.name} className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${config.bg} ${config.text}`}>
                {skill.name}
              </span>
            )
          })}
        </div>
        {/* 레벨 범례 */}
        <div className="flex gap-4 mt-5 pt-4 border-t border-border/60">
          {Object.entries(skillLevelConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
              <span className="text-[10px] text-muted">{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 자격증 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
            <Award size={16} className="text-[#f59e0b]" /> 자격증
          </h3>
          <button className="text-[12px] text-[#10b981] font-medium hover:underline flex items-center gap-1">
            추가 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {certifications.map((cert, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl bg-card-hover">
              <div className="flex items-center gap-3">
                <span className="text-[18px]">{cert.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{cert.name}</p>
                  <p className="text-[11px] text-muted">{cert.issuer}</p>
                </div>
              </div>
              <span className="text-[11px] text-muted font-medium">{cert.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 자기소개 */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-foreground">자기소개</h3>
          <button
            onClick={() => setIsEditingIntro(!isEditingIntro)}
            className="text-[12px] text-[#10b981] font-medium hover:underline flex items-center gap-1"
          >
            <Edit3 size={12} /> {isEditingIntro ? '완료' : '수정'}
          </button>
        </div>
        {isEditingIntro ? (
          <div>
            <textarea
              value={selfIntro}
              onChange={(e) => {
                if (e.target.value.length <= 500) setSelfIntro(e.target.value)
              }}
              className="w-full h-40 p-4 rounded-xl bg-card-hover border border-border text-[13px] text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 focus:border-[#10b981]"
              placeholder="자기소개를 입력하세요 (최대 500자)"
            />
            <p className="text-[11px] text-muted text-right mt-1.5">
              <span className={selfIntro.length >= 480 ? 'text-[#dc2626] font-semibold' : ''}>{selfIntro.length}</span> / 500자
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-card-hover p-4">
            <p className="text-[13px] text-muted leading-relaxed whitespace-pre-line">{selfIntro}</p>
            <p className="text-[11px] text-muted text-right mt-2">{selfIntro.length} / 500자</p>
          </div>
        )}
      </div>
    </div>
  )
}
