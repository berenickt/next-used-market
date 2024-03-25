'use client'

import camelcaseKeys from 'camelcase-keys'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getChatMessages } from '@/repository/chatMessages/getChatMessages'
import { getShop } from '@/repository/shops/getShop'
import { ChatMessage, Shop } from '@/types'
import { checkIsImage } from '@/utils/image'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  chatRoomId: string
  shopId: string
  isActive: boolean
}

/**
 * @description 채팅 미리보기
 * @param Props {string} chatRoomId - 채팅방 ID
 * @param Props {string} shopId - 상점 ID
 * @param Props {boolean} isActive - 활성화 여부
 */
export default function ChatPreview({ chatRoomId, shopId, isActive }: Props) {
  const [shop, setShop] = useState<Shop>()
  const [lastMessage, setLastMessage] = useState<ChatMessage | null>()

  /***
   * @description 상점 정보 및 마지막 메시지 정보 조회
   */
  useEffect(() => {
    ;(async () => {
      const [
        { data: shop },
        {
          data: [lastMessage],
        },
      ] = await Promise.all([
        getShop(supabase, shopId),
        getChatMessages(supabase, {
          chatRoomId,
          fromIndex: 0,
          toIndex: 1,
        }),
      ])
      setShop(shop)
      setLastMessage(lastMessage === undefined ? null : lastMessage)
    })()
  }, [chatRoomId, shopId])

  /***
   * @description 채팅 메시지 구독
   * @see https://supabase.com/docs/reference/javascript/subscribe?example=listen-to-inserts
   * supabase SDK를 사용한 실시간 연동
   */
  useEffect(() => {
    const subscribeChat = supabase.channel(`preview_on_${chatRoomId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `chat_room=eq.${chatRoomId}`,
      },
      payload => {
        // 새로운 메시지 추가
        setLastMessage(camelcaseKeys(payload.new) as ChatMessage)
      },
    )

    subscribeChat.subscribe()

    return () => {
      subscribeChat.unsubscribe()
    }
  }, [chatRoomId])

  // 상점 정보 또는 마지막 메시지 정보가 없을 경우
  if (shop === undefined || lastMessage === undefined) {
    return (
      <div className="flex justify-center items-center h-20 shrink-0">
        <Spinner />
      </div>
    )
  }

  return (
    <Link
      href={`/messages/${chatRoomId}`}
      prefetch={false}
      shallow
      className={classNames(
        'flex py-3 hover:bg-gray-100 h-20 shrink-0',
        isActive && 'bg-gray-200 hover:bg-gray-200',
      )}>
      <div className="mx-3">
        <ShopProfileImage imageUrl={shop.imageUrl || undefined} />
      </div>
      <div className="flex flex-col mx-3 flex-1 w-0">
        <Text size="lg" weight="bold">
          {shop.name}
        </Text>
        <div className="truncate">
          <Text size="sm" color="grey">
            {lastMessage
              ? checkIsImage(lastMessage.message)
                ? '[이미지]'
                : lastMessage.message
              : '🙏 메시지가 없습니다'}
          </Text>
        </div>
      </div>
    </Link>
  )
}
