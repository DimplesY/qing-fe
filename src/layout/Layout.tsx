import Nav from '@/components/Nav'
import clsxm from '@/utils/clsxm'

export default function Layout({
  children,
  menus,
  activeId,
  classNames,
}: {
  children: React.ReactNode
  menus: CommonData<Menu>[]
  activeId: number
  classNames?: string
}) {
  return (
    <div>
      <Nav menus={menus} activeId={activeId} />
      <main className={clsxm('overflow-hidden relative z-10', classNames)}>{children}</main>
    </div>
  )
}
