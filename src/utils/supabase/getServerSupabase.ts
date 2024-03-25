import { createServerClient, CookieOptions, serialize } from '@supabase/ssr'
import { GetServerSidePropsContext } from 'next'

import { supabaseUrl, supabaseKey } from '../constants'

/** Supabase Client (Server)
 * @see https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=get-server-side-props
 * @param cookies
 * @param legacyCookies
 * @returns supabase
 * @description 유저환경(클라이언트)가 아니기 때문에, 서버환경(서버)에서 유저 정보를 주입받을 수 있는 인터페이스가 추가로 필요하다.
 * supabase는 그 인터페이스로 쿠키를 활용하고 있다.
 */
export default function getServerSupabase(context: GetServerSidePropsContext) {
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return context.req.cookies[name]
      },
      set(name: string, value: string, options: CookieOptions) {
        context.res.appendHeader('Set-Cookie', serialize(name, value, options))
      },
      remove(name: string, options: CookieOptions) {
        context.res.appendHeader('Set-Cookie', serialize(name, '', options))
      },
    },
  })

  return supabase
}
