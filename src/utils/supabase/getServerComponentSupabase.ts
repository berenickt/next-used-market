import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { supabaseKey, supabaseUrl } from '../constants'

/**
 * @description 서버환경(서버)에서 돌아가는 코드
 * @param cookieStore - 쿠키 저장소
 * @returns
 */
export default function getServerComponentSupabase(
  cookieStore: ReturnType<typeof cookies>,
) {
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  return supabase
}
