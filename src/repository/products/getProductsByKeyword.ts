import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

type Params = {
  query: string
  fromPage?: number
  toPage?: number
}

/**
 * @description 검색어 자동완성으로 상품을 검색
 * @param supabase
 * @param params
 * - query: 검색어
 * - fromPage: 검색 시작 페이지
 * - toPage: 검색 종료 페이지
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getProductsByKeyword(
  supabase: SupabaseClient,
  { query, fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Product[] }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')

    const data: Product[] = Array.from({
      length: (toPage - fromPage) * 10, // 페이지당 10개씩
    }).map((_, index) =>
      getMockProductData({
        title: `${query} - ${index}`, // 상품명에 검색어를 포함하는 Mock Data 생성
      }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .like('title', `%${query}%`) // 제목에 검색어가 포함된 상품만 조회
    .is('purchase_by', null) // 구매자가 없는 상품만 조회
    .range((fromPage ?? 0) * 10, (toPage ?? 1) * 10 - 1) // 10개씩 조회
    .order('created_at', { ascending: false }) // 최신 상품부터 조회

  if (error) throw error

  return { data: camelcaseKeys(data, { deep: true }) }
}
