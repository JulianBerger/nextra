import { clean } from '../../../../__test__/test-utils.js'
import { compileMdx } from '../../compile.js'

const opts = {
  mdxOptions: {
    jsx: true,
    outputFormat: 'program'
  },
  latex: true
} as const

describe('rehypeExtractTocContent', () => {
  it('should work with footnotes or user ids', async () => {
    const { result } = await compileMdx(
      `
## foo
bar[^1]

[^1]: bar description
`,
      opts
    )
    expect(clean(result)).resolves.toMatchInlineSnapshot(`
      "import { useMDXComponents as _provideComponents } from '@julianberger/nextra/mdx'
      const title = ''
      const frontMatter = {}
      export function useTOC(props) {
        return [
          {
            value: 'foo',
            id: 'foo',
            depth: 2
          }
        ]
      }
      function MDXLayout(props) {
        const { toc = useTOC(props) } = props
        const _components = {
          a: 'a',
          h2: 'h2',
          li: 'li',
          ol: 'ol',
          p: 'p',
          section: 'section',
          sup: 'sup',
          ..._provideComponents(),
          ...props.components
        }
        return (
          <>
            <_components.h2 id={toc[0].id}>{toc[0].value}</_components.h2>
            {'\\\\n'}
            <_components.p>
              {'bar'}
              <_components.sup>
                <_components.a
                  href=\\"#user-content-fn-1\\"
                  id=\\"user-content-fnref-1\\"
                  data-footnote-ref
                  aria-describedby=\\"footnote-label\\"
                >
                  {'1'}
                </_components.a>
              </_components.sup>
            </_components.p>
            {'\\\\n'}
            <_components.section data-footnotes className=\\"footnotes\\">
              <_components.h2 className=\\"sr-only\\" id=\\"footnote-label\\">
                {'Footnotes'}
              </_components.h2>
              {'\\\\n'}
              <_components.ol>
                {'\\\\n'}
                <_components.li id=\\"user-content-fn-1\\">
                  {'\\\\n'}
                  <_components.p>
                    {'bar description '}
                    <_components.a
                      href=\\"#user-content-fnref-1\\"
                      data-footnote-backref=\\"\\"
                      aria-label=\\"Back to reference 1\\"
                      className=\\"data-footnote-backref\\"
                    >
                      {'↩'}
                    </_components.a>
                  </_components.p>
                  {'\\\\n'}
                </_components.li>
                {'\\\\n'}
              </_components.ol>
              {'\\\\n'}
            </_components.section>
          </>
        )
      }
      "
    `)
  })

  it('should fill heading deeply', async () => {
    const { result } = await compileMdx(
      `
import { Steps } from '@julianberger/nextra/components'

## baz qux

<Steps>
  <div>
  ### foo bar
  </div>
</Steps>
`,
      opts
    )
    expect(clean(result)).resolves.toMatchInlineSnapshot(`
      "import { useMDXComponents as _provideComponents } from '@julianberger/nextra/mdx'
      const title = ''
      const frontMatter = {}
      import { Steps } from '@julianberger/nextra/components'
      export function useTOC(props) {
        return [
          {
            value: 'baz qux',
            id: 'baz-qux',
            depth: 2
          },
          {
            value: 'foo bar',
            id: 'foo-bar',
            depth: 3
          }
        ]
      }
      function MDXLayout(props) {
        const { toc = useTOC(props) } = props
        const _components = {
          h2: 'h2',
          h3: 'h3',
          ..._provideComponents(),
          ...props.components
        }
        return (
          <>
            <_components.h2 id={toc[0].id}>{toc[0].value}</_components.h2>
            {'\\\\n'}
            <Steps>
              <div>
                <_components.h3 id={toc[1].id}>{toc[1].value}</_components.h3>
              </div>
            </Steps>
          </>
        )
      }
      "
    `)
  })

  it('should extract', async () => {
    const { result } = await compileMdx(
      `
# Heading 1

export const myVar = 'interpolated'

## Heading {myVar}

### Heading $latex$

### Heading \`<Code />:{jsx}\`

export const Test = () => <span>Hello</span>

#### <Test /> World

##### String

###### 123

###### Dada 123 true

export const frontMatter = {
  test: 'extract toc content'
}
    `,
      opts
    )
    expect(clean(result)).resolves.toMatchInlineSnapshot(`
      "import { useMDXComponents as _provideComponents } from '@julianberger/nextra/mdx'
      const title = 'Heading 1'
      export const myVar = 'interpolated'
      export const Test = () => {
        const _components = {
          span: 'span',
          ..._provideComponents()
        }
        return <_components.span>Hello</_components.span>
      }
      const frontMatter = {
        test: 'extract toc content'
      }
      export function useTOC(props) {
        const _components = {
          annotation: 'annotation',
          code: 'code',
          math: 'math',
          mi: 'mi',
          mrow: 'mrow',
          semantics: 'semantics',
          span: 'span',
          ..._provideComponents()
        }
        return [
          {
            value: (
              <>
                {'Heading '}
                {myVar}
              </>
            ),
            id: 'heading-myvar',
            depth: 2
          },
          {
            value: (
              <>
                {'Heading '}
                <_components.span className=\\"katex\\">
                  <_components.span className=\\"katex-mathml\\">
                    <_components.math xmlns=\\"http://www.w3.org/1998/Math/MathML\\">
                      <_components.semantics>
                        <_components.mrow>
                          <_components.mi>{'l'}</_components.mi>
                          <_components.mi>{'a'}</_components.mi>
                          <_components.mi>{'t'}</_components.mi>
                          <_components.mi>{'e'}</_components.mi>
                          <_components.mi>{'x'}</_components.mi>
                        </_components.mrow>
                        <_components.annotation encoding=\\"application/x-tex\\">{'latex'}</_components.annotation>
                      </_components.semantics>
                    </_components.math>
                  </_components.span>
                  <_components.span className=\\"katex-html\\" aria-hidden=\\"true\\">
                    <_components.span className=\\"base\\">
                      <_components.span
                        className=\\"strut\\"
                        style={{
                          height: '0.6944em'
                        }}
                      />
                      <_components.span
                        className=\\"mord mathnormal\\"
                        style={{
                          marginRight: '0.01968em'
                        }}
                      >
                        {'l'}
                      </_components.span>
                      <_components.span className=\\"mord mathnormal\\">{'a'}</_components.span>
                      <_components.span className=\\"mord mathnormal\\">{'t'}</_components.span>
                      <_components.span className=\\"mord mathnormal\\">{'e'}</_components.span>
                      <_components.span className=\\"mord mathnormal\\">{'x'}</_components.span>
                    </_components.span>
                  </_components.span>
                </_components.span>
              </>
            ),
            id: 'heading-latex',
            depth: 3
          },
          {
            value: (
              <>
                {'Heading '}
                <_components.code>{'<Code />:{jsx}'}</_components.code>
              </>
            ),
            id: 'heading-code-jsx',
            depth: 3
          },
          {
            value: (
              <>
                <Test />
                {' World'}
              </>
            ),
            id: '-world',
            depth: 4
          },
          {
            value: 'String',
            id: 'string',
            depth: 5
          },
          {
            value: '123',
            id: '123',
            depth: 6
          },
          {
            value: 'Dada 123 true',
            id: 'dada-123-true',
            depth: 6
          }
        ]
      }
      function MDXLayout(props) {
        const { toc = useTOC(props) } = props
        const _components = {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          ..._provideComponents(),
          ...props.components
        }
        return (
          <>
            <_components.h1>{'Heading 1'}</_components.h1>
            {'\\\\n'}
            {'\\\\n'}
            <_components.h2 id={toc[0].id}>{toc[0].value}</_components.h2>
            {'\\\\n'}
            <_components.h3 id={toc[1].id}>{toc[1].value}</_components.h3>
            {'\\\\n'}
            <_components.h3 id={toc[2].id}>{toc[2].value}</_components.h3>
            {'\\\\n'}
            {'\\\\n'}
            <_components.h4 id={toc[3].id}>{toc[3].value}</_components.h4>
            {'\\\\n'}
            <_components.h5 id={toc[4].id}>{toc[4].value}</_components.h5>
            {'\\\\n'}
            <_components.h6 id={toc[5].id}>{toc[5].value}</_components.h6>
            {'\\\\n'}
            <_components.h6 id={toc[6].id}>{toc[6].value}</_components.h6>
          </>
        )
      }
      "
    `)
  })

  describe('Remote MDX', () => {
    it("with outputFormat: 'program'", async () => {
      const rawMdx = `
import { RemoteContent } from '@julianberger/nextra/components'

## hello

<RemoteContent components={{ Callout, $Tabs: Tabs }} />`

      const { result } = await compileMdx(rawMdx, {
        ...opts,
        filePath: '[[...slug]].mdx'
      })
      const res = await clean(result, false)

      expect(res).toMatchInlineSnapshot(`
        "/*@jsxRuntime automatic @jsxImportSource react*/
        import { useMDXComponents as _provideComponents } from '@julianberger/nextra/mdx'
        const title = '[[...slug]]'
        const frontMatter = {}
        import { RemoteContent } from '@julianberger/nextra/components'
        export function useTOC(props) {
          return [
            {
              value: 'hello',
              id: 'hello',
              depth: 2
            }
          ]
        }
        function MDXLayout(props) {
          const { toc = useTOC(props) } = props
          const _components = {
            h2: 'h2',
            ..._provideComponents(),
            ...props.components
          }
          return (
            <>
              <_components.h2 id={toc[0].id}>{toc[0].value}</_components.h2>
              {'\\\\n'}
              <RemoteContent
                components={{
                  Callout,
                  $Tabs: Tabs
                }}
              />
            </>
          )
        }
        "
      `)
      // expect(res).not.toMatch('const frontMatter')
      // expect(res).not.toMatch('function useTOC')
      // expect(res).toMatch('MDXContent')
    })

    it("with outputFormat: 'function-body'", async () => {
      const rawMdx = `
import { Foo } from 'foo'

## bar

<Foo />

export const myVar = 123

### 123 {myVar}`

      const { result } = await compileMdx(rawMdx)
      const res = await clean(result, false)

      expect(res).toMatchInlineSnapshot(`
        "'use strict'
        const { Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs } = arguments[0]
        const { useMDXComponents: _provideComponents } = arguments[0]
        const title = ''
        const frontMatter = {}
        const myVar = 123
        function useTOC(props) {
          return [
            {
              value: 'bar',
              id: 'bar',
              depth: 2
            },
            {
              value: _jsxs(_Fragment, {
                children: ['123 ', myVar]
              }),
              id: '123-myvar',
              depth: 3
            }
          ]
        }
        function _createMdxContent(props) {
          const _components = {
              h2: 'h2',
              h3: 'h3',
              ..._provideComponents(),
              ...props.components
            },
            { Foo } = _components
          if (!Foo) _missingMdxReference('Foo', true)
          return _jsxs(_Fragment, {
            children: [
              _jsx(_components.h2, {
                id: 'bar',
                children: 'bar'
              }),
              '\\\\n',
              _jsx(Foo, {}),
              '\\\\n',
              '\\\\n',
              _jsxs(_components.h3, {
                id: '123-myvar',
                children: ['123 ', myVar]
              })
            ]
          })
        }
        return {
          title,
          frontMatter,
          myVar,
          useTOC,
          default: _createMdxContent
        }
        function _missingMdxReference(id, component) {
          throw new Error(
            'Expected ' +
              (component ? 'component' : 'object') +
              ' \`' +
              id +
              '\` to be defined: you likely forgot to import, pass, or provide it.'
          )
        }
        "
      `)
      expect(res).toMatch('default: _createMdxContent')
      expect(res).toMatch('const frontMatter')
      expect(res).toMatch('function useTOC')
      expect(res).not.toMatch('MDXContent')
    })
  })
})
