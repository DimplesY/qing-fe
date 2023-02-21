import Link from 'next/link'
import { FC } from 'react'

// 推荐文章列表
const RelatedList: FC = () => {
  return (
    <div className="w-[300px] bg-[var(--primary-white)] px-[20px] pb-[15px] rounded-[4px] mt-[20px]">
      <div className="h-[56px] leading-[56px] text-[16px] border-b-[1px] border-[#e4e6eb]">
        相关文章
      </div>
      <ul>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
        <li className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff]">
          <Link href="/">【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了）</Link>
        </li>
      </ul>
    </div>
  )
}

export default RelatedList
