'use client'

import { ReactNode, useEffect } from 'react'

import { addRecentItemId } from '@/utils/localstorage'

type Props = {
  children: ReactNode
  productId: string
}

/**
 * @description 최근 본 상품을 productId가 바뀔 떄마다, localstorage에 추가
 * @param Props - children, productId
 */
export default function ProductWrapper({ children, productId }: Props) {
  useEffect(() => {
    addRecentItemId(productId)
  }, [productId])

  return <> {children} </>
}
