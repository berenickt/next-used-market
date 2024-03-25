import Login from './_components/Login'

import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

/**
 * @description 화면 최상단 로그인/회원가입 컴포넌트
 */
export default function UserInfo() {
  return (
    <Wrapper>
      <aside className="border-b border-slate-300">
        <Container>
          <div className="flex justify-end py-1">
            <Login />
          </div>
        </Container>
      </aside>
    </Wrapper>
  )
}
