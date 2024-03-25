'use client'

import { useState } from 'react'

import Login from './_components/Login'
import SignUp from './_components/SignUp'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'

/**
 * @description 로그인/회원가입 모달 안쪽 패널
 */
export default function LoginPannel() {
  // 로그인이 보여지는지, 회원가입이 보여지는지 타입
  const [type, setType] = useState<undefined | 'login' | 'signup'>()

  return (
    <div
      // 모달 내부을 클릭해도 모달이 닫히지 않게 하기 위해 이벤트 버블링을 막음
      className="bg-slate-50 flex flex-col justify-center items-center p-10 rounded w-96 gap-2"
      onClick={e => e.stopPropagation()}>
      <Text size="lg"> 중고장터 시작하기 </Text>
      <Text weight="light"> 간편하게 가입하고 상품을 확인하세요 </Text>
      {type === 'login' ? (
        // 로그인 타입이면, 로그인 컴포넌트
        <Login handleSetType={type => setType(type)} />
      ) : type === 'signup' ? (
        // 회원가입 타입이면, 회원가입 컴포넌트
        <SignUp handleSetType={type => setType(type)} />
      ) : (
        // 그 외에는 로그인/회원가입 버튼
        <div className="flex flex-col gap-2 w-full">
          <Button onClick={() => setType('login')}>로그인</Button>
          <Button onClick={() => setType('signup')}>회원가입</Button>
        </div>
      )}
    </div>
  )
}
