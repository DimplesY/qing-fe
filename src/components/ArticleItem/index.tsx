import clsxm from '@/utils/clsxm'
import Image from 'next/image'
import { FC } from 'react'
import styles from './index.module.scss'

const ArticleItem: FC = () => {
  return (
    <div className="w-full pt-4 px-[20px] cursor-pointer">
      <div className="flex items-center text-[13px] leading-[22px] whitespace-nowrap break-all text-[var(--tabs-color)]">
        <div className="text-[var(--article-title-color)] ">掘金管理员</div>
        <div className="w-[1px] h-[14px] bg-[var(--article-split-line-color)] mx-[8px]"></div>
        <div>1天前</div>
        <div className="w-[1px] h-[14px] bg-[var(--article-split-line-color)] mx-[8px]"></div>
        <ul className="flex items-center">
          <li className={styles.splitDot}>前端</li>
          <li className={styles.splitDot}>React.js</li>
        </ul>
      </div>

      <div className="pb-4 mt-[10px] w-full border-b border-solid border-[var(--menu-split-line-color)] flex">
        <div className="w-full h-[50px] flex-1">
          <div
            className={clsxm(
              'text-[var(--article-title-color)] text-[16px] leading-[28px] font-bold mb-[8px]',
              styles.textOverflow,
            )}>
            讨论：今年哪些岗位不建议去？
          </div>
          <div
            className={clsxm(
              'text-[var(--tabs-color)] text-[13px] leading-[22px] mb-[10px]',
              styles.textOverflow,
            )}>
            之前负责了开源项目YApi和数据应用低代码搭建等工具，在工作中发现产品能力对技术同学影响是非常大的，期望本篇文章对大家有帮助。
          </div>
        </div>

        <Image
          width={120}
          height={80}
          className="w-[120px] h-[80px] rounded-[2px] bg-white ml-8"
          alt="稀土掘金"
          src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/975b36e66dd54f38b5adeab032251c53~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?"
        />
      </div>
    </div>
  )
}

export default ArticleItem
