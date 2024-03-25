import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 상점 팔로워 수 조회
 * @param supabase
 * @param shopId
 * @returns
 */
export async function getShopFollowerCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{
  data: number
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('follows')
    // count: 'exact' 옵션을 사용하여 정확한 개수를 조회
    // head: true 옵션을 사용하여 첫 번째 레코드만 조회
    .select('*', { count: 'exact', head: true })
    .eq('following_shop_id', shopId)
    // 최신순(내림차)으로 정렬
    .order('created_at', { ascending: false })

  if (error) throw error

  return { data: count || 0 }
}
