'use client'

import { useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

import ChatPreview from '../ChatPreview'

import { getChatRooms } from '@/repository/chatRooms/getChatRooms'
import { ChatRoom as TChatRoom } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  chatRooms: TChatRoom[]
  currentChatRoomId?: string
  shopId: string
}

/**
 * @description 채팅방 목록
 * @param Props {ChatRoom[]} chatRooms - 채팅방 목록
 * @param Props {string} currentChatRoomId - 현재 채팅방 ID
 * @param Props {string} shopId - 상점 ID
 */
export default function ChatRoom({
  chatRooms: initialChatRooms,
  currentChatRoomId,
  shopId,
}: Props) {
  const [chatRooms, setChatRooms] = useState(initialChatRooms)

  const handleUpdateChatRooms = useCallback(async () => {
    const { data } = await getChatRooms(supabase, shopId)
    setChatRooms(data)
  }, [shopId])

  /***
   * @description 채팅방 구독
   * @see https://supabase.com/docs/reference/javascript/subscribe?example=listen-to-inserts
   * supabase SDK를 사용한 실시간 연동
   */
  useEffect(() => {
    const subscribeChatRoomsFromMe = supabase
      .channel(`chat_rooms_from_${shopId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_rooms',
          filter: `from_shop_id=eq.${shopId}`,
        },
        () => handleUpdateChatRooms(),
      )
    const subscribeChatRoomsToMe = supabase
      .channel(`chat_rooms_to_${shopId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_rooms',
          filter: `to_shop_id=eq.${shopId}`,
        },
        () => handleUpdateChatRooms(),
      )

    subscribeChatRoomsFromMe.subscribe()
    subscribeChatRoomsToMe.subscribe()

    // 언마운트 시, 구독 해제
    return () => {
      subscribeChatRoomsFromMe.unsubscribe()
      subscribeChatRoomsToMe.unsubscribe()
    }
  }, [handleUpdateChatRooms, shopId])

  /*** react-virtuoso : 렌더링 최적화를 위한 가상화 리스트(Virtual List) 라이브러리
   * @description 스크롤 시 필요한 부분만 렌더링하여 성능을 향상시킴
   * @see https://virtuoso.dev/
   */
  return (
    <Virtuoso
      initialTopMostItemIndex={Math.max(
        chatRooms.findIndex(({ id }) => id === currentChatRoomId),
        0,
      )}
      data={chatRooms}
      itemContent={(_, { id, fromShopId, toShopId }) => (
        <ChatPreview
          key={id}
          chatRoomId={id}
          shopId={fromShopId === shopId ? toShopId : fromShopId}
          isActive={currentChatRoomId === id}
        />
      )}
    />
  )
}
