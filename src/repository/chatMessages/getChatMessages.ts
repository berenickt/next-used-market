import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { ChatMessage } from '@/types'

type Params = {
  chatRoomId: string
  fromIndex?: number
  toIndex?: number
}

/**
 * @description 채팅 메시지 조회
 * @param supabase
 * @param param1
 * @returns
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getChatMessages(
  supabase: SupabaseClient,
  { chatRoomId, fromIndex = 0, toIndex = 1 }: Params,
): Promise<{
  data: ChatMessage[]
}> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockChatMessageData } = await import('@/utils/mock')
    const data: ChatMessage[] = Array.from({ length: toIndex - fromIndex }).map(
      (_, idx) =>
        getMockChatMessageData({
          chatRoom: chatRoomId,
          message: `fromIndex: ${fromIndex}, toIndex: ${toIndex}, curIndex: ${idx}`,
        }),
    )
    return { data }
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('chat_room', chatRoomId)
    .range(fromIndex, toIndex) // fromIndex부터 toIndex까지 조회
    .order('created_at', { ascending: false }) // 최신 메시지(내림차)부터 조회

  if (error) throw error

  return { data: camelcaseKeys(data) }
}
