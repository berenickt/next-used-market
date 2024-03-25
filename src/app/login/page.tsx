import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import LoginPannel from '@/components/shared/LoginPannel'
import { getMe } from '@/repository/me/getMe'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  searchParams: { next?: string }
}

/**
 * @description 로그인 페이지
 * @param Props {string} next - 다음 페이지
 */
export default async function Login({ searchParams: { next } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const {
    data: { shopId },
  } = await getMe(supabase)

  if (shopId) {
    const destination = next ? decodeURIComponent(next) : '/'
    return redirect(destination)
  }

  return (
    <div
      className="flex justify-center items-center"
      // inherit : 부모 요소(레이아웃)의 높이를 상속받음
      style={{ minHeight: 'inherit' }}>
      <LoginPannel />
    </div>
  )
}
