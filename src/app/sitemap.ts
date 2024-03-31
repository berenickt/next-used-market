import dayjs from 'dayjs'
import { MetadataRoute } from 'next'

import { getProducts } from '@/repository/products/getProducts'
import supabase from '@/utils/supabase/browserSupabase'

/*** SEO(Search Engine Optimization) - (3)
 * `Sitemap.ts` : 앱에서 제공하는 웹 페이지의 주소를 나열한 파일
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 상품 데이터
  const { data: products } = await getProducts(supabase, {
    fromPage: 0,
    toPage: 2,
  })

  // 상품 데이터를 기반으로 sitemap 생성
  const productsSitemap: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${process.env.BASE_URL}/products/${product.id}`, // 상품 상세 페이지로 이동
    lastModified: dayjs(product.createdAt).toDate(), // createdAt을 lastModified로 사용
    changeFrequency: 'daily', // 매일 업데이트
    priority: 0.7, // 우선순위 0.7
  }))

  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productsSitemap,
  ]
}
