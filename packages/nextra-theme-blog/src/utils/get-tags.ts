import type { MdxFile, PageMapItem } from '@julianberger/nextra'
import type { BlogFrontMatter } from '../types'

export function split(tags: string | string[] = ''): string[] {
  return (Array.isArray(tags) ? tags : tags.split(',')).map(s => s.trim())
}

interface Page extends MdxFile {
  children?: Page[]
}

const flattenPageMap = (page: Page, result: PageMapItem[] = []) => {
  if (Array.isArray(page.children!)) {
    for (const p of page.children) {
      flattenPageMap(p, result)
    }
  }
  result.push(page)
}

const flattenPageMaps = (pages: Page[], result: PageMapItem[] = []) => {
  for (const v of pages) {
    flattenPageMap(v, result)
  }
}
export const getStaticTags = (pageMap: PageMapItem[]) => {
  const result: MdxFile[] = []
  flattenPageMaps(pageMap as Page[], result)
  return Array.from(new Set(result.map(getTags).flat(1).filter(Boolean)))
}

export default function getTags(page: MdxFile<BlogFrontMatter>) {
  if (!page.frontMatter) {
    return []
  }
  return split(page.frontMatter.tag)
}
