import { useEffect, useState } from 'react'

export function useShowHeader(height = 300) {
  const [show, setShow] = useState(false)

  function onscroll() {
    window.scrollY > height ? setShow(true) : setShow(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', onscroll)
    return () => {
      window.removeEventListener('scroll', onscroll)
    }
  })
  return show
}
