import '@/styles/dracula.scss'
import '@/styles/globals.scss'
import '@/styles/md.scss'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
