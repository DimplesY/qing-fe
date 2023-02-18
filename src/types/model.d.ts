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

interface AuthorType {
  name: string
  imageUrl: WrapperImage
  gradeUrl: WrapperImage
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
  img: WrapperImage
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
