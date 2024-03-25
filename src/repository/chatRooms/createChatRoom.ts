import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { getMe } from '../me/getMe'

import { getChatRooms } from './getChatRooms'

import { AuthError } from '@/utils/error'

/**
 * @description 채팅방 생성
 * @param supabase
 * @param toShopId
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function createChatRoom(
  supabase: SupabaseClient,
  toShopId: string,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockChatRoomData } = await import('@/utils/mock')
    return { data: getMockChatRoomData({ toShopId }) }
  }

  const {
    data: { shopId },
  } = await getMe(supabase)

  if (!shopId) throw new AuthError()

  const { data: chatRooms } = await getChatRooms(supabase, shopId)

  // 이미 생성된 채팅방이 있는지 확인
  const chatRoom = chatRooms.find(
    chatRoom =>
      chatRoom.toShopId === toShopId || chatRoom.fromShopId === toShopId,
  )

  // 이미 생성된 채팅방이 있으면, 해당 채팅방 반환
  if (chatRoom) {
    return { data: camelcaseKeys(chatRoom, { deep: true }) }
  }

  // 기존 채팅방이 없다면, 채팅방 생성
  const { data, error } = await supabase
    .from('chat_rooms')
    .insert({ from_shop_id: shopId, to_shop_id: toShopId }) // 상점 ID로 채팅방 생성
    .select('*')
    .single()

  if (error) throw error

  return { data: camelcaseKeys(data, { deep: true }) }
}
