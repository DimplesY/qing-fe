import React, { ComponentPropsWithoutRef } from 'react'

type MainProps = ComponentPropsWithoutRef<'div'>

export default function Main({ children, className, ...rest }: MainProps) {
  return (
    <div className="mt-[3.833rem] max-w-[960px] mx-auto flow-root" {...rest}>
      <div className={className}>{children}</div>
    </div>
  )
}
