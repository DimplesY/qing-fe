import { useShowHeader } from '@/hooks/useShowHeader'
import clsxm from '@/utils/clsxm'
import { FC } from 'react'

const tabs = [
  '综合',
  '动画',
  '番剧',
  '国创',
  '音乐',
  '舞蹈',
  '游戏',
  '科技',
  '生活',
  '鬼畜',
  '时尚',
  '广告',
  '娱乐',
  '影视',
]

const Tabs: FC = () => {
  const show = useShowHeader()
  return (
    <div
      className={clsxm(
        'h-[3.833rem] leading-[3rem] pt-[0.6rem] box-content sm:pt-0 w-full bg-[var(--primary-white)] fixed shadow-tabs transition-all duration-200',
        show ? '-translate-y-[calc(5rem+1px)]' : '',
      )}>
      <div className="flex items-center justify-start h-full max-w-full sm:max-w-[960px] mx-auto overflow-x-scroll">
        <ul className="flex h-full text-[1.16rem] text-[var(--tabs-color)]">
          {tabs.map((tab, index) => (
            <li
              className={clsxm(
                index === 0 ? 'sm:pr-4' : 'sm:px-4',
                'hover:text-[var(--tabs-active-color)] cursor-pointer shrink-0 px-6  h-full flex items-center box-content',
                index === 0 && 'text-[var(--tabs-active-color)]',
              )}
              key={index}>
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tabs
