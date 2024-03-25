import { SupabaseClient } from '@supabase/supabase-js'

import { getMe } from '../me/getMe'

import { AuthError } from '@/utils/error'

/**
 * @description 팔로우 삭제
 * @param supabase
 * @param followingShopId
 * @returns
 */
export async function deleteFollow(
  supabase: SupabaseClient,
  followingShopId: string,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const {
    data: { shopId },
  } = await getMe(supabase)

  if (!shopId) throw new AuthError()

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('following_shop_id', followingShopId) // 팔로우 상점 ID로 팔로우 삭제
    .eq('created_by', shopId) // 로그인한 사용자의 팔로우만 삭제

  if (error) throw error

  return
}
