import { useEffect, useState } from 'react'
import { debounce } from '@dimplesyj/util'
export function useAdvShow(ref: React.RefObject<HTMLDivElement>) {
  const [show, setShow] = useState(false)

  function onscroll() {
    const offsetHeight = ref.current?.offsetHeight

    if (offsetHeight) {
      document.documentElement.scrollTop > offsetHeight ? setShow(true) : setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', debounce(100, onscroll))
    return () => {
      window.removeEventListener('scroll', debounce(100, onscroll))
    }
  })
  return show
}
