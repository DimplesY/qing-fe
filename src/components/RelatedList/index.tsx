import Link from 'next/link'
import { FC } from 'react'

interface RelatedListProps {
  recommendedArticleList: CommonData<Article>[]
}

// 推荐文章列表
const RelatedList: FC<RelatedListProps> = ({ recommendedArticleList }) => {
  return (
    <div className="w-[300px] bg-[var(--primary-white)] px-[20px] pb-[15px] rounded-[4px] mt-[20px]">
      <div className="h-[56px] leading-[56px] text-[16px] border-b-[1px] border-[var(--menu-split-line-color)] text-[var(--article-title-color)]">
        相关文章
      </div>
      <ul>
        {recommendedArticleList.map((item) => (
          <li
            key={item.id}
            className="py-[8px] w-[260px] text-[14px] leading-[22px] hover:text-[#1e80ff] text-[var(--aside-text-color)]">
            <Link href={'/article/' + item.id} title={item.attributes.title} target="_blank">
              {item.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedList
