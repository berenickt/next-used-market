import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Review } from '@/types'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

/**
 * @description 상점 리뷰 목록 조회
 * @param supabase
 * @param param1
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getShopReviews(
  supabase: SupabaseClient,
  { shopId, fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Review[] }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockReviewData } = await import('@/utils/mock')
    const data: Review[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
      () => getMockReviewData({ createdBy: shopId }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('reviews')
    // 리뷰 정보, 리뷰한 상품의 id, 생성일를 조회
    .select('*, product_id, product: product_id!inner(created_by)')
    .eq('product.created_by', shopId)
    .range((fromPage ?? 0) * 10, (toPage ?? 1) * 10 - 1) // 10개씩 페이징 처리
    .order('created_at', { ascending: false }) // 최신순(내림차)으로 정렬

  if (error) throw error

  // deep 옵션을 사용하여, 중첩된 객체의 key도 camelCase로 변환
  return { data: camelcaseKeys(data, { deep: true }) }
}
