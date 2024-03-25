import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

/**
 * @description 상점 상품 목록 조회
 * @param supabase
 * @param param1
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getShopProducts(
  supabase: SupabaseClient,
  { shopId, fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Product[] }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    const data: Product[] = Array.from({
      length: (toPage - fromPage) * 10,
    }).map(() => getMockProductData({ createdBy: shopId }))

    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('created_by', shopId) // 상점 ID로 조회
    .range((fromPage ?? 0) * 10, (toPage ?? 1) * 10 - 1) // 10개씩 페이징 처리
    .order('created_at', { ascending: false }) // 최신순(내림차)으로 정렬

  if (error) throw error

  return { data: camelcaseKeys(data, { deep: true }) }
}
