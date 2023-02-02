import { useEffect, useState } from 'react'

export function useShowHeader() {
  const [show, setShow] = useState(false)

  function onscroll() {
    window.scrollY > 300 ? setShow(true) : setShow(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', onscroll)
    return () => {
      window.removeEventListener('scroll', onscroll)
    }
  })
  return show
}
