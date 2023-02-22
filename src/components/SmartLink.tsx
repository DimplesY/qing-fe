import Link, { LinkProps } from 'next/link'

interface SmartLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export default function SmartLink({ children, ...rest }: SmartLinkProps) {
  return /http/.test(`${rest.href}`) ? (
    <a
      href={rest.href as string}
      title={rest.href as string}
      target="_blank"
      rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link {...rest}>{children}</Link>
  )
}
