import SeekerSidebar from '@/components/layout/seeker-sidebar'

export default function SeekerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SeekerSidebar />
      <main className="flex-1 ml-[240px] p-8">{children}</main>
    </div>
  )
}
