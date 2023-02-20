import clsxm from '@/utils/clsxm'
import Image from 'next/image'
import { IoEyeOutline } from 'react-icons/io5'
import { FC } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import ms from 'ms'

interface ArticleItemProps {
  id: number
  title: string
  desc: string
  content: string
  author: string
  view: number
  cover: string
  publishedAt: string
}

const ArticleItem: FC<ArticleItemProps> = (props) => {
  const time = ms(Date.now() - new Date(props.publishedAt).getTime(), { long: true })
    .replace('years', '年')
    .replace('months', '月')
    .replace('days', '天')
    .replace('hours', '小时')
    .replace('minutes', '分钟')
    .replace('seconds', '秒')
  return (
    <div className="w-full pt-4 px-[20px] cursor-pointer">
      <div className="flex items-center text-[13px] leading-[22px] whitespace-nowrap break-all text-[var(--tabs-color)]">
        <div className="text-[var(--article-title-color)] truncate">{props.author}</div>
        <div className="w-[1px] h-[14px] bg-[var(--article-split-line-color)] mx-[8px]"></div>
        <div>{time}前</div>
        <div className="w-[1px] h-[14px] bg-[var(--article-split-line-color)] mx-[8px]"></div>
        <ul className="flex items-center">
          <li className={styles.splitDot}>前端</li>
          <li className={styles.splitDot}>React.js</li>
        </ul>
      </div>

      <Link href={'/article/' + props.id}>
        <div className="pb-4 mt-[10px] w-full border-b border-solid border-[var(--menu-split-line-color)] flex">
          <div className="w-full flex-1">
            <div
              className={clsxm(
                'text-[var(--article-title-color)] text-[16px] leading-[28px] font-bold mb-[8px]',
                styles.textOverflow,
              )}>
              {props.title}
            </div>
            <div
              className={clsxm(
                'text-[var(--tabs-color)] text-[13px] leading-[22px] mb-[10px]',
                styles.textOverflow,
              )}>
              {props.desc}
            </div>

            <div className="flex items-center gap-[20px] h-[20px]">
              <div className="flex items-center">
                <IoEyeOutline size={16} color="var(--article-icon-color)" />
                <div className="ml-[4px] text-[var(--article-icon-color)] text-[13px]">
                  {props.view}
                </div>
              </div>
            </div>
          </div>

          {props.cover && (
            <Image
              width={120}
              height={80}
              className="w-[120px] h-[80px] rounded-[2px] bg-white ml-8"
              alt="稀土掘金"
              src={process.env.NEXT_PUBLIC_API_URL + props.cover}
            />
          )}
        </div>
      </Link>
    </div>
  )
}

export default ArticleItem
