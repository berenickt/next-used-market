import { ReactNode } from 'react'

import Aside from './_components/Aside'
import Footer from './_components/Footer'
import Header from './_components/Header'
import UserInfo from './_components/UserInfo'

interface Props {
  children: ReactNode // ReactNode는 리액트에서 사용하는 모든 종류의 노드를 의미
}

/**
 * @description 중고장터 전체 레이아웃 컴포넌트
 */
export default function JggtLayout({ children }: Props) {
  return (
    <div style={{ minWidth: 1000 }}>
      <UserInfo />
      <Header>
        {/* aside가 스크롤을 따라가도록, stiky 사용하는 header 안에 넣는다. */}
        <Aside />
      </Header>
      <main
        style={{
          // 브라우저의 높이를 기본 100%로 설정, 28px은 UserInfo의 높이, 108px은 Header의 높이, 65px는 Footer의 높이
          minHeight: 'calc(100vh - 28px - 108px - 65px)',
        }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
