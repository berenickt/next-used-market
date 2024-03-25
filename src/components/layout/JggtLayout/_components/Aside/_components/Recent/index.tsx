'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import RecentItem from './_components/RecentItem'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'
import { RECENT_ITEM_IDS_KEY, getRecentItemIds } from '@/utils/localstorage'
import supabase from '@/utils/supabase/browserSupabase'

/**
 * @description aside에서 최근 본 상품을 보여주는 컴포넌트
 */
export default function Recent() {
  const [isLoading, setIsLoading] = useState(false)
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  /***
   * @description 최근 본 상품의 총 페이지 수를 기억 (올림 처리)
   */
  const totalPage = useMemo(
    () => Math.max(Math.ceil(recentProducts.length / 3) - 1, 0),
    [recentProducts],
  )

  /***
   * @description 최근 본 상품을 업데이트
   */
  const handleUpdateRecentProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const recentIds = getRecentItemIds()
      const results = await Promise.all(
        recentIds.map(productId => getProduct(supabase, productId)),
      )
      const products = results.map(({ data }) => data)
      setRecentProducts(products)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /***
   * @description totalPage가 변경될 때, currentPage를 totalPage 중 작은 값으로 변경
   */
  useEffect(() => {
    setCurrentPage(_curPage => Math.min(_curPage, totalPage))
  }, [totalPage])

  /***
   * @description handleUpdateRecentProducts를 최초 렌더링 시 호출
   */
  useEffect(() => {
    handleUpdateRecentProducts()
  }, [handleUpdateRecentProducts])

  /***
   * @description handleUpdateRecentProducts를 RECENT_ITEM_IDS_KEY 이벤트 발생 시 호출
   */
  useEffect(() => {
    const eventHandler = () => handleUpdateRecentProducts()
    window.addEventListener(RECENT_ITEM_IDS_KEY, eventHandler) // 최근 본 상품이 변경될 때마다 호출
    return () => window.removeEventListener(RECENT_ITEM_IDS_KEY, eventHandler) // 이벤트 리스너 제거
  }, [handleUpdateRecentProducts])

  return (
    <div className="border border-grey p-2 bg-white flex flex-col items-center">
      <Text size="xs">최근본상품</Text>
      {isLoading ? (
        // 로딩 중일 때
        <div className="py-5">
          <Spinner />
        </div>
      ) : recentProducts.length === 0 ? (
        // 최근 본 상품이 없을 때
        <div className="mt-2 text-center">
          <Text size="xs" color="grey" className="block">
            최근 본 상품이 없습니다
          </Text>
        </div>
      ) : (
        // 최근 본 상품이 있을 때
        <>
          <Text size="sm" color="red" weight="bold">
            {recentProducts.length}
          </Text>
          <div className="border-t border-black border-dashed pt-3 mt-2 flex flex-col gap-2">
            {/* 최근 본 상품 목록은 3개씩 보여줌 */}
            {recentProducts
              // 맨 처음 로딩 시, 0~3까지 자르기
              .slice(currentPage * 3, (currentPage + 1) * 3)
              .map(({ id, title, price, imageUrls }) => (
                <RecentItem
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  imageUrl={imageUrls[0]}
                />
              ))}
          </div>
          <div className="flex justify-between items-center mt-2 gap-1">
            {/* 이전 버튼 */}
            <button
              className="border border-grey-300 h-5 w-5 flex justify-center items-center"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}>
              <Text size="xs" color="grey">
                {'<'}
              </Text>
            </button>
            {/* 현재 페이지 / 총 페이지 표시 */}
            <Text size="xs" color="grey">
              {currentPage + 1} / {totalPage + 1}
            </Text>
            {/* 다음 버튼 */}
            <button
              className="border border-grey-300 h-5 w-5 flex justify-center items-center"
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage(currentPage + 1)}>
              <Text size="xs" color="grey">
                {'>'}
              </Text>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
