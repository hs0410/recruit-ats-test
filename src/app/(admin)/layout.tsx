import Sidebar from '@/components/layout/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-[1200px]">
        {children}
      </main>
    </div>
  )
}
