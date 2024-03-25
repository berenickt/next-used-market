import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 상점 검색 결과 수 조회
 * @param supabase
 * @param query
 * @returns
 */
export async function getShopsByKeywordCount(
  supabase: SupabaseClient,
  query: string,
): Promise<{ data: number }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('shops')
    .select('*', { count: 'exact', head: true })
    .like('name', `%${query}%`)

  if (error) throw error

  return { data: count || 0 }
}
