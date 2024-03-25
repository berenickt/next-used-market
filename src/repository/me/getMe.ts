import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 내 정보 조회
 * @param supabase - supabase 클라이언트
 * @returns
 */
export async function getMe(
  supabase: SupabaseClient,
): Promise<{ data: { shopId: string | null } }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: { shopId: 'mock-shop-id' } }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { data: { shopId: user?.id || null } }
}
