import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 팔로우 생성
 * @param supabase
 * @param followingShopId
 * @returns
 */
export async function createdFollow(
  supabase: SupabaseClient,
  followingShopId: string,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('follows')
    .insert({ following_shop_id: followingShopId }) // 팔로우 상점 ID로 팔로우 생성

  if (error) throw error

  return
}
