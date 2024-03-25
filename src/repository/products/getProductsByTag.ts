import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

/**
 * @description 태그별 상품 목록 조회
 * @param supabase
 * @param tag
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getProductsByTag(
  supabase: SupabaseClient,
  tag: string,
): Promise<{
  data: Product[]
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    const data: Product[] = Array.from({ length: 5 }).map(() =>
      getMockProductData({ tags: [tag] }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .contains('tags', [tag]) // 태그에 포함된 상품만 조회
    .is('purchase_by', null) // 구매자가 없는 상품만 조회

  if (error) throw error

  return { data: camelcaseKeys(data, { deep: true }) }
}
