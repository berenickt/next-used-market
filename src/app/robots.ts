import { MetadataRoute } from 'next'

/*** SEO(Search Engine Optimization) - (2)
 * `robots.ts` : 검색 엔진의 크롤러가 접근할 수 있는 페이지임을 명시적으로 표시하는 파일
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'sample_user_agent',
        disallow: '/private',
      },
    ],
  }
}
