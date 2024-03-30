import classNames from 'classnames'
import { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

import '@/styles/globals.css'
import JggtLayout from '@/components/layout/JggtLayout'

type Props = {
  children: ReactNode
}

/***
 * @description Nextjs 13에서 제공하는 google 폰트
 */
const notoSansKr = Noto_Sans_KR({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap', // 폰트 로딩 방식
  subsets: ['latin'], // 글자 세트
})

/***
 * @description Nextjs 13에서 사용할하는 개인 로컬 폰트(아이콘을 적용하는 폰트)
 */
const materialSymbols = localFont({
  // material-symbols 아이콘 경로
  src: '../../node_modules/material-symbols/material-symbols-outlined.woff2',
  style: 'normal', // 폰트 스타일
  weight: '100 700',
  adjustFontFallback: false, // 폰트 대체 사용 여부
  display: 'block', // 폰트 로딩 방식
  variable: '--material-symbols-outlined', // css 변수 이름으로 지정해서, global.css에서 사용
})

/**
 * @description Nextjs 13의 정적 메타데이터 추가
 */
export const metadata: Metadata = {
  title: '중고장터',
  openGraph: {
    title: '중고장터',
  },
}

/**
 * @description 루트 레이아웃
 * @param Props - children
 */
export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='ko' // 언어 설정
      // Google Font, material-symbols Local Font 추가
      className={classNames(notoSansKr.className, materialSymbols.variable)}
    >
      <body>
        <JggtLayout>{children}</JggtLayout>
      </body>
    </html>
  )
}
