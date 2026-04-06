/* ── 5·3·1점 역량 기준표 시스템 ── */

export type ScoreValue = 5 | 3 | 1

export interface RubricLevel {
  score: ScoreValue
  label: string
  description: string
}

export interface EvalCriterion {
  name: string
  description: string
  weight: 'high' | 'medium'
  rubric: RubricLevel[]
}

export interface EvalCategory {
  category: string
  criteria: EvalCriterion[]
}

export interface EvalDimension {
  dimension: '직무전문기술' | '멀티역량'
  weight: number // 0.6 or 0.4
  categories: EvalCategory[]
}

export interface EvalTemplate {
  id: string
  position: string
  dimensions: EvalDimension[]
}

/* ── 판정 기준 ── */
export const verdictConfig = [
  { min: 4.5, label: '강력 추천', color: 'text-primary', bg: 'bg-primary-light', emoji: '🟦' },
  { min: 3.5, label: '추천', color: 'text-emerald-600', bg: 'bg-emerald-50', emoji: '🟩' },
  { min: 2.5, label: '보류', color: 'text-amber-600', bg: 'bg-amber-50', emoji: '🟨' },
  { min: 0, label: '비추천', color: 'text-red-600', bg: 'bg-red-50', emoji: '🟥' },
]

export function getVerdict(avg: number) {
  return verdictConfig.find(v => avg >= v.min) || verdictConfig[verdictConfig.length - 1]
}

/* ── 평가 템플릿 ── */
export const evaluationTemplates: EvalTemplate[] = [
  {
    id: 'eval-backend',
    position: '시니어 백엔드 개발자',
    dimensions: [
      {
        dimension: '직무전문기술',
        weight: 0.6,
        categories: [
          {
            category: '기술 설계',
            criteria: [
              {
                name: '시스템 설계 능력', description: '확장 가능한 아키텍처를 설계하고 트레이드오프를 설명할 수 있는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '복잡한 대규모 시스템 아키텍처를 독립적으로 설계하고 트레이드오프를 명확히 설명' },
                  { score: 3, label: '보통', description: '기본적인 시스템 설계가 가능하나, 복잡한 시나리오에서 가이드 필요' },
                  { score: 1, label: '미흡', description: '시스템 설계 경험이 거의 없거나 기초 개념 이해 부족' },
                ],
              },
              {
                name: 'API 설계', description: 'RESTful/GraphQL API를 일관성 있게 설계할 수 있는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '일관된 네이밍, 버전 관리, 에러 핸들링을 포함한 완성도 높은 API 설계 가능' },
                  { score: 3, label: '보통', description: '기본적인 CRUD API 설계 가능하나 일관성이 부족한 부분 있음' },
                  { score: 1, label: '미흡', description: 'API 설계 원칙에 대한 이해가 부족' },
                ],
              },
              {
                name: 'DB 설계 및 최적화', description: '적절한 데이터 모델링과 쿼리 최적화가 가능한가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '정규화/비정규화 판단, 인덱스 전략, 쿼리 플랜 분석까지 독립 수행' },
                  { score: 3, label: '보통', description: '기본 스키마 설계 가능하나 대용량 최적화 경험 부족' },
                  { score: 1, label: '미흡', description: 'DB 설계 경험 거의 없음' },
                ],
              },
            ],
          },
          {
            category: '코드 품질',
            criteria: [
              {
                name: '코드 품질', description: '읽기 쉽고 유지보수 가능한 코드를 작성하는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '코드 리뷰에서 모범 사례를 제시하고 팀 코딩 표준을 주도' },
                  { score: 3, label: '보통', description: '가독성 있는 코드 작성하나 리팩토링 제안은 제한적' },
                  { score: 1, label: '미흡', description: '코드 품질에 대한 인식이 낮음' },
                ],
              },
              {
                name: '테스트 전략', description: '적절한 테스트 전략을 수립하고 실행하는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '단위/통합/E2E 전략을 수립하고 커버리지 기준을 관리' },
                  { score: 3, label: '보통', description: '단위 테스트는 작성하나 통합 테스트 전략은 미흡' },
                  { score: 1, label: '미흡', description: '테스트 작성 경험이 거의 없음' },
                ],
              },
            ],
          },
        ],
      },
      {
        dimension: '멀티역량',
        weight: 0.4,
        categories: [
          {
            category: '협업/소통',
            criteria: [
              {
                name: '협업 능력', description: '팀원, 타 부서와 효과적으로 소통하고 협업하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '크로스팀 프로젝트를 주도하고 갈등을 건설적으로 해결' },
                  { score: 3, label: '보통', description: '팀 내 협업은 원활하나 타 부서와의 소통은 수동적' },
                  { score: 1, label: '미흡', description: '협업 시 소통 문제가 빈번하게 발생' },
                ],
              },
              {
                name: '멘토링', description: '주니어 개발자를 성장시킬 의지와 능력이 있는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '체계적인 멘토링 프로그램을 운영하고 주니어 성장에 기여한 사례 다수' },
                  { score: 3, label: '보통', description: '질문에 답변은 하지만 적극적 멘토링은 부족' },
                  { score: 1, label: '미흡', description: '멘토링 의지나 경험이 없음' },
                ],
              },
            ],
          },
          {
            category: '성장/리더십',
            criteria: [
              {
                name: '문제 해결력', description: '기술적 문제를 체계적으로 분석하고 해결하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '복잡한 문제를 구조화하여 근본 원인을 파악하고 재발 방지까지 설계' },
                  { score: 3, label: '보통', description: '일반적 문제는 해결하나 복잡한 상황에서 체계적 접근 부족' },
                  { score: 1, label: '미흡', description: '문제 해결 시 시행착오에만 의존' },
                ],
              },
              {
                name: '학습 의지 / 리더십', description: '새로운 기술을 학습하고 기술적 리더십을 발휘하는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '기술 블로그, 사내 발표 등 지식 공유를 주도하고 팀 기술 방향을 이끔' },
                  { score: 3, label: '보통', description: '개인 학습은 하지만 팀 차원의 기술 리딩은 미경험' },
                  { score: 1, label: '미흡', description: '현재 기술에 안주하는 경향' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eval-pm',
    position: '프로덕트 매니저',
    dimensions: [
      {
        dimension: '직무전문기술',
        weight: 0.6,
        categories: [
          {
            category: '제품 전략',
            criteria: [
              {
                name: '제품 전략', description: '시장과 사용자를 분석하여 제품 방향을 설정할 수 있는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '시장 분석을 기반으로 제품 비전을 수립하고 경영진을 설득한 경험' },
                  { score: 3, label: '보통', description: '주어진 방향 내에서 기능을 기획하나 전략 수립은 미경험' },
                  { score: 1, label: '미흡', description: '제품 전략에 대한 이해 부족' },
                ],
              },
              {
                name: '우선순위 설정', description: '데이터와 프레임워크를 기반으로 우선순위를 결정하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: 'RICE/ICE 등 프레임워크를 활용하고 이해관계자 정렬까지 주도' },
                  { score: 3, label: '보통', description: '우선순위를 정하지만 근거 설명이 미흡한 경우 있음' },
                  { score: 1, label: '미흡', description: '우선순위 결정 경험이나 방법론 부재' },
                ],
              },
              {
                name: '데이터 분석', description: '제품 지표를 정의하고 데이터 기반 의사결정을 하는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: 'KPI 설정, 코호트 분석, 실험 설계까지 독립 수행' },
                  { score: 3, label: '보통', description: '기본 지표 모니터링은 하나 심층 분석은 데이터팀 의존' },
                  { score: 1, label: '미흡', description: '데이터 기반 의사결정 경험 없음' },
                ],
              },
            ],
          },
        ],
      },
      {
        dimension: '멀티역량',
        weight: 0.4,
        categories: [
          {
            category: '소통/리더십',
            criteria: [
              {
                name: '커뮤니케이션', description: '다양한 이해관계자와 명확하게 소통하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '경영진-개발팀-디자인팀 간 복잡한 의사소통을 원활히 중재' },
                  { score: 3, label: '보통', description: '팀 내 소통은 양호하나 크로스팀 커뮤니케이션에서 마찰 발생' },
                  { score: 1, label: '미흡', description: '의사전달이 불명확하여 오해가 자주 발생' },
                ],
              },
              {
                name: '리더십', description: '직접적 권한 없이도 팀을 이끌 수 있는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '영향력 기반 리더십으로 팀을 동기부여하고 목표 달성을 주도' },
                  { score: 3, label: '보통', description: '주어진 범위 내 실행은 하나 자발적 리딩은 제한적' },
                  { score: 1, label: '미흡', description: '수동적 업무 수행, 리더십 발휘 미경험' },
                ],
              },
              {
                name: '갈등 해결', description: '의견 충돌을 건설적으로 해결하는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '다양한 의견을 조율하여 합의를 이끌어낸 구체적 사례 다수' },
                  { score: 3, label: '보통', description: '갈등 상황에서 중립을 유지하나 적극 해결은 부족' },
                  { score: 1, label: '미흡', description: '갈등 상황을 회피하거나 악화시킴' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eval-marketer',
    position: '그로스 마케터',
    dimensions: [
      {
        dimension: '직무전문기술',
        weight: 0.6,
        categories: [
          {
            category: '마케팅 실행',
            criteria: [
              {
                name: '채널 운영', description: '다양한 마케팅 채널을 효과적으로 운영하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '멀티 채널을 통합 운영하고 채널별 최적화 전략을 독립 수행' },
                  { score: 3, label: '보통', description: '1-2개 채널은 능숙하나 통합 운영 경험 부족' },
                  { score: 1, label: '미흡', description: '채널 운영 경험이 거의 없음' },
                ],
              },
              {
                name: '데이터 분석', description: '마케팅 성과를 정량적으로 분석하고 개선하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: 'GA/Amplitude 활용, 어트리뷰션 분석, ROI 기반 의사결정 능숙' },
                  { score: 3, label: '보통', description: '기본 지표 모니터링은 하나 심층 분석은 제한적' },
                  { score: 1, label: '미흡', description: '데이터 분석 역량 부족' },
                ],
              },
              {
                name: '예산 최적화', description: 'ROAS/CAC를 기반으로 예산을 효율적으로 배분하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '예산 포트폴리오를 관리하고 ROAS 2배 이상 개선 사례 보유' },
                  { score: 3, label: '보통', description: '주어진 예산 내 집행은 하나 최적화 경험은 제한적' },
                  { score: 1, label: '미흡', description: '예산 관리 경험 없음' },
                ],
              },
            ],
          },
        ],
      },
      {
        dimension: '멀티역량',
        weight: 0.4,
        categories: [
          {
            category: '협업/성장',
            criteria: [
              {
                name: '크로스펑셔널 협업', description: '제품, 디자인, 개발팀과 효과적으로 협업하는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '여러 팀과의 프로젝트를 주도하고 원활한 협업 프로세스 구축' },
                  { score: 3, label: '보통', description: '요청 시 협업하지만 주도적 참여는 부족' },
                  { score: 1, label: '미흡', description: '타 팀과의 소통에 어려움' },
                ],
              },
              {
                name: '실행력', description: '빠르게 실행하고 결과로부터 학습하는가', weight: 'high',
                rubric: [
                  { score: 5, label: '우수', description: '린 방식으로 빠르게 실험하고 데이터 기반 피봇을 반복' },
                  { score: 3, label: '보통', description: '계획 실행은 하나 속도감이나 학습 루프가 느림' },
                  { score: 1, label: '미흡', description: '실행이 지연되고 결과 회고가 없음' },
                ],
              },
              {
                name: '전략적 사고', description: '전술적 실행을 넘어 전략적 관점을 가지고 있는가', weight: 'medium',
                rubric: [
                  { score: 5, label: '우수', description: '마케팅을 비즈니스 성장 관점에서 접근하고 장기 전략 수립 가능' },
                  { score: 3, label: '보통', description: '실행에 집중하되 전략적 관점은 제한적' },
                  { score: 1, label: '미흡', description: '주어진 업무만 수행, 전략적 사고 부재' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
