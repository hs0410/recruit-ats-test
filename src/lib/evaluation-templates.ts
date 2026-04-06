export interface EvalCriterion {
  name: string
  description: string
  weight: 'high' | 'medium'
}

export interface EvalCategory {
  category: string
  criteria: EvalCriterion[]
}

export interface EvalTemplate {
  id: string
  position: string
  categories: EvalCategory[]
}

export const evaluationTemplates: EvalTemplate[] = [
  {
    id: 'eval-backend',
    position: '시니어 백엔드 개발자',
    categories: [
      {
        category: '직무 역량',
        criteria: [
          { name: '시스템 설계 능력', description: '확장 가능한 아키텍처를 설계하고 트레이드오프를 설명할 수 있는가', weight: 'high' },
          { name: 'API 설계', description: 'RESTful/GraphQL API를 일관성 있게 설계할 수 있는가', weight: 'high' },
          { name: 'DB 설계 및 최적화', description: '적절한 데이터 모델링과 쿼리 최적화가 가능한가', weight: 'high' },
          { name: '코드 품질', description: '읽기 쉽고 유지보수 가능한 코드를 작성하는가', weight: 'medium' },
          { name: '문제 해결력', description: '기술적 문제를 체계적으로 분석하고 해결하는가', weight: 'high' },
          { name: '테스트 전략', description: '적절한 테스트 전략을 수립하고 실행하는가', weight: 'medium' },
        ],
      },
      {
        category: '조직 적합성',
        criteria: [
          { name: '협업 능력', description: '팀원, 타 부서와 효과적으로 소통하고 협업하는가', weight: 'high' },
          { name: '멘토링', description: '주니어 개발자를 성장시킬 의지와 능력이 있는가', weight: 'medium' },
          { name: '문화 적합도', description: '우리 조직의 가치와 문화에 부합하는가', weight: 'medium' },
        ],
      },
      {
        category: '성장 가능성',
        criteria: [
          { name: '학습 의지', description: '새로운 기술과 도메인을 적극적으로 학습하는가', weight: 'medium' },
          { name: '리더십', description: '기술적 리더십을 발휘할 잠재력이 있는가', weight: 'medium' },
        ],
      },
    ],
  },
  {
    id: 'eval-pm',
    position: '프로덕트 매니저',
    categories: [
      {
        category: '직무 역량',
        criteria: [
          { name: '제품 전략', description: '시장과 사용자를 분석하여 제품 방향을 설정할 수 있는가', weight: 'high' },
          { name: '우선순위 설정', description: '데이터와 프레임워크를 기반으로 우선순위를 결정하는가', weight: 'high' },
          { name: '사용자 이해', description: '사용자 리서치를 통해 깊은 인사이트를 도출하는가', weight: 'high' },
          { name: '데이터 분석', description: '제품 지표를 정의하고 데이터 기반 의사결정을 하는가', weight: 'medium' },
          { name: '기술 이해', description: '개발팀과 기술적 논의가 가능한 수준의 이해가 있는가', weight: 'medium' },
          { name: '로드맵 관리', description: '제품 로드맵을 체계적으로 관리하고 이해관계자와 정렬하는가', weight: 'high' },
        ],
      },
      {
        category: '조직 적합성',
        criteria: [
          { name: '커뮤니케이션', description: '다양한 이해관계자와 명확하게 소통하는가', weight: 'high' },
          { name: '리더십', description: '직접적 권한 없이도 팀을 이끌 수 있는가', weight: 'high' },
          { name: '갈등 해결', description: '의견 충돌을 건설적으로 해결하는가', weight: 'medium' },
        ],
      },
      {
        category: '성장 가능성',
        criteria: [
          { name: '트렌드 인식', description: '산업 트렌드와 경쟁 환경을 파악하고 있는가', weight: 'medium' },
          { name: '비전', description: '장기적 제품 비전을 그리고 설득할 수 있는가', weight: 'medium' },
        ],
      },
    ],
  },
  {
    id: 'eval-marketer',
    position: '그로스 마케터',
    categories: [
      {
        category: '직무 역량',
        criteria: [
          { name: '채널 운영', description: '다양한 마케팅 채널을 효과적으로 운영하는가', weight: 'high' },
          { name: '데이터 분석', description: '마케팅 성과를 정량적으로 분석하고 개선하는가', weight: 'high' },
          { name: 'A/B 테스트', description: '체계적인 실험 설계와 분석이 가능한가', weight: 'medium' },
          { name: '예산 최적화', description: 'ROAS/CAC를 기반으로 예산을 효율적으로 배분하는가', weight: 'high' },
          { name: '콘텐츠 기획', description: '타겟에 맞는 마케팅 콘텐츠를 기획하는가', weight: 'medium' },
        ],
      },
      {
        category: '조직 적합성',
        criteria: [
          { name: '크로스펑셔널 협업', description: '제품, 디자인, 개발팀과 효과적으로 협업하는가', weight: 'medium' },
          { name: '실행력', description: '빠르게 실행하고 결과로부터 학습하는가', weight: 'high' },
        ],
      },
      {
        category: '성장 가능성',
        criteria: [
          { name: '트렌드 민감도', description: '새로운 마케팅 트렌드와 도구를 빠르게 습득하는가', weight: 'medium' },
          { name: '전략적 사고', description: '전술적 실행을 넘어 전략적 관점을 가지고 있는가', weight: 'medium' },
        ],
      },
    ],
  },
]
