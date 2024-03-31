import { MetadataRoute } from 'next'

/*** SEO(Search Engine Optimization) - (2)
 * `robots.ts` : 앱에서 검색엔진 크롤러가 어떻게 동작해야 하는지를 정리한 파일
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // 모든 유저 에이전트 크롤러 허용
        allow: '/', // 모든 페이지 허용
      },
      {
        userAgent: 'sample_user_agent', // 특정 유저 에이전트(sample_user_agent)를 가진 크롤러는
        disallow: '/private', // 특정 페이지 (private 페이지) 차단
      },
    ],
  }
}
