// @ts-nocheck
import { getPagesUnderRoute } from '@julianberger/nextra/context'
import { useRouter } from '@julianberger/nextra/hooks'
import Link from 'next/link'

export function Blog() {
  const { locale } = useRouter()
  return getPagesUnderRoute(`/${locale}/blog`).map(page => (
    <div key={page.route}>
      <Link
        href={page.route}
        className="text-2xl text-black hover:!no-underline dark:text-gray-100"
      >
        {page.meta.title || page.frontMatter?.title || page.name}
      </Link>
      <p className="opacity-80 mt-6 leading-7">
        {page.frontMatter?.description}
        <Link
          href={page.route}
          className="block _text-primary-600 underline underline-offset-2 decoration-from-font"
        >
          Read more →
        </Link>
      </p>
      <p>{page.date}</p>
    </div>
  ))
}
