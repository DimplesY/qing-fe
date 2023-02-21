import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsxm from '@/utils/clsxm'
interface AuthorListProps {
  authorList: CommonData<AuthorType>[]
  className?: string
}

interface AuthorInfo {
  // 昵称
  name: string
  // 跳转路径
  path: string
  // 头像
  imageUrl: string
  // 等级图片
  gradeUrl: string
  // 职业
  position: string
}

export const Author: FC<AuthorInfo> = ({ name, path, imageUrl, gradeUrl, position }) => {
  return (
    <Link href={path}>
      <div className="flex w-[240px] h-[70px] px-[16px] items-center">
        <Image
          src={imageUrl}
          width={48}
          height={48}
          alt="头像"
          className="w-[48px] h-[48px] rounded-full"
        />

        <div className="ml-[6px]">
          <div className="flex items-center">
            <span className="text-[14px]">{name}</span>
            <Image
              src={gradeUrl}
              width={35}
              height={15}
              alt="等级"
              className="w-[35px] h-[15px] ml-[2px]"
            />
          </div>
          <div className="text-[12px] text-[#86909C] mt-[3px]">{position}</div>
        </div>
      </div>
    </Link>
  )
}

const AuthorList: FC<AuthorListProps> = ({ authorList, className }) => {
  return (
    <div
      className={clsxm(
        'w-[240px] bg-white bg-[var(--primary-white)] rounded-[2px] mt-[16px]',
        className,
      )}>
      <div className="h-[43px] pl-[16px] leading-[43px] border-b border-solid border-[var(--menu-split-line-color)]">
        🎖️作者榜
      </div>
      {authorList.map((item) => {
        return (
          <Author
            key={item.id}
            name={item.attributes.name}
            path={item.attributes.path}
            imageUrl={
              process.env.NEXT_PUBLIC_API_URL + item.attributes.imageUrl.data.attributes.url
            }
            gradeUrl={
              process.env.NEXT_PUBLIC_API_URL + item.attributes.gradeUrl.data.attributes.url
            }
            position={item.attributes.position}
          />
        )
      })}
    </div>
  )
}

export default AuthorList
