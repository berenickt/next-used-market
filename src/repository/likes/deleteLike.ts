import { SupabaseClient } from '@supabase/supabase-js'

import { getMe } from '../me/getMe'

import { AuthError } from '@/utils/error'

/**
 * @description 좋아요 삭제
 * @param supabase
 * @param productId
 * @returns
 */
export async function deleteLike(supabase: SupabaseClient, productId: string) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const {
    data: { shopId },
  } = await getMe(supabase)

  if (!shopId) throw new AuthError()

  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('product_id', productId) // 상품 ID로 좋아요 삭제
    .eq('created_by', shopId) // 로그인한 사용자의 좋아요만 삭제

  if (error) throw error

  return
}
