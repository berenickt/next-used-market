import { SupabaseClient } from '@supabase/supabase-js'

import { getMe } from '../me/getMe'

import { AuthError } from '@/utils/error'

/**
 * @description 상품 구매
 * @param supabase
 * @param productId
 */
export async function buyProduct(supabase: SupabaseClient, productId: string) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const {
    data: { shopId },
  } = await getMe(supabase)

  if (!shopId) throw new AuthError()

  const { error } = await supabase
    .from('products')
    .update({ purchase_by: shopId }) // 상점 ID로 구매 처리
    .eq('id', productId) // 상품 ID로 조회

  if (error) throw error

  return
}
