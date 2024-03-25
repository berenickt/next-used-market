import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 상점 판매 수 조회
 * @param supabase
 * @param shopId
 * @returns
 */
export async function getShopSellCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{ data: number }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('products')
    // count: 'exact' 옵션을 사용하여 정확한 개수를 조회
    // head: true 옵션을 사용하여 첫 번째 레코드만 조회
    .select('*', { count: 'exact', head: true })
    .eq('created_by', shopId)
    .not('purchase_by', 'is', null) // 구매자가 있는 상품만 조회 (null이 아닌 것만 조회)

  if (error) throw error

  return { data: count || 0 }
}
