import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 상품 삭제
 * @param supabase
 * @param productId
 */
export async function deleteProduct(
  supabase: SupabaseClient,
  productId: string,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('products') //
    .delete()
    .eq('id', productId)

  if (error) throw error

  return
}
