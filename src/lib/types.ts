export type Stage = '서류접수' | '1차면접' | '2차면접' | '처우협의' | '입사확정' | '탈락'

export const STAGES: Stage[] = ['서류접수', '1차면접', '2차면접', '처우협의', '입사확정']
export const ALL_STAGES: Stage[] = ['서류접수', '1차면접', '2차면접', '처우협의', '입사확정', '탈락']

export interface Job {
  id: string
  title: string
  department: string
  description: string
  status: 'open' | 'closed'
  created_at: string
}

export interface Candidate {
  id: string
  name: string
  phone: string
  email: string
  job_id: string
  stage: Stage
  applied_at: string
  resume_url: string | null
  memo: string | null
  created_at: string
  job?: Job
}

export interface Interview {
  id: string
  candidate_id: string
  stage: string
  scheduled_at: string
  interviewer: string
  location: string | null
  memo: string | null
  candidate?: Candidate
}

export interface StageHistory {
  id: string
  candidate_id: string
  from_stage: Stage
  to_stage: Stage
  changed_at: string
}

export interface Evaluation {
  id: string
  interview_id: string
  candidate_id: string
  rating: number
  comment: string | null
  created_at: string
}
