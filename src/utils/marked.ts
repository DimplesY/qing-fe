import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  highlight: function (code, lang) {
    return Prism.highlight(code, Prism.languages[lang], lang)
  },
  headerIds: true,
  headerPrefix: 'md-header-',
  gfm: true,
  breaks: true,
  sanitize: true,
  smartypants: true,
  xhtml: true,
})

let title = -1

marked.use({
  renderer: {
    heading(text, level) {
      title++
      return `
              <h${level} id="heading-${title}">
                ${text}
              </h${level}>`
    },
  },
})

export default marked
