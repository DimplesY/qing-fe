import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface qrCodeProps {
  // 二维码图片
  img: string
  // 二维码链接
  qrLink: string
  // 标题
  title: string
  // 描述
  description: string
}

export const QrCode: FC<qrCodeProps> = ({ img, qrLink, title, description }) => {
  return (
    <div className="flex w-[240px] h-[74px] p-[13px] m-auto mt-[16px] bg-white bg-[var(--primary-white)] rounded-[2px]">
      <Link href={qrLink}>
        <Image src={img} priority width={50} height={50} alt="二维码" />
      </Link>
      <div className="ml-[16px] ">
        <div className="text-[14px] font-[500]">{title}</div>
        <div className="mt-[6px] text-[12px] text-[#86909C] font-[300]">{description}</div>
      </div>
    </div>
  )
}
