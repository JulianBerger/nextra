import { compile } from '@mdx-js/mdx'
import type { VFile } from '@mdx-js/mdx/lib/compile'
import rehypePrettyCode from 'rehype-pretty-code'
import { clean } from '../../../../__test__/test-utils.js'
import {
  DEFAULT_REHYPE_PRETTY_CODE_OPTIONS,
  rehypeAttachCodeMeta,
  rehypeIcon,
  rehypeParseCodeMeta
} from '../index.js'
import { REHYPE_ICON_DEFAULT_REPLACES } from '../rehype-icon.js'

function process(content: string): Promise<VFile> {
  return compile(content, {
    jsx: true,
    rehypePlugins: [
      [rehypeParseCodeMeta, { defaultShowCopyCode: true }],
      [rehypePrettyCode, DEFAULT_REHYPE_PRETTY_CODE_OPTIONS] as any,
      rehypeIcon,
      rehypeAttachCodeMeta
    ]
  })
}

function createCodeBlock(...languages: string[]) {
  return languages.flatMap(lang => ['```' + lang, '', '```']).join('\n')
}

describe('rehypeIcon', () => {
  it('should attach same import only once', async () => {
    const raw = createCodeBlock('css', 'css')

    const file = await process(raw)
    expect(clean(file)).resolves.toMatchInlineSnapshot(`
      "import { CssIcon } from '@julianberger/nextra/icons'
      function _createMdxContent(props) {
        const _components = {
          code: 'code',
          pre: 'pre',
          span: 'span',
          ...props.components
        }
        return (
          <>
            <_components.pre icon={CssIcon} data-language=\\"css\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={CssIcon} data-language=\\"css\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
          </>
        )
      }
      "
    `)
  })
  it('should work with different language', async () => {
    const raw = createCodeBlock(...Object.keys(REHYPE_ICON_DEFAULT_REPLACES))

    const file = await process(raw)
    expect(clean(file)).resolves.toMatchInlineSnapshot(`
      "import { JavaScriptIcon } from '@julianberger/nextra/icons'
      import { TypeScriptIcon } from '@julianberger/nextra/icons'
      import { MarkdownIcon } from '@julianberger/nextra/icons'
      import { MdxIcon } from '@julianberger/nextra/icons'
      import { TerminalIcon } from '@julianberger/nextra/icons'
      import { CssIcon } from '@julianberger/nextra/icons'
      function _createMdxContent(props) {
        const _components = {
          code: 'code',
          pre: 'pre',
          span: 'span',
          ...props.components
        }
        return (
          <>
            <_components.pre icon={JavaScriptIcon} data-language=\\"js\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={JavaScriptIcon} data-language=\\"jsx\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={TypeScriptIcon} data-language=\\"ts\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={TypeScriptIcon} data-language=\\"tsx\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={MarkdownIcon} data-language=\\"md\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={MdxIcon} data-language=\\"mdx\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={TerminalIcon} data-language=\\"sh\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={TerminalIcon} data-language=\\"bash\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
            {'\\\\n'}
            <_components.pre icon={CssIcon} data-language=\\"css\\" data-copy=\\"\\">
              <_components.code>
                <_components.span> </_components.span>
              </_components.code>
            </_components.pre>
          </>
        )
      }
      "
    `)
  })
})
