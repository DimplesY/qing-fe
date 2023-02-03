import { Device } from '@/constants'
import { useEffect, useState } from 'react'
import { useThrottleFn } from 'ahooks'

export default function useDevice() {
  const [device, setDevice] = useState(Device.Desktop)

  function onResize() {
    if (window.innerWidth <= 768) {
      setDevice(Device.Mobile)
    } else {
      setDevice(Device.Desktop)
    }
  }

  function isMobile() {
    return device === Device.Mobile
  }

  function isDesktop() {
    return device === Device.Desktop
  }

  const { run } = useThrottleFn(onResize, { wait: 300 })

  useEffect(() => {
    run()
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('resize', run)
    }
  })

  return {
    device,
    isMobile,
    isDesktop,
  }
}
