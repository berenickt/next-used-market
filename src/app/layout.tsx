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

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
})

const materialSymbols = localFont({
  src: '../../node_modules/material-symbols/material-symbols-outlined.woff2',
  style: 'normal',
  weight: '100 700',
  adjustFontFallback: false,
  display: 'block',
  variable: '--material-symbols-outlined',
})

/**
 * @description 메타데이터 추가
 */
export const metadata: Metadata = {
  title: '중고장터',
  openGraph: {
    title: '중고장터',
  },
}

/**
 * @description 루트 레이아웃
 * @param param0
 * @returns
 */
export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="ko" // 언어 설정
      // font, material-symbols 추가
      className={classNames(notoSansKr.className, materialSymbols.variable)}>
      <body>
        <JggtLayout>{children}</JggtLayout>
      </body>
    </html>
  )
}
