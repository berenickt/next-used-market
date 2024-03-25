import { cookies } from 'next/headers'

import SearchShopResult from './_components/SearchShopResult'

import { getShopsByKeyword } from '@/repository/shops/getShopsByKeyword'
import { getShopsByKeywordCount } from '@/repository/shops/getShopsByKeywordCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

/**
 * @description 상점 검색 페이지
 * @param searchParams : 검색어
 */
export default async function SearchShop({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const originalQuery = searchParams.query
  if (!originalQuery) {
    throw new Error('검색어가 없습니다')
  }

  const query = decodeURIComponent(originalQuery)

  const [{ data: shops }, { data: count }] = await Promise.all([
    // 검색으로 인한 상점 데이터 조회
    getShopsByKeyword(supabase, {
      query,
      fromPage: 0,
      toPage: 1,
    }),
    // 상점 검색 결과 수 조회
    getShopsByKeywordCount(supabase, query),
  ])

  return <SearchShopResult shops={shops} count={count} />
}
