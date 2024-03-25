import { SupabaseClient } from '@supabase/supabase-js'
import snakecaseKeys from 'snakecase-keys'

import { Review } from '@/types'

type Params = Omit<Omit<Omit<Review, 'id'>, 'createdBy'>, 'createdAt'>

/**
 * @description 리뷰 생성
 * @param supabase
 * @param params
 * @see https://github.com/bendrucker/snakecase-keys
 * supabase는 snake_case로 사용하기 때문에, snakecaseKeys로 변환해주는 라이브러리를 사용
 */
export async function createReview(supabase: SupabaseClient, params: Params) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('reviews') //
    .insert(snakecaseKeys(params)) // snake_case로 변환하여 데이터 삽입

  if (error) throw error

  return
}
