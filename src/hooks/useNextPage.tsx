import { useEffect, useRef, useState } from 'react'

function useNextPage(selector: string) {
  const [pageNum, setPageNum] = useState(1)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNum((prevPage) => prevPage + 1)
      }
    })

    observer.current.observe(document.querySelector(selector) as HTMLElement)

    return () => {
      observer.current && observer.current.disconnect()
    }
  }, [selector])

  return {
    pageNum,
    setPageNum,
  }
}

export default useNextPage
