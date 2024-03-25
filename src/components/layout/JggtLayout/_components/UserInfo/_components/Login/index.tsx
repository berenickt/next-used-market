'use client'

import { useEffect, useState } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import LoginPannel from '@/components/shared/LoginPannel'
import { getMe } from '@/repository/me/getMe'
import supabase from '@/utils/supabase/browserSupabase'

/**
 * @returns 로그인/회원가입 보여주는 유무 컴포넌트
 */
export default function Login() {
  const [showModal, setShowModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>()

  /***
   * @see https://www.npmjs.com/package/scroll-lock
   * 모달창 뜨면, 스크롤을 막는다.
   */
  useEffect(() => {
    if (showModal) disablePageScroll() // 모달이 열리면 스크롤을 막는다
    else enablePageScroll() // 모달이 닫히면 스크롤을 풀어준다
  }, [showModal])

  useEffect(() => {
    ;(async () => {
      const {
        data: { shopId },
      } = await getMe(supabase)
      setIsLoggedIn(!!shopId)
    })()
  }, [])

  /***
   * @description 로그아웃
   */
  const handleLogOut = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <>
      {isLoggedIn === undefined ? (
        <Text size="sm" color="grey">
          <Spinner size="xs" />
        </Text>
      ) : isLoggedIn === false ? (
        // 로그인이 안했으면,
        <Text
          size="sm"
          color="grey"
          onClick={() => setShowModal(true)}
          className="cursor-pointer">
          로그인 / 회원가입
        </Text>
      ) : (
        // 로그인되어 있으면,
        <Text
          size="sm"
          color="grey"
          onClick={handleLogOut}
          className="cursor-pointer">
          로그아웃
        </Text>
      )}
      {/* 모달 */}
      {showModal && (
        <div
          // fixed로 모달 창을 띄운다, 모달 패널 밖을 클릭하면 모달이 닫히게 합니다.
          className="fixed top-0 left-0 w-screen h-screen bg-gray-400/50 z-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}>
          <LoginPannel />
        </div>
      )}
    </>
  )
}
