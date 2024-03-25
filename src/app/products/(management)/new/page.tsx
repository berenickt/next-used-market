import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ProductForm from '../_components/ProductForm'

import { getMe } from '@/repository/me/getMe'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

/**
 * @description 상품 등록 탭 페이지
 * @returns
 */
export default async function ProductNew() {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  try {
    const {
      data: { shopId },
    } = await getMe(supabase)
    if (!shopId) throw new AuthError()
  } catch (e) {
    if (e instanceof AuthError) {
      // encodeURIComponent : URI 구성 요소를 인코딩
      return redirect(`/login?next=${encodeURIComponent('/products/new')}`)
    }
    throw e
  }

  return <ProductForm />
}
