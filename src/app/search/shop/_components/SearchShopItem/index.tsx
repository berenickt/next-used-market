'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Shop from '@/components/common/Shop'
import Spinner from '@/components/common/Spinner'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  id: string
  name: string
  profileImageUrl?: string
}

/**
 * @description 검색 결과의 상점 아이템 수
 * @param param0
 * @returns
 */
export default function SearchShopItem({ id, name, profileImageUrl }: Props) {
  const [followerCount, setFollowerCount] = useState<number | undefined>()
  const [productCount, setProductCount] = useState<number | undefined>()

  /***
   * Promise.all : 여러 개의 비동기 작업을 동시에 실행하고, 모든 작업이 완료되었을 때 결과를 반환
   */
  useEffect(() => {
    ;(async () => {
      const [{ data: followerCount }, { data: productCount }] =
        await Promise.all([
          getShopFollowerCount(supabase, id), // 상점 팔로워 수 조회
          getShopProductCount(supabase, id), // 상점 상품 수 조회
        ])
      setFollowerCount(followerCount)
      setProductCount(productCount)
    })()
  }, [id])

  // 로딩 중
  if (followerCount === undefined || productCount === undefined) {
    return (
      <div className="border border-grey-300 h-28 flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <Link href={`/shops/${id}`} className="border border-grey-300 p-5">
      <Shop
        type="row"
        name={name}
        productCount={productCount}
        followerCount={followerCount}
        profileImageUrl={profileImageUrl}
      />
    </Link>
  )
}
