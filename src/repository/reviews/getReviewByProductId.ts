import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Review } from '@/types'

/**
 * @description 상품 ID로 리뷰 조회
 * @param supabase
 * @param productId
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getReviewByProductId(
  supabase: SupabaseClient,
  productId: string,
): Promise<{
  data: Review | null
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockReviewData } = await import('@/utils/mock')
    const data: Review | null =
      Math.random() > 0.5 ? getMockReviewData({ productId }) : null
    return { data }
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .maybeSingle() // 단일 데이터 조회

  if (error) throw error

  return { data: camelcaseKeys(data) }
}
