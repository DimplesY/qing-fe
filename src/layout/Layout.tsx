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
    <div className="">
      <Nav menus={menus} activeId={activeId} />
      <main className="mt-[calc(4.33rem+1px)] sm:mt-[calc(5rem+1px)] overflow-hidden relative z-10">
        {children}
      </main>
    </div>
  )
}
