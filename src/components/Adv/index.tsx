import { ComponentPropsWithoutRef, FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsxm from '@/utils/clsxm'
import { FiX } from 'react-icons/fi'

type AdvImageProps = ComponentPropsWithoutRef<'div'> & {
  /** 图片路径 */
  img: string
  /** 图片链接 */
  link: string
  /** 图片描述 */
  alt: string
  /** 广告投放链接 */
  adLink: string
}

// 图片广告组件
export const AdvImage: FC<AdvImageProps> = ({ className, img, link, adLink, alt, ...rest }) => {
  const [show, setShow] = useState(true)

  return (
    <>
      {show && (
        <div className={clsxm(className, 'relative group')} {...rest}>
          <FiX
            onClick={() => setShow(false)}
            size="1.5rem"
            className="opacity-50 text-[#909090] font-bold absolute top-2 right-2 hover:opacity-100 cursor-pointer hidden group-hover:block"
          />
          <Link href={link} className="w-full h-full block">
            <Image
              src={img}
              priority
              width={240}
              height={200}
              alt={alt}
              className="h-full w-full"
            />
          </Link>

          <div className="px-[15px] leading-[36px] box-content rounded-[6px] border border-white border-solid text-[20px] text-white absolute bottom-[10px] right-[10px] font-[300] bg-[rgba(0,0,0,.2)] hover:bg-[rgba(0,0,0,.4)] scale-50 origin-bottom-right group">
            <Link href={adLink} className="flex">
              <span className="hidden group-hover:block">投放</span>
              <span>广告</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
