import { FC } from 'react'

interface BadgeProps {
  title: string
}

const Badge: FC<BadgeProps> = ({ title }) => {
  if (!title.trim()) return null
  return (
    <div className="absolute top-2.5 left-3 w-[max-content] text-xs text-white rounded-lg flex items-center justify-center h-4 bg-[#dc5c3e]">
      <span className=" scale-75"> {title}</span>
    </div>
  )
}

export default Badge
