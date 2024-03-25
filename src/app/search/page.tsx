import { cookies } from 'next/headers'

import SearchResult from './_components/SearchResult'

import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { getProductsByKeywordCount } from '@/repository/products/getProductsByKeywordCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

/**
 * @description 상품 검색 페이지
 * @param searchParams : 검색어
 */
export default async function Search({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const cookieStore = cookies()

  const supabase = getServerComponentSupabase(cookieStore) // 서버에서 supabase 연결

  const originalQuery = searchParams.query // 검색어
  if (!originalQuery) {
    throw new Error('검색어가 없습니다')
  }

  // 검색어 디코딩
  const query = decodeURIComponent(originalQuery)

  const [{ data: products }, { data: count }] = await Promise.all([
    // 검색어로 상품을 검색
    getProductsByKeyword(supabase, {
      query,
      fromPage: 0,
      toPage: 1,
    }),
    // 검색어로 상품 개수를 검색
    getProductsByKeywordCount(supabase, query),
  ])

  return <SearchResult products={products} count={count} />
}
