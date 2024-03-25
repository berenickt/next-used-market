'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import Product from '@/components/common/Product'
import Spinner from '@/components/common/Spinner'
import { getProducts } from '@/repository/products/getProducts'
import { Product as TProduct } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialProducts?: TProduct[]
}

export default function ProductList({ initialProducts = [] }: Props) {
  // 항상 products 값은 2페이지까지 불러와져 있다고 가정한다.
  const [page, setPage] = useState<number>(2)
  const [products, setProducts] = useState<TProduct[]>(initialProducts)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  /*** react-intersection-observer
   * @description `Intersection Observer` : Viewport (사용자 화면에 보이는 영역)와 "대상 요소 사이"의 변화를 관찰하기 위해 사용하는 Browser API
   * @description `react-intersection-observer` : Intersection Observer를 사용하기 위한 React Hook 라이브러리
   * @see https://github.com/thebuilder/react-intersection-observer?tab=readme-ov-file#useinview-hook
   * ref : 대상 요소를 참조하기 위한 React Ref 객체
   * inView : 대상 요소가 화면에 보이는지 여부를 나타내는 boolean 값
   */
  const { ref, inView } = useInView({ threshold: 1 })

  /***
   * @description 상품 목록 조회 함수
   */
  const handleGetProducts = async ({
    fromPage,
    toPage,
  }: {
    fromPage: number
    toPage: number
  }) => {
    try {
      setIsLoading(true) // 데이터를 불러오는 중임을 표시한다
      const { data } = await getProducts(supabase, { fromPage, toPage }) // 2페이지씩 불러온다
      setProducts(prevProducts => [...prevProducts, ...data])

      // 더 이상 불러올 데이터가 없을 경우, isLastPage를 true로 변경한다
      if (data.length === 0) setIsLastPage(true)
    } finally {
      setIsLoading(false)
    }
  }

  /***
   * @description 초기 데이터를 불러온다
   */
  useEffect(() => {
    if (inView) {
      // inView가 true가 되면, 새로운 페이지를 불러온다
      ;(async () => {
        handleGetProducts({ fromPage: page, toPage: page + 1 })
        setPage(page + 1)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className="my-8">
      <div className="grid grid-cols-5 gap-4">
        {products?.map(({ id, title, price, imageUrls, createdAt }) => (
          <Link key={id} href={`/products/${id}`}>
            <Product
              title={title}
              price={price}
              imageUrl={imageUrls[0]}
              createdAt={createdAt}
            />
          </Link>
        ))}
      </div>
      {/* 데이터를 불러오는 중이면, Spinner를 보여준다 */}
      {isLoading && (
        <div className="text-center mt-2">
          <Spinner />
        </div>
      )}
      {/* 무한 스크롤을 위해, 맨 밑에 의미없는 div를 놓고, 그 div가 보이면, 추가 데이터 로드 */}
      {/* isLastPage가 true이거나, products가 비어있거나, products의 길이가 100개 이상이면, 더 이상 불러올 데이터가 없다고 판단한다 */}
      {!isLastPage && !!products.length && products.length < 100 && (
        <div ref={ref} />
      )}
    </div>
  )
}
