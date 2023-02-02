import Nav from '@/components/Nav'

export default function Layout({
  children,
  menus,
  activeId,
}: {
  children: React.ReactNode
  menus: CommonData<Menu>[]
  activeId: number
}) {
  return (
    <div className="min-h-[200vh]">
      <Nav menus={menus} activeId={activeId} />
      <main className="">{children}</main>
    </div>
  )
}
