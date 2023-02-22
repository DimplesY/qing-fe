import Head from 'next/head'

const defaultMeta = {
  title: '稀土掘金',
  keywords: '掘金,稀土,Vue.js,前端面试题,Kotlin,ReactNative,Python',
  description:
    '掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。',
}

type SeoProps = {
  children?: React.ReactNode
} & Partial<typeof defaultMeta>

const Seo: React.FC<SeoProps> = (props) => {
  const meta = {
    ...defaultMeta,
    ...props,
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
      <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
      {meta.children}
    </Head>
  )
}

export default Seo
