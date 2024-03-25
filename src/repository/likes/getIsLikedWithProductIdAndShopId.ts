import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  productId: string
  shopId: string
}

/**
 * @description 상품id와 상점id로 좋아요 여부 조회
 * @param supabase
 * @param Params { productId, shopId }
 */
export async function getIsLikedWithProductIdAndShopId(
  supabase: SupabaseClient,
  { productId, shopId }: Params,
): Promise<{ data: boolean }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: true }
  }

  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('created_by', shopId) // 로그인한 사용자의 좋아요만 조회
    .eq('product_id', productId) // 상품 ID로 조회
    .maybeSingle() // 단일 조회

  if (error) throw error

  return { data: !!data }
}
