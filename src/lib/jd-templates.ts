export interface JDTemplate {
  id: string
  title: string
  department: string
  company: string
  description: string
  tasks: string
  qualifications: string
  preferred: string
  benefits: string
}

export const JD_DEPARTMENTS = ['개발', '영업', 'HR', '품질', '마케팅'] as const

export const jdTemplates: JDTemplate[] = [
  // 개발
  {
    id: 'dev-1',
    title: '시니어 백엔드 개발자',
    department: '개발',
    company: '테크스타트업 A사',
    description: '대규모 트래픽을 처리하는 백엔드 시스템을 설계하고 운영합니다.',
    tasks: '- MSA 기반 백엔드 서비스 설계 및 개발\n- 대용량 데이터 처리 파이프라인 구축\n- API 설계 및 문서화\n- 코드 리뷰 및 주니어 멘토링',
    qualifications: '- 백엔드 개발 경력 5년 이상\n- Java/Kotlin 또는 Node.js/TypeScript 숙련\n- RDBMS 및 NoSQL 실무 경험\n- Docker/Kubernetes 경험',
    preferred: '- MSA 전환 경험\n- 대규모 트래픽 처리 경험\n- 오픈소스 기여 경험',
    benefits: '- 유연근무제 (코어타임 11-15시)\n- 최신 장비 지급\n- 교육비 연 200만원\n- 스톡옵션',
  },
  {
    id: 'dev-2',
    title: '프론트엔드 개발자',
    department: '개발',
    company: 'SaaS 기업 B사',
    description: 'B2B SaaS 제품의 프론트엔드를 개발합니다.',
    tasks: '- React/Next.js 기반 웹 애플리케이션 개발\n- 디자인 시스템 구축 및 컴포넌트 개발\n- 성능 최적화 및 접근성 개선\n- UX 개선을 위한 A/B 테스트',
    qualifications: '- 프론트엔드 개발 경력 3년 이상\n- React/TypeScript 숙련\n- HTML/CSS 시멘틱 마크업\n- REST API 연동 경험',
    preferred: '- Next.js App Router 경험\n- 디자인 시스템 구축 경험\n- Storybook 활용 경험',
    benefits: '- 원격근무 주 2회\n- 점심 식대 지원\n- 건강검진 지원',
  },
  {
    id: 'dev-3',
    title: '데이터 엔지니어',
    department: '개발',
    company: '데이터 플랫폼 C사',
    description: '데이터 파이프라인을 설계하고 데이터 인프라를 운영합니다.',
    tasks: '- ETL/ELT 파이프라인 설계 및 운영\n- 데이터 웨어하우스 구축\n- 실시간 데이터 처리 시스템 개발\n- 데이터 품질 모니터링',
    qualifications: '- 데이터 엔지니어링 경력 3년 이상\n- Python/SQL 숙련\n- Airflow, Spark 경험\n- AWS/GCP 데이터 서비스 경험',
    preferred: '- 실시간 스트리밍 처리 경험\n- dbt 활용 경험\n- 데이터 거버넌스 경험',
    benefits: '- 유연근무제\n- 클라우드 자격증 지원\n- 컨퍼런스 참가비 지원',
  },
  // 영업
  {
    id: 'sales-1',
    title: 'B2B 영업 매니저',
    department: '영업',
    company: 'SaaS 기업 D사',
    description: '엔터프라이즈 고객을 대상으로 SaaS 솔루션을 영업합니다.',
    tasks: '- 신규 고객 발굴 및 영업 파이프라인 관리\n- 제품 데모 및 제안서 작성\n- 계약 협상 및 클로징\n- 기존 고객 업셀/크로스셀',
    qualifications: '- B2B 영업 경력 5년 이상\n- IT/SaaS 솔루션 영업 경험\n- 뛰어난 커뮤니케이션 스킬\n- CRM 도구 활용 능력',
    preferred: '- 엔터프라이즈 영업 경험\n- 연 매출 10억 이상 달성 경험\n- 영어 비즈니스 커뮤니케이션',
    benefits: '- 성과 인센티브 (무제한)\n- 법인카드 지급\n- 자기개발비 지원',
  },
  {
    id: 'sales-2',
    title: '고객 성공 매니저 (CSM)',
    department: '영업',
    company: 'HR테크 E사',
    description: '기존 고객의 성공적인 제품 활용을 지원하고 리텐션을 관리합니다.',
    tasks: '- 고객 온보딩 프로세스 관리\n- 정기 비즈니스 리뷰 진행\n- 고객 이슈 해결 및 에스컬레이션\n- 이탈 방지 및 리뉴얼 관리',
    qualifications: '- CS/CSM 경력 3년 이상\n- SaaS 비즈니스 이해\n- 데이터 분석 능력\n- 프레젠테이션 스킬',
    preferred: '- NPS/CSAT 관리 경험\n- Gainsight 등 CS 도구 경험',
    benefits: '- 유연근무제\n- 교육비 지원\n- 건강검진',
  },
  // HR
  {
    id: 'hr-1',
    title: 'HRBP (HR Business Partner)',
    department: 'HR',
    company: '테크기업 F사',
    description: '사업부와 파트너십을 구축하여 전략적 HR 솔루션을 제공합니다.',
    tasks: '- 사업부 HR 이슈 진단 및 솔루션 제안\n- 조직 설계 및 인력 계획\n- 성과 관리 프로세스 운영\n- 리더십 코칭 및 팀 빌딩',
    qualifications: '- HR 경력 7년 이상\n- HRBP 또는 HRM 경험 3년 이상\n- 노동법 기본 지식\n- 조직 진단 및 설계 역량',
    preferred: '- IT/테크 업종 HR 경험\n- HR 관련 자격증 보유\n- 영어 커뮤니케이션 가능',
    benefits: '- 유연근무제\n- 교육비 연 300만원\n- 안식휴가 제도',
  },
  // 품질
  {
    id: 'qa-1',
    title: 'QA 엔지니어',
    department: '품질',
    company: '핀테크 G사',
    description: '금융 서비스의 품질 보증 업무를 담당합니다.',
    tasks: '- 테스트 전략 수립 및 테스트 케이스 작성\n- 자동화 테스트 개발 및 운영\n- 버그 트리아지 및 리그레션 테스트\n- 품질 메트릭 모니터링 및 보고',
    qualifications: '- QA 경력 3년 이상\n- 테스트 자동화 경험 (Selenium, Cypress 등)\n- API 테스트 경험\n- SQL 기본 지식',
    preferred: '- 금융/핀테크 도메인 경험\n- 성능 테스트 경험\n- CI/CD 파이프라인 통합 경험',
    benefits: '- 유연근무제\n- 최신 장비 지급\n- 자격증 취득 지원',
  },
  {
    id: 'qa-2',
    title: '품질관리 담당자',
    department: '품질',
    company: '제조업 H사',
    description: '제조 공정의 품질 관리 및 개선 활동을 수행합니다.',
    tasks: '- 수입/공정/출하 검사 계획 및 실행\n- SPC 관리 및 공정 능력 분석\n- 부적합 원인 분석 및 시정조치\n- ISO 인증 유지 관리',
    qualifications: '- 품질관리 경력 5년 이상\n- ISO 9001 심사원 또는 관련 자격\n- 통계적 품질 관리 지식\n- 6시그마 또는 린 경험',
    preferred: '- 자동차/전자 업종 경험\n- IATF 16949 경험\n- VDA 관련 지식',
    benefits: '- 식대/교통비 지원\n- 자격증 수당\n- 성과 인센티브',
  },
  // 마케팅
  {
    id: 'mkt-1',
    title: '퍼포먼스 마케터',
    department: '마케팅',
    company: '이커머스 I사',
    description: '데이터 기반 디지털 마케팅 전략을 수립하고 실행합니다.',
    tasks: '- 유료 광고 캠페인 기획 및 운영 (Meta, Google, 네이버)\n- 광고 성과 분석 및 예산 최적화\n- A/B 테스트 설계 및 실행\n- ROAS/CAC 기반 성과 리포팅',
    qualifications: '- 퍼포먼스 마케팅 경력 3년 이상\n- GA4, Meta Ads Manager 숙련\n- 데이터 분석 능력 (SQL 우대)\n- 예산 관리 경험',
    preferred: '- 이커머스 마케팅 경험\n- 마케팅 자동화 도구 경험\n- 크리에이티브 기획 능력',
    benefits: '- 유연근무제\n- 마케팅 컨퍼런스 지원\n- 성과 인센티브',
  },
  {
    id: 'mkt-2',
    title: '콘텐츠 마케터',
    department: '마케팅',
    company: 'B2B SaaS J사',
    description: 'B2B 리드 제너레이션을 위한 콘텐츠 전략을 수립합니다.',
    tasks: '- 블로그, 백서, 케이스스터디 기획 및 작성\n- SEO 전략 수립 및 실행\n- 뉴스레터/이메일 마케팅 운영\n- 콘텐츠 퍼널 성과 분석',
    qualifications: '- 콘텐츠 마케팅 경력 3년 이상\n- B2B 마케팅 경험\n- 뛰어난 글쓰기 능력\n- CMS/MAT 도구 활용',
    preferred: '- IT/SaaS 도메인 지식\n- 영어 콘텐츠 작성 가능\n- 동영상 콘텐츠 제작 경험',
    benefits: '- 원격근무\n- 도서 구입비 무제한\n- 자기개발비 지원',
  },
  {
    id: 'mkt-3',
    title: '브랜드 마케터',
    department: '마케팅',
    company: '소비재 K사',
    description: '브랜드 전략 수립 및 브랜드 캠페인을 기획합니다.',
    tasks: '- 브랜드 전략 수립 및 가이드라인 관리\n- ATL/BTL 캠페인 기획 및 실행\n- 브랜드 인지도/선호도 조사\n- 외부 에이전시 관리',
    qualifications: '- 브랜드 마케팅 경력 5년 이상\n- 캠페인 기획 및 실행 경험\n- 소비자 인사이트 분석 능력\n- 프레젠테이션 스킬',
    preferred: '- FMCG/뷰티 업종 경험\n- 글로벌 캠페인 경험\n- 영어 비즈니스 커뮤니케이션',
    benefits: '- 유연근무제\n- 자사 제품 할인\n- 해외 연수 기회',
  },
]
