import { useShowHeader } from '@/hooks/useShowHeader'
import clsxm from '@/utils/clsxm'
import Link from 'next/link'
import { FC, useRef } from 'react'

interface TabsProps {
  activeId: number
  articleTypeList: CommonData<ArticleType>[]
}

const Tabs: FC<TabsProps> = ({ articleTypeList, activeId }) => {
  const show = useShowHeader()
  const tabRef = useRef<HTMLDivElement>(null)

  function scrollHandler(e: WheelEvent) {
    e.preventDefault()
    tabRef.current?.scrollTo({
      left: tabRef.current.scrollLeft + e.deltaY,
    })
  }

  function onMouseEnter() {
    tabRef.current?.addEventListener('wheel', scrollHandler)
  }

  function onMouseLeave() {
    tabRef.current?.removeEventListener('wheel', scrollHandler)
  }

  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={clsxm(
        'h-[3.833rem] leading-[3rem] pt-[0.6rem] box-content sm:pt-0 w-full bg-[var(--primary-white)] fixed z-10 shadow-tabs transition-all duration-200',
        show ? '-translate-y-[calc(4.33rem+1px)] sm:-translate-y-[calc(5rem+1px)]' : '',
      )}>
      <div
        ref={tabRef}
        className="flex items-center justify-start h-full max-w-full sm:max-w-[960px] mx-auto scrollbar overflow-x-scroll">
        <ul className="flex h-full text-[1.16rem] text-[var(--tabs-color)]">
          {articleTypeList.map((tab, index) => (
            <li
              className={clsxm(
                index === 0 ? 'sm:pr-4' : 'sm:px-4',
                'hover:text-[var(--tabs-active-color)] cursor-pointer shrink-0 px-6 sm:first:pl-0 h-full flex items-center box-content',
                tab.id === activeId && 'text-[var(--tabs-active-color)]',
              )}
              key={tab.id}>
              {tab.id === activeId ? (
                tab.attributes.name
              ) : (
                <Link href={tab.attributes.path || '/'} title={tab.attributes.name}>
                  {tab.attributes.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tabs
