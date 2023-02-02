import Nav from '@/components/Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[200vh]">
      <Nav />
      <main className="">{children}</main>
    </div>
  )
}
