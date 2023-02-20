// 导航栏菜单
interface Menu {
  name: string
  path: string
  badge: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  type: string
}

// 文章类型
interface ArticleType {
  name: string
  path: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// 文章
interface Article {
  author: WrapperType<AuthorType>
  title: string
  desc: string
  content: string
  view: number
  cover: WrapperType<CommonImage>
  article_types: { data: CommonData<ArticleType>[] }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface AuthorType {
  name: string
  imageUrl: WrapperType<CommonImage>
  gradeUrl: WrapperType<CommonImage>
  path: string
  position: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
interface Advertisement {
  link: string
  alt: string
  advLink: string
  img: WrapperType<CommonImage>
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ArticleTab {
  name: string
  link: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// 文章详情
interface ArticleDetails {
  author: AuthorType
  title: string
  desc: string
  cover: WrapperImage
  content: string
  articleType: string
  authorImg: WrapperImage
  view: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}
