import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Shop } from '@/types'

/**
 * @description 상점 정보 조회
 * @param supabase
 * @param shopId
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getShop(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{
  data: Shop
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockShopData } = await import('@/utils/mock') // 비동기로 필요할 떄만 불러옴
    const data: Shop = getMockShopData({ id: shopId })

    return { data }
  }

  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .eq('id', shopId) // id가 shopId인 데이터만 가져옴
    .limit(1) // 1개만 가져옴
    .single() // 단일 데이터만 가져옴

  if (error) throw error

  return { data: camelcaseKeys(data) }
}
