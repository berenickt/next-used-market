'use client'

import { useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import { createLike } from '@/repository/likes/createLike'
import { deleteLike } from '@/repository/likes/deleteLike'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialIsLiked: boolean // 초기 좋아요 여부
  isLoggedIn: boolean
  productId: string
}

/**
 * @description 낙관적 업데이트를 이용한 찜 버튼
 * @param param0
 * @returns
 */
export default function LikeButton({
  initialIsLiked,
  isLoggedIn,
  productId,
}: Props) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)

  const handleToggleLike = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다')
      return
    }

    try {
      setIsLiked(!isLiked)
      // 좋아요 추가 또는 삭제
      if (!isLiked) await createLike(supabase, productId)
      else await deleteLike(supabase, productId)
    } catch (e) {
      setIsLiked(isLiked)
    }
  }

  return (
    <Button
      fullWidth
      color="grey"
      className="flex justify-center items-center gap-1"
      onClick={() => handleToggleLike()}>
      <span style={{ fontSize: '1rem' }} className="material-symbols-outlined">
        favorite
      </span>
      <Text color="white"> {isLiked ? '찜 취소' : '찜'} </Text>
    </Button>
  )
}
