import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

type Params = {
  fromPage?: number
  toPage?: number
}

/**
 * @description 상품 목록 조회
 * @param supabase
 * @param param1
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getProducts(
  supabase: SupabaseClient,
  { fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Product[] }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    const data: Product[] = Array.from({
      length: (toPage - fromPage) * 10, // 1페이지당 10개씩 불러오기
    }).map(() => getMockProductData({ purchaseBy: null }))

    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .is('purchase_by', null) // 구매자가 없는 상품만 조회
    .range((fromPage ?? 0) * 10, (toPage ?? 1) * 10 - 1)
    .order('created_at', { ascending: false })

  if (error) throw error

  return { data: camelcaseKeys(data, { deep: true }) }
}
