export interface Article {
  id: string
  title: string
  summary: string
  source: string
  date: string
  tag: 'trend' | 'legal' | 'strategy' | 'ai'
  url: string
}

export interface HiringTip {
  id: string
  tip: string
  category: string
}

export const articles: Article[] = [
  {
    id: 'a1',
    title: '2026년 채용 시장 전망: 인재 확보 전략의 전환',
    summary: '경기 불확실성 속에서도 핵심 인재 확보 경쟁은 심화되고 있습니다. 기업들은 채용 브랜딩과 후보자 경험에 더 많은 투자를 하고 있습니다.',
    source: 'HR Insight',
    date: '2026-03-28',
    tag: 'trend',
    url: '#',
  },
  {
    id: 'a2',
    title: '채용절차법 2025 개정안: 불합격 사유 고지 의무화',
    summary: '2025년 개정된 채용절차법에 따라 불합격 사유를 요청 시 서면으로 고지해야 합니다. HR 담당자가 준비해야 할 사항을 정리합니다.',
    source: '법률신문',
    date: '2026-03-20',
    tag: 'legal',
    url: '#',
  },
  {
    id: 'a3',
    title: 'AI 면접 도구 도입 가이드: 공정성과 효율의 균형',
    summary: 'AI 면접 도구를 도입할 때 고려해야 할 윤리적 기준과 법적 이슈, 그리고 실제 활용 사례를 분석합니다.',
    source: 'Tech HR Monthly',
    date: '2026-03-15',
    tag: 'ai',
    url: '#',
  },
  {
    id: 'a4',
    title: '채용 리드타임 단축: 최적의 프로세스 설계',
    summary: '평균 42일의 채용 리드타임을 25일로 줄인 기업들의 공통점. 프로세스 병목을 찾고 제거하는 실전 가이드.',
    source: 'Recruiting Daily',
    date: '2026-03-10',
    tag: 'strategy',
    url: '#',
  },
  {
    id: 'a5',
    title: '구조화 면접 도입 후 1년: 채용 품질 데이터 분석',
    summary: '구조화 면접을 도입한 100개 기업의 1년 후 데이터를 분석. 이직률 감소와 온보딩 성과 향상의 상관관계.',
    source: 'People Analytics Weekly',
    date: '2026-03-05',
    tag: 'strategy',
    url: '#',
  },
  {
    id: 'a6',
    title: 'MZ세대 채용: 변화하는 후보자 기대와 대응',
    summary: '급여보다 성장 기회, 사무실보다 유연근무를 중시하는 MZ세대 후보자를 유치하기 위한 채용 전략.',
    source: 'HR Trend Korea',
    date: '2026-02-28',
    tag: 'trend',
    url: '#',
  },
  {
    id: 'a7',
    title: 'ChatGPT 시대의 이력서 검증: AI 생성 지원서 식별법',
    summary: 'AI로 작성된 이력서와 자기소개서를 식별하는 방법과, 이에 대응하는 채용 프로세스 재설계 방안.',
    source: 'AI & HR',
    date: '2026-02-20',
    tag: 'ai',
    url: '#',
  },
  {
    id: 'a8',
    title: '개인정보보호법 강화: 채용 과정 데이터 관리 체크리스트',
    summary: '채용 과정에서 수집하는 개인정보의 법적 관리 의무가 강화되었습니다. 실무 담당자를 위한 체크리스트.',
    source: '개인정보보호위원회',
    date: '2026-02-15',
    tag: 'legal',
    url: '#',
  },
]

export const hiringTips: HiringTip[] = [
  { id: 't1', tip: 'JD에 급여 범위를 명시하면 지원율이 30% 이상 증가합니다', category: '공고' },
  { id: 't2', tip: '면접 후 24시간 내 피드백을 제공하면 후보자 만족도가 크게 향상됩니다', category: '면접' },
  { id: 't3', tip: '구조화 면접은 비구조화 면접보다 예측 타당도가 2배 이상 높습니다', category: '면접' },
  { id: 't4', tip: '채용 브랜딩에 투자한 기업은 채용 비용이 평균 43% 절감됩니다', category: '브랜딩' },
  { id: 't5', tip: '지원서를 간소화하면 지원 완료율이 최대 365% 상승할 수 있습니다', category: '공고' },
  { id: 't6', tip: '불합격 통보 시에도 정중한 리젝션 메일이 고용 브랜드를 지킵니다', category: '커뮤니케이션' },
  { id: 't7', tip: '레퍼런스 체크는 직속 상사 + 동료 조합이 가장 효과적입니다', category: '검증' },
  { id: 't8', tip: '면접관 교육을 받은 팀의 채용 성공률이 50% 더 높습니다', category: '면접' },
  { id: 't9', tip: '채용 리드타임이 1주 늘어날 때마다 합격자 이탈률이 15% 증가합니다', category: '프로세스' },
  { id: 't10', tip: '팀 점심/커피챗을 면접 과정에 포함하면 컬처핏 평가 정확도가 높아집니다', category: '면접' },
  { id: 't11', tip: '자기소개서보다 포트폴리오/과제 전형이 직무 적합성 예측에 효과적입니다', category: '평가' },
  { id: 't12', tip: '채용 과정의 모든 단계를 기록으로 남기는 것은 법적 보호의 기본입니다', category: '법률' },
  { id: 't13', tip: '동일 포지션에 3명 이상의 후보자를 비교하면 더 나은 결정을 내릴 수 있습니다', category: '프로세스' },
  { id: 't14', tip: '면접 질문은 과거 행동(BEI) 기반이 가상 상황 질문보다 2배 유효합니다', category: '면접' },
  { id: 't15', tip: '온보딩 프로그램이 체계적인 기업은 신규 입사자 1년 이내 이직률이 58% 낮습니다', category: '온보딩' },
  { id: 't16', tip: '블라인드 채용을 도입하면 다양성이 높아지고 조직 성과도 향상됩니다', category: '공정성' },
]

export const keywords2026 = [
  'AI 리크루팅', '스킬 기반 채용', '후보자 경험(CX)', '채용 브랜딩',
  '원격 채용', 'DEI (다양성·형평성·포용성)', '채용 자동화', '피플 애널리틱스',
]

export const tagLabels: Record<string, { label: string; bg: string; text: string }> = {
  trend: { label: '트렌드', bg: 'bg-primary-light', text: 'text-primary' },
  legal: { label: '법률', bg: 'bg-danger-light', text: 'text-danger' },
  strategy: { label: '전략', bg: 'bg-success-light', text: 'text-success' },
  ai: { label: 'AI', bg: 'bg-[#f3e8ff]', text: 'text-[#8b5cf6]' },
}
