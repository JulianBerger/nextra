import nextra from '@julianberger/nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.jsx',
  latex: true,
  search: {
    codeblocks: false
  }
})

export default withNextra({
  reactStrictMode: true
})
