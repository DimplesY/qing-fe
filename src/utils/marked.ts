import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight(code, language) {
  //   return Prism.highlight(code, Prism.languages[language], language)
  // },
  pedantic: false,
  headerIds: true,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: true,
  xhtml: false,
})

let title = -1

marked.use({
  renderer: {
    code(code, language) {
      if (code && language) {
        code = Prism.highlight(code, Prism.languages[language], language)
      }
      return `<pre lang="zh-Hans-CN" data-prismjs-copy="复制代码" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="代码已复制"><span class="code-lang">${language}</span><code class="language-${language}">${code}</code></pre>`
    },
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

export const prism = Prism
