'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, MapPin, Briefcase, Clock, Heart, Sparkles, ChevronDown, ArrowUpDown } from 'lucide-react'

const categories = ['전체', '개발', '디자인', '마케팅', 'PM', '인사', '영업', '경영지원']

const sortOptions = ['최신순', '매칭률순', '마감임박순']

const mockJobs = [
  {
    id: 1,
    company: '토스',
    initial: 'T',
    color: '#3182f6',
    title: '프론트엔드 개발자',
    location: '서울 강남',
    experience: '3-5년',
    salary: '5,000~7,000만원',
    skills: ['React', 'TypeScript', 'Next.js'],
    dDay: 'D-3',
    matchRate: 92,
    category: '개발',
    urgent: true,
  },
  {
    id: 2,
    company: '당근',
    initial: '당',
    color: '#ff6f0f',
    title: 'UX 디자이너',
    location: '서울 서초',
    experience: '1-3년',
    salary: '4,000~5,500만원',
    skills: ['Figma', 'User Research', 'Prototyping'],
    dDay: 'D-7',
    matchRate: 78,
    category: '디자인',
    urgent: false,
  },
  {
    id: 3,
    company: '카카오',
    initial: 'K',
    color: '#fee500',
    title: '백엔드 개발자',
    location: '판교',
    experience: '3-5년',
    salary: '5,500~8,000만원',
    skills: ['Java', 'Spring', 'Kubernetes'],
    dDay: 'D-12',
    matchRate: 85,
    category: '개발',
    urgent: false,
  },
  {
    id: 4,
    company: '네이버',
    initial: 'N',
    color: '#00c73c',
    title: '데이터 분석가',
    location: '판교',
    experience: '1-3년',
    salary: '4,500~6,000만원',
    skills: ['Python', 'SQL', 'Tableau'],
    dDay: 'D-5',
    matchRate: 67,
    category: '개발',
    urgent: false,
  },
  {
    id: 5,
    company: '쿠팡',
    initial: 'C',
    color: '#e4002b',
    title: '퍼포먼스 마케터',
    location: '서울 송파',
    experience: '신입',
    salary: '3,500~4,500만원',
    skills: ['Google Ads', 'Meta Ads', 'GA4'],
    dDay: 'D-2',
    matchRate: 74,
    category: '마케팅',
    urgent: true,
  },
  {
    id: 6,
    company: '라인',
    initial: 'L',
    color: '#06c755',
    title: '프로덕트 매니저',
    location: '판교',
    experience: '3-5년',
    salary: '5,000~7,000만원',
    skills: ['Jira', 'SQL', 'A/B Testing'],
    dDay: 'D-10',
    matchRate: 81,
    category: 'PM',
    urgent: false,
  },
  {
    id: 7,
    company: '비바리퍼블리카',
    initial: 'V',
    color: '#3182f6',
    title: 'HR 비즈니스 파트너',
    location: '서울 강남',
    experience: '5년 이상',
    salary: '6,000~8,500만원',
    skills: ['조직문화', 'HRIS', '노무관리'],
    dDay: 'D-14',
    matchRate: 88,
    category: '인사',
    urgent: false,
  },
  {
    id: 8,
    company: '배달의민족',
    initial: 'B',
    color: '#2ac1bc',
    title: '브랜드 디자이너',
    location: '서울 성수',
    experience: '1-3년',
    salary: '3,800~5,000만원',
    skills: ['Illustrator', 'Photoshop', 'BX'],
    dDay: 'D-6',
    matchRate: 71,
    category: '디자인',
    urgent: false,
  },
]

export default function SeekerJobsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('전체')
  const [activeSort, setActiveSort] = useState('최신순')
  const [showSort, setShowSort] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const filtered = mockJobs.filter(job => {
    const matchCategory = activeCategory === '전체' || job.category === activeCategory
    const matchSearch = search === '' || job.title.includes(search) || job.company.includes(search) || job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    return matchCategory && matchSearch
  })

  return (
    <div className="max-w-[960px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-gray-900 mb-1">채용 공고</h1>
        <p className="text-[13px] text-gray-500">나에게 맞는 포지션을 찾아보세요</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="직무, 회사, 기술스택으로 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
          />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          상세 필터
        </button>
      </div>

      {/* Filter Chips + Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {activeSort}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-[120px]">
              {sortOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setActiveSort(opt); setShowSort(false) }}
                  className={`w-full text-left px-3.5 py-2 text-[13px] hover:bg-gray-50 transition-colors ${activeSort === opt ? 'text-emerald-600 font-medium' : 'text-gray-600'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-[13px] text-gray-500 mb-4">
        총 <span className="font-semibold text-gray-900">{filtered.length}</span>개의 공고
      </p>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(job => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[14px] font-bold shrink-0"
                  style={{ backgroundColor: job.color }}
                >
                  {job.initial}
                </div>
                <div>
                  <p className="text-[12px] text-gray-500">{job.company}</p>
                  <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">{job.title}</h3>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(job.id)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites.includes(job.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-300'
                  }`}
                />
              </button>
            </div>

            {/* Info Row */}
            <div className="flex items-center gap-3 mb-3 text-[12px] text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {job.experience}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {job.dDay}
              </span>
            </div>

            {/* Salary */}
            <p className="text-[13px] font-medium text-gray-700 mb-3">{job.salary}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.skills.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-gray-100 text-[11px] text-gray-600 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              {job.matchRate >= 70 ? (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-emerald-50 to-cyan-50">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] font-semibold bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent">
                      내 프로필과 {job.matchRate}% 매칭
                    </span>
                  </div>
                </div>
              ) : (
                <div />
              )}
              <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white text-[12px] font-medium hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]">
                지원하기
              </button>
            </div>

            {/* Urgent Badge */}
            {job.urgent && (
              <div className="absolute top-3 right-14 px-2 py-0.5 rounded-md bg-red-50 text-red-500 text-[10px] font-bold">
                마감임박
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-900 mb-1">검색 결과가 없습니다</p>
          <p className="text-[13px] text-gray-500">다른 키워드나 필터로 검색해보세요</p>
        </div>
      )}
    </div>
  )
}
