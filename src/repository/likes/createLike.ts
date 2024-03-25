import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 좋아요 생성
 * @param supabase
 * @param productId
 * @returns
 */
export async function createLike(supabase: SupabaseClient, productId: string) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('likes')
    .insert({ product_id: productId }) // 상품 ID로 좋아요 생성

  if (error) throw error

  return
}
