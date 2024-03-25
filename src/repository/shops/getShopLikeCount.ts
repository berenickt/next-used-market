import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 상점 좋아요 수 조회
 * @param supabase
 * @param shopId
 * @returns
 */
export async function getShopLikeCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{ data: number }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('likes')
    // 좋아요 정보, 좋아요한 상품의 id를 조회
    // count: 'exact' 옵션을 사용하여 정확한 개수를 조회
    // head: true 옵션을 사용하여 첫 번째 레코드만 조회
    .select('*, product: product_id(*)', { count: 'exact', head: true })
    .eq('created_by', shopId)

  if (error) throw error

  return { data: count || 0 }
}
