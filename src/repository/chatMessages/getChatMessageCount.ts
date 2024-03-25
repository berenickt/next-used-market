import { SupabaseClient } from '@supabase/supabase-js'

/**
 * @description 채팅 메시지 개수 조회
 * @param supabase
 * @param chatRoomId
 * @returns
 */
export default async function getChatMessageCount(
  supabase: SupabaseClient,
  chatRoomId: string,
): Promise<{ data: number }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 100 }
  }

  const { count, error } = await supabase
    .from('chat_messages')
    // exact: 정확한 개수, head: 첫 번째 행만 반환
    .select('*', { count: 'exact', head: true })
    .eq('chat_room', chatRoomId) // 채팅방 ID로 조회

  if (error) throw error

  return { data: count || 0 }
}
