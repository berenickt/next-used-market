import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  shopId: string
  name: string
}

/**
 * @description 상점 이름 업데이트
 * @param supabase
 * @param Params shopId: string, name: string
 */
export async function updateShopName(
  supabase: SupabaseClient,
  { shopId, name }: Params,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('shops')
    .update({ name }) // name을 업데이트
    .eq('id', shopId) // id가 shopId인 데이터만 업데이트

  if (error) throw error

  return
}
