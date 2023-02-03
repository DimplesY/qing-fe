import { FC } from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
interface AdvProps {
  img: string
  link: string
  alt: string
}

// todo: 广告组件
const Adv: FC<AdvProps> = () => {
  return (
    <div className="w-[240px] bg-transparent">
      <Image src="/advImage1.jpg" priority width={240} height={200} alt="广告" />

      <div className={styles.advInfo}>
        <Image src="/qrCode.png" priority width={50} height={50} alt="二维码" />
        <div className="ml-[16px] ">
          <div className="text-[14px] font-[500]">下载稀土掘金APP</div>
          <div className="mt-[6px] text-[12px] text-[#86909C] font-[300]">
            一个帮助开发者成长的社区
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adv
