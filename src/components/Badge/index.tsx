import { FC } from 'react'

interface BadgeProps {
  title: string
}

const Badge: FC<BadgeProps> = ({ title }) => {
  if (!title.trim()) return null
  return (
    <div className="absolute top-2 sm:top-2.5 right-7 sm:left-3 w-[max-content] text-xs text-white rounded-lg flex items-center justify-center h-4 bg-[#ff5132]">
      <span className=" scale-75"> {title}</span>
    </div>
  )
}

export default Badge
