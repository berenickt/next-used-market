'use client'

import { FormEvent } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import supabase from '@/utils/supabase/browserSupabase'

interface Props {
  handleSetType: (type?: 'login' | 'signup') => void
}

/**
 * @description 모달 내 회원가입 입력창
 */
export default function SignUp({ handleSetType }: Props) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 이벤트를 막음

    // FormData : form 필드와 값을 쉽게 생성하여 서버에 제출하기 위한 키-값 쌍을 구성하는 데 사용되는 웹 API 객체
    // FormData를 사용하여 form 데이터를 가져옴
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 회원가입
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert(error.message)
      return
    }

    // 회원가입 후 자동 로그인
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    location.reload() // 페이지 새로고침
  }

  return (
    <form className="my-2 flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="이메일" required />
      <Input name="password" type="password" placeholder="비밀번호" required />

      <div className="flex flex-col gap-2 w-full">
        <Button type="button" onClick={() => handleSetType('login')}>
          로그인
        </Button>
        <Button type="submit" outline>
          회원가입
        </Button>
      </div>
    </form>
  )
}
