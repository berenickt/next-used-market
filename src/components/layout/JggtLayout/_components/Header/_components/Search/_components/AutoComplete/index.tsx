'use client'

import { throttle } from 'lodash'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import Text from '@/components/common/Text'
import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { addRecentKeyword } from '@/utils/localstorage'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  query: string
  handleClose: () => void
}

/**
 * @description 검색 자동완성 컴포넌트
 * @param query 검색어
 * @param handleClose 자동완성창 닫기 함수
 */
export default function AutoComplete({ query, handleClose }: Props) {
  const [keywords, setKeywords] = useState<string[]>([])

  /***
   * @description 검색어로 상품을 검색
   * `Throttle` : 기능이 '일정한 주기' 마다 실행되도록 통제
   * `Debounce` : 일정한 주기가 지나고 '한번만' 실행되게끔 통제
   *
   * lodash의 throttle 함수를 사용하여, 0.5초마다 검색어로 상품을 검색
   * @see https://lodash.com/docs/4.17.15#throttle
   *
   * useMemo : 함수를 메모이제이션하여, 의존성이 변경될 때만 함수를 재생성
   * 검색이 자주 발생하는 경우, throttle 함수를 재생성하지 않도록 설정
   */
  const handleSearch = useMemo(
    () =>
      throttle(async (query: string) => {
        // 검색어가 없으면, 추천 검색어를 초기화
        if (!query) {
          setKeywords([])
          return
        }
        // supabase 연동하여 검색어로 상품을 검색
        const { data } = await getProductsByKeyword(supabase, {
          query,
          fromPage: 0,
          toPage: 2,
        })
        // 상품의 제목만 추출하여, 검색어로 표시
        setKeywords(data.map(({ title }) => title))
      }, 500),
    [],
  )

  // 검색어가 변경될 때마다, 검색어로 상품을 검색
  useEffect(() => {
    handleSearch(query)
  }, [handleSearch, query])

  return (
    <div className="flex flex-col h-full">
      {/* (1) 자동완성창 본문 영역 */}
      <div className="p-2 overflow-hidden flex-1">
        {/* (1-1) 자동완성 표시 제목 */}
        <Link
          href={`/search/shop?query=${encodeURIComponent(query)}`}
          prefetch={false}
          className="border-b border-grey-300 pb-1 mb-2 flex items-center"
          onClick={() => handleClose()}>
          {/* (1-1-1) 상점검색 아이콘 로고 */}
          <span className="material-symbols-outlined shrink-0">storefront</span>
          <Text size="sm" className="ml-1 shrink-0">
            상점 검색 {'>'}
          </Text>
          {/* (1-1-2) 검색어를 query 그대로 표시, truncate : 검색어 길이가 길면 ... 으로 표시 */}
          <Text size="sm" color="red" className="mx-1 truncate">
            {query}
          </Text>
          {/* shrink-0 : 최대 너비를 차지하도록 설정 */}
          <Text size="sm" color="grey" className="shrink-0">
            상점명으로 검색
          </Text>
        </Link>
        {/* (1-2) 자동완성 리스트 */}
        {keywords.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <Text color="grey" size="sm">
              추천 검색어가 없습니다
            </Text>
          </div>
        ) : (
          <div className="h-full overflow-scroll pb-8">
            {keywords.map(keyword => (
              <Link
                key={keyword}
                href={`/search?query=${encodeURIComponent(keyword)}`}
                prefetch={false}
                onClick={() => {
                  addRecentKeyword(keyword) // 최근 검색어 추가
                  handleClose()
                }}>
                {/* truncate : 검색어 길이가 길면 ... 으로 표시 */}
                <Text size="sm" className="block my-1 truncate cursor-pointer">
                  {keyword}
                </Text>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* (2) 자동완성 하단 버튼 영역 */}
      <div className="bg-gray-100 flex justify-end items-center h-8 px-2">
        <Text size="sm" onClick={handleClose} className="cursor-pointer">
          닫기
        </Text>
      </div>
    </div>
  )
}
