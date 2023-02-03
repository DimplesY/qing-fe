import clsx from 'clsx'
import { createContext, useContext, useEffect, useState } from 'react'

const PreloadContext = createContext<boolean>(false)

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  /** If the dom is loaded */
  const [preloaded, setIsPreloaded] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsPreloaded(true)
    }, 200)
  }, [])

  return (
    <PreloadContext.Provider value={preloaded}>
      <div
        className={clsx(
          'fixed inset-0 flex items-center justify-center bg-white transition-opacity dark:bg-dark',
          preloaded && 'pointer-events-none opacity-0',
        )}
      />
      {children}
    </PreloadContext.Provider>
  )
}

export const usePreloadState = () => useContext(PreloadContext)
