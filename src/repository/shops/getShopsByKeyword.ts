import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Shop } from '@/types'

type Params = {
  query: string
  fromPage?: number
  toPage?: number
}

/**
 * @description 상점 검색
 * @param supabase
 * @param Params { query, fromPage, toPage }
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getShopsByKeyword(
  supabase: SupabaseClient,
  { query, fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Shop[] }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockShopData } = await import('@/utils/mock')
    const data: Shop[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
      (_, idx) =>
        getMockShopData({
          name: `${query} - ${idx}`, // 상점 이름 - 인덱스
        }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .like('name', `%${query}%`) // 상점 이름에 검색어가 포함된 상점만 조회

  if (error) throw error

  // camelCase로 변환, deep 옵션은 중첩된 객체까지 camelCase로 변환
  return { data: camelcaseKeys(data, { deep: true }) }
}
