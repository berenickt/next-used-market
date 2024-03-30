import { Black_Han_Sans } from 'next/font/google'
import Link from 'next/link'
import { ReactNode } from 'react'

import Search from './_components/Search'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

type Props = { children: ReactNode }

/**
 * @description Next.js에서 제공하는 Google Black Han Sans 폰트를 적용
 */
const blackHanSans = Black_Han_Sans({
  weight: ['400'],
  display: 'swap',
  subsets: ['latin'],
})

/**
 * @description Header 컴포넌트는 중고장터 페이지의 상단을 잡는 컴포넌트
 */
export default function Header({ children }: Props) {
  return (
    <div className='sticky top-0 z-10 bg-white border-b'>
      <Wrapper>
        <Container>
          <div className='flex justify-between items-center py-8 gap-2'>
            {/* 왼쪽 - 중고장터 로고 */}
            <Link href='/' prefetch={false}>
              <Text size='4xl' className={blackHanSans.className}>
                🗃 중고장터
              </Text>
            </Link>
            {/* 중간 - 검색창 */}
            <Search />
            {/* 오른쪽 - 판매하기, 내 상점, 채팅 */}
            <div className='flex gap-2'>
              <Link href='/products/new' prefetch={false} className='flex items-center'>
                <span className='material-symbols-outlined'>sell</span>
                <Text weight='light' size='sm' className='mx-1'>
                  판매하기
                </Text>
              </Link>
              |
              <Link href='/my-shop' prefetch={false} className='flex items-center'>
                <span className='material-symbols-outlined'>storefront</span>
                <Text weight='light' size='sm' className='mx-1'>
                  내 상점
                </Text>
              </Link>
              |
              <Link href='/messages' prefetch={false} className='flex items-center'>
                <span className='material-symbols-outlined'>chat_bubble</span>
                <Text weight='light' size='sm' className='mx-1'>
                  채팅
                </Text>
              </Link>
            </div>
          </div>
        </Container>
      </Wrapper>
      {children}
    </div>
  )
}
