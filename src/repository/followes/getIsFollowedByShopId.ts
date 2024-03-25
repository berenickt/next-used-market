import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  followerId: string
  followedId: string
}

/**
 * @description 팔로우 여부 조회
 * @param supabase
 * @param param1
 * @returns
 */
export async function getIsFollowedByShopId(
  supabase: SupabaseClient,
  { followerId, followedId }: Params,
): Promise<{ data: boolean }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: true }
  }

  const { data, error } = await supabase
    .from('follows')
    .select('*')
    .eq('created_by', followerId) // 로그인한 사용자의 팔로우만 조회
    .eq('following_shop_id', followedId) // 팔로우 상점 ID로 팔로우 조회
    .maybeSingle() // 데이터가 없을 경우 null 반환

  if (error) throw error

  return { data: !!data }
}
