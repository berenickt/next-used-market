import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 페이지네이션을 위한 상품 수 검색
 * @param supabase
 * @param query
 * @returns
 */
export async function getProductsByKeywordCount(
  supabase: SupabaseClient,
  query: string,
): Promise<{ data: number }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 100 }
  }

  const { count, error } = await supabase
    .from('products')
    // count: 'exact' 옵션을 사용하면 정확한 개수를 조회할 수 있음
    // head: true 옵션을 사용하면 첫 번째 페이지만 조회
    .select('*', { count: 'exact', head: true })
    .is('purchase_by', null) // 구매자가 없는 상품만 조회
    .like('title', `%${query}%`) // 제목에 검색어가 포함된 상품만 조회

  if (error) throw error

  return { data: count || 0 }
}
