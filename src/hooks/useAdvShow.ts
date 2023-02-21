import { useEffect, useRef, useState } from 'react'
export function useAdvShow(ref: React.RefObject<HTMLDivElement>) {
  const [show, setShow] = useState(false)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          setShow(false)
        } else {
          setShow(true)
        }
      },
      {
        rootMargin: '10%',
        threshold: 0.1,
      },
    )
    observer.current.observe(ref.current as HTMLDivElement)
    return () => {
      observer.current?.disconnect()
    }
  })
  return show
}
