export interface InterviewQuestion {
  id: string
  category: 'behavioral' | 'technical' | 'culture'
  position?: string
  question: string
  intent: string
  goodSignals: string[]
  redFlags: string[]
}

export const interviewQuestions: InterviewQuestion[] = [
  // 행동면접 (Behavioral)
  {
    id: 'b1',
    category: 'behavioral',
    question: '가장 어려웠던 프로젝트 경험을 말씀해주세요. 어떻게 해결하셨나요?',
    intent: '문제 해결 능력과 회복 탄력성 평가',
    goodSignals: ['구체적인 상황 설명', '본인의 역할 명확히 구분', '결과와 배운 점을 연결'],
    redFlags: ['모호한 답변', '타인 탓만 함', '결과 없이 끝남'],
  },
  {
    id: 'b2',
    category: 'behavioral',
    question: '팀 내에서 의견 충돌이 있었던 경험을 공유해주세요.',
    intent: '갈등 해결 능력과 협업 태도 평가',
    goodSignals: ['상대방 입장을 이해하려 노력', '건설적인 대안 제시', '팀 성과를 우선시'],
    redFlags: ['일방적으로 자기 의견만 주장', '갈등을 회피', '감정적 대응'],
  },
  {
    id: 'b3',
    category: 'behavioral',
    question: '기한이 촉박한 상황에서 우선순위를 어떻게 정하셨나요?',
    intent: '시간 관리 능력과 판단력 평가',
    goodSignals: ['명확한 기준으로 우선순위 설정', '이해관계자와 소통', '트레이드오프를 인식'],
    redFlags: ['모든 것을 다 하려 함', '소통 없이 독단적 결정', '기한을 놓친 경험만 나열'],
  },
  {
    id: 'b4',
    category: 'behavioral',
    question: '실패한 경험이 있다면 어떤 것이었고, 무엇을 배우셨나요?',
    intent: '자기인식과 성장 마인드셋 평가',
    goodSignals: ['솔직한 실패 인정', '구체적인 배움 공유', '이후 행동 변화 설명'],
    redFlags: ['실패 경험이 전혀 없다고 답변', '남 탓', '같은 실수 반복'],
  },
  {
    id: 'b5',
    category: 'behavioral',
    question: '주도적으로 개선한 프로세스나 업무가 있나요?',
    intent: '주도성과 개선 의지 평가',
    goodSignals: ['문제를 스스로 발견', '개선 방안을 제안하고 실행', '정량적 결과 공유'],
    redFlags: ['시킨 일만 함', '개선 결과가 불분명', '아이디어만 있고 실행 없음'],
  },
  // 기술면접 (Technical)
  {
    id: 't1',
    category: 'technical',
    position: '백엔드 개발자',
    question: 'REST API와 GraphQL의 차이를 설명하고, 각각 어떤 상황에 적합한지 말씀해주세요.',
    intent: 'API 설계 이해도와 기술 선택 판단력 평가',
    goodSignals: ['장단점을 균형있게 설명', '실무 경험 기반 답변', '트레이드오프 인식'],
    redFlags: ['한쪽만 찬양', '개념 설명이 부정확', '실무 경험 없이 이론만'],
  },
  {
    id: 't2',
    category: 'technical',
    position: '백엔드 개발자',
    question: '대용량 트래픽 처리를 위해 어떤 아키텍처 패턴을 사용하시겠습니까?',
    intent: '시스템 설계 능력과 확장성 고려 평가',
    goodSignals: ['캐싱, 로드밸런싱, 비동기 처리 언급', '실제 경험 공유', '모니터링까지 고려'],
    redFlags: ['스케일업만 언급', '구체적 방법 없이 추상적', '실제 경험 부재'],
  },
  {
    id: 't3',
    category: 'technical',
    position: '프론트엔드 개발자',
    question: '웹 성능 최적화를 위해 어떤 방법들을 사용해보셨나요?',
    intent: '프론트엔드 성능 이해도와 실무 경험 평가',
    goodSignals: ['코드 스플리팅, 레이지 로딩 등 구체적 기법', '측정 도구 활용', '정량적 개선 결과'],
    redFlags: ['추상적 답변', '측정 없이 감으로', '기본적인 기법도 모름'],
  },
  {
    id: 't4',
    category: 'technical',
    position: 'PM',
    question: '제품의 우선순위를 어떤 프레임워크로 결정하시나요?',
    intent: '제품 전략 사고와 의사결정 프로세스 평가',
    goodSignals: ['RICE, ICE 등 프레임워크 활용', '데이터 기반 의사결정', '이해관계자 정렬'],
    redFlags: ['감으로 결정', '프레임워크를 하나도 모름', '상위 지시만 따름'],
  },
  {
    id: 't5',
    category: 'technical',
    position: 'PM',
    question: '사용자 리서치를 어떻게 진행하고, 그 결과를 어떻게 제품에 반영하셨나요?',
    intent: '사용자 중심 사고와 리서치 역량 평가',
    goodSignals: ['다양한 리서치 방법론 활용', '인사이트 도출 과정 설명', '제품 변경으로 연결'],
    redFlags: ['리서치 경험 없음', '결과를 무시', '방법론 이해 부족'],
  },
  // 컬처핏 (Culture Fit)
  {
    id: 'c1',
    category: 'culture',
    question: '어떤 조직 문화에서 가장 잘 일하시나요?',
    intent: '조직 적합도와 자기인식 평가',
    goodSignals: ['구체적 선호 설명', '자신의 업무 스타일 이해', '우리 회사 문화와 연결'],
    redFlags: ['아무 데서나 잘한다', '비현실적 기대', '이전 회사 비하'],
  },
  {
    id: 'c2',
    category: 'culture',
    question: '피드백을 받았을 때 어떻게 반응하시나요? 최근 사례가 있나요?',
    intent: '피드백 수용력과 성장 태도 평가',
    goodSignals: ['열린 태도', '구체적 개선 사례', '피드백을 요청하기도 함'],
    redFlags: ['방어적 태도', '피드백 경험 없음', '표면적 수용만'],
  },
  {
    id: 'c3',
    category: 'culture',
    question: '업무 외 시간에 자기 개발을 위해 어떤 노력을 하고 계신가요?',
    intent: '학습 의지와 성장 마인드셋 평가',
    goodSignals: ['지속적인 학습 습관', '다양한 학습 방법', '배운 것을 업무에 적용'],
    redFlags: ['전혀 하지 않음', '억지로 하는 느낌', '업무와 무관한 것만'],
  },
  {
    id: 'c4',
    category: 'culture',
    question: '5년 후 어떤 모습이 되어 있고 싶으신가요?',
    intent: '커리어 방향성과 조직 내 성장 가능성 평가',
    goodSignals: ['구체적 비전', '조직과 연결된 성장 계획', '현실적이면서 도전적'],
    redFlags: ['전혀 생각 없음', '1~2년 내 이직 계획', '비현실적 목표'],
  },
  {
    id: 'c5',
    category: 'culture',
    question: '업무에서 가장 보람을 느끼는 순간은 언제인가요?',
    intent: '내적 동기와 가치관 파악',
    goodSignals: ['팀 성과에 대한 기여', '성장 경험', '사용자/고객 임팩트'],
    redFlags: ['보상/승진만 언급', '보람을 느낀 적 없음', '개인 성과만 강조'],
  },
]

export const categoryLabels = {
  behavioral: '행동면접',
  technical: '기술면접',
  culture: '컬처핏',
} as const
