import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

import { Product } from '@/types'

type Params = Omit<
  Omit<Omit<Omit<Product, 'id'>, 'createdAt'>, 'createdBy'>,
  'purchaseBy'
>

/**
 * @description 상품 생성
 * @param supabase
 * @param params
 * @returns
 * @see https://github.com/bendrucker/snakecase-keys
 * supabase는 snake_case로 사용하기 때문에, snakecaseKeys로 변환해주는 라이브러리를 사용
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function createProduct(
  supabase: SupabaseClient,
  params: Params,
): Promise<{ data: Product }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    return { data: getMockProductData() }
  }

  const { data, error } = await supabase
    .from('products')
    .insert(snakecaseKeys(params)) // snake_case로 변환
    .select()
    .single() // 단일 데이터만 반환

  if (error) throw error

  // camelCase로 변환
  return { data: camelcaseKeys(data, { deep: true }) }
}
