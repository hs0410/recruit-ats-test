export interface SkillTag {
  name: string
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner'
}

export interface RadarStat {
  label: string
  value: number // 0-100
}

export interface ResumeAnalysis {
  name: string
  currentCompany: string
  currentRole: string
  yearsOfExperience: number
  education: string
  summary: string
  skills: SkillTag[]
  radar: RadarStat[]
  strengths: string[]
  weaknesses: string[]
  aiComment: string
}

export const mockAnalysisResults: Record<string, ResumeAnalysis> = {
  backend: {
    name: '김현수',
    currentCompany: '네이버 클라우드',
    currentRole: '백엔드 개발자',
    yearsOfExperience: 3,
    education: '한양대학교 컴퓨터공학과 학사',
    summary: 'Java/Spring 기반 백엔드 개발자로 3년간 대규모 트래픽 처리 경험 보유. MSA 전환 프로젝트 리드 경험.',
    skills: [
      { name: 'Java', level: 'expert' },
      { name: 'Spring Boot', level: 'expert' },
      { name: 'MySQL', level: 'advanced' },
      { name: 'Redis', level: 'advanced' },
      { name: 'Docker', level: 'intermediate' },
      { name: 'Kubernetes', level: 'intermediate' },
      { name: 'AWS', level: 'advanced' },
      { name: 'Kafka', level: 'intermediate' },
      { name: 'TypeScript', level: 'beginner' },
    ],
    radar: [
      { label: '기술력', value: 82 },
      { label: '경력', value: 60 },
      { label: '리더십', value: 55 },
      { label: '커뮤니케이션', value: 70 },
      { label: '문화적합도', value: 75 },
      { label: '성장가능성', value: 88 },
    ],
    strengths: [
      'Spring 생태계에 대한 깊은 이해와 실무 경험',
      'MSA 전환 프로젝트 리드 경험 — 설계+실행 모두 가능',
      'AWS 인프라 운영 경험으로 DevOps 역량 보유',
      '오픈소스 기여 이력 (Spring Cloud 관련)',
    ],
    weaknesses: [
      '프론트엔드 경험이 거의 없어 풀스택 역할 어려움',
      '매니지먼트 경험 부족 (3년차)',
      'NoSQL(MongoDB 등) 경험이 제한적',
    ],
    aiComment: '3년차 백엔드 개발자로, Spring 기반의 탄탄한 기술력을 보유하고 있습니다. 특히 MSA 전환 프로젝트를 리드한 경험은 시니어급에 가까운 역량입니다. AWS 인프라 운영 경험도 있어 DevOps적 사고가 가능합니다. 다만 경력 대비 리더십 경험을 더 쌓을 필요가 있으며, 기술 스택 다양성(NoSQL, 프론트엔드)을 넓히면 더욱 경쟁력 있는 인재가 될 것입니다.',
  },
  frontend: {
    name: '박서준',
    currentCompany: '토스',
    currentRole: '프론트엔드 개발자',
    yearsOfExperience: 4,
    education: '서울대학교 산업공학과 학사',
    summary: 'React/Next.js 기반 프론트엔드 개발자. 디자인 시스템 구축 및 성능 최적화 전문.',
    skills: [
      { name: 'React', level: 'expert' },
      { name: 'Next.js', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Storybook', level: 'advanced' },
      { name: 'GraphQL', level: 'intermediate' },
      { name: 'Node.js', level: 'intermediate' },
      { name: 'Figma', level: 'advanced' },
    ],
    radar: [
      { label: '기술력', value: 90 },
      { label: '경력', value: 70 },
      { label: '리더십', value: 65 },
      { label: '커뮤니케이션', value: 80 },
      { label: '문화적합도', value: 85 },
      { label: '성장가능성', value: 82 },
    ],
    strengths: [
      'React/Next.js 생태계 최상위 숙련도',
      '디자인 시스템을 0→1로 구축한 경험',
      'Core Web Vitals 60% 개선 성과',
      '디자이너와의 협업 능력 우수 (Figma 능숙)',
    ],
    weaknesses: [
      '백엔드/인프라 경험 부족',
      '대규모 팀 리드 경험 없음',
    ],
    aiComment: '4년차 프론트엔드 개발자로 React/Next.js 분야에서 최상위 역량을 보유하고 있습니다. 토스에서의 디자인 시스템 구축 경험은 시니어 레벨의 역량입니다. 성능 최적화에 대한 정량적 성과(CWV 60% 개선)가 인상적이며, 디자이너와의 협업 능력도 뛰어납니다. 풀스택으로의 확장 가능성을 보려면 백엔드 경험이 더 필요합니다.',
  },
  pm: {
    name: '한소희',
    currentCompany: '카카오',
    currentRole: 'Product Manager',
    yearsOfExperience: 6,
    education: '연세대학교 경영학과 석사',
    summary: 'B2C/B2B SaaS 제품의 PM으로 6년간 활동. 데이터 기반 의사결정과 사용자 리서치 전문.',
    skills: [
      { name: 'Product Strategy', level: 'expert' },
      { name: 'SQL', level: 'advanced' },
      { name: 'Figma', level: 'intermediate' },
      { name: 'GA4', level: 'advanced' },
      { name: 'Amplitude', level: 'expert' },
      { name: 'Jira', level: 'expert' },
      { name: 'User Research', level: 'expert' },
      { name: 'A/B Testing', level: 'advanced' },
    ],
    radar: [
      { label: '기술력', value: 65 },
      { label: '경력', value: 85 },
      { label: '리더십', value: 80 },
      { label: '커뮤니케이션', value: 92 },
      { label: '문화적합도', value: 78 },
      { label: '성장가능성', value: 75 },
    ],
    strengths: [
      'B2C/B2B 양쪽 PM 경험으로 폭넓은 시야',
      'Amplitude 기반 데이터 분석 + A/B 테스트 설계 전문',
      'MAU 200% 성장시킨 정량적 성과',
      '사용자 리서치를 직접 설계하고 실행하는 실행력',
    ],
    weaknesses: [
      '기술적 깊이가 상대적으로 부족 (SQL 수준)',
      '0→1 제품 론칭 경험은 1회로 제한적',
    ],
    aiComment: '6년차 PM으로 데이터 기반 의사결정에 강점을 가진 인재입니다. 특히 Amplitude를 활용한 분석과 A/B 테스트 역량이 돋보이며, MAU 200% 성장이라는 정량적 성과가 인상적입니다. 커뮤니케이션 역량이 매우 높아 크로스펑셔널 협업에 강점이 있습니다. 다만 0→1 경험이 제한적이므로, 신규 제품 론칭 기회가 필요합니다.',
  },
}

// 스킬 레벨 색상
export const skillLevelConfig = {
  expert: { bg: 'bg-primary-light', text: 'text-primary', label: 'Expert' },
  advanced: { bg: 'bg-[#eef2ff]', text: 'text-[#6366f1]', label: 'Advanced' },
  intermediate: { bg: 'bg-success-light', text: 'text-success', label: 'Intermediate' },
  beginner: { bg: 'bg-[#f2f4f6]', text: 'text-muted', label: 'Beginner' },
}
