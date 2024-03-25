import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

/**
 * @description 상품 상세정보 조회
 * @param supabase
 * @param id
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getProduct(
  supabase: SupabaseClient,
  id: string,
): Promise<{
  data: Product
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    const data: Product = getMockProductData({ id })
    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .limit(1) // 1개만 조회
    .single() // 단일 조회

  if (error) throw error

  // camelCase로 변환, deep 옵션은 중첩된 객체까지 camelCase로 변환
  return { data: camelcaseKeys(data, { deep: true }) }
}
