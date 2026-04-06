'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewCandidatePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    job_id: '',
    memo: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('후보자가 등록되었습니다! (Supabase 연동 후 실제 저장)')
  }

  return (
    <div className="max-w-2xl">
      <Link href="/candidates" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-6">
        <ArrowLeft size={16} />
        후보자 목록으로
      </Link>

      <h1 className="text-2xl font-bold mb-6">후보자 등록</h1>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">이름 *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="홍길동"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">연락처 *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="010-0000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">이메일 *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">지원 포지션 *</label>
          <select
            required
            value={form.job_id}
            onChange={(e) => setForm({ ...form, job_id: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none cursor-pointer"
          >
            <option value="">포지션 선택</option>
            <option value="1">백엔드 개발자</option>
            <option value="2">프론트엔드 개발자</option>
            <option value="3">PM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">이력서 첨부</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:px-4 file:py-1 file:text-sm file:cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">메모</label>
          <textarea
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            placeholder="특이사항이나 참고사항을 입력하세요"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            등록하기
          </button>
          <Link
            href="/candidates"
            className="px-6 py-2.5 rounded-lg text-sm border border-border hover:bg-background transition-colors"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  )
}
