import { useEffect, useState } from 'react'

function useNextPage() {
  const [pageNum, setPageNum] = useState(1)

  function scrollHandle() {
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
      setPageNum((prev) => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle, false)
    return () => {
      window.removeEventListener('scroll', scrollHandle)
    }
  })

  return {
    pageNum,
  }
}

export default useNextPage
