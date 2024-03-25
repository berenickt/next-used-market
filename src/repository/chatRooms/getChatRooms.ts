import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { ChatRoom } from '@/types'

/**
 * @description 채팅방 목록 조회
 * @param supabase
 * @param shopId
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getChatRooms(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{
  data: ChatRoom[]
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockChatRoomData } = await import('@/utils/mock')
    const data: ChatRoom[] = Array.from({ length: 1000 }).map((_, idx) =>
      getMockChatRoomData({ id: idx.toString(), toShopId: shopId }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('chat_rooms')
    .select('*')
    // 상점 ID로 채팅방 조회
    .or(`from_shop_id.eq.${shopId}, to_shop_id.eq.${shopId}`)

  if (error) {
    console.log(error)
    throw error
  }

  return { data: camelcaseKeys(data, { deep: true }) }
}
