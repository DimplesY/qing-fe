import { RefObject, useEffect } from 'react'
import tippy, { Instance, Props } from 'tippy.js'
import 'tippy.js/dist/tippy.css'

let tippyInstance: Instance<Props>

export const usePopup = (ref: RefObject<HTMLElement>, content: string) => {
  useEffect(() => {
    if (tippyInstance) {
      tippyInstance.setContent(content)
      return
    }

    if (ref.current) {
      tippyInstance = tippy(ref.current, {
        content,
        placement: 'bottom',
        animation: 'fade',
      })
    }
  }, [ref, content])
}
