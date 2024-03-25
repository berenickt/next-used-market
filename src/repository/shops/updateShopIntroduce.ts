import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  shopId: string
  introduce: string
}

/**
 * @description 상점 소개 업데이트
 * @param supabase
 * @param Params shopId: string, introduce: string
 */
export async function updateShopIntroduce(
  supabase: SupabaseClient,
  { shopId, introduce }: Params,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('shops')
    .update({ introduce }) // introduce를 업데이트
    .eq('id', shopId) // id가 shopId인 데이터만 업데이트

  if (error) throw error

  return
}
