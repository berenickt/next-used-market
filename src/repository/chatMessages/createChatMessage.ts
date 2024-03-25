import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  chatRoomId: string
  message: string
}

/**
 * @description 채팅 메시지 생성
 * @param supabase
 * @param param1
 * @returns
 */
export async function createChatMessage(
  supabase: SupabaseClient,
  { chatRoomId, message }: Params,
) {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('chat_messages') //
    .insert({
      chat_room: chatRoomId,
      message,
    })

  if (error) throw error

  return
}
