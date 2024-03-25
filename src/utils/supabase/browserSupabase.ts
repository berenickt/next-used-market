import { createBrowserClient } from '@supabase/ssr'

import { supabaseUrl, supabaseKey } from '../constants'

/*** Supabase RLS (Row Level Security) Policy
 * RLS는 Postgres Database에서 SELECT / INSERT / UPDATE / DELETE 문을 수행할 수 있는 사용자를 제어할 수 있게끔 하는 기능입니다
 * RLS를 사용하면 매우 강력하고 유연한 행 수준 보안 정책을 설정할 수 있습니다
 */

/*** Supabase Client (browser)
 * @see https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client
 * @description 유저환경(클라이언트)에서 돌아가는 코드
 */
const supabase = createBrowserClient(supabaseUrl, supabaseKey)

export default supabase
