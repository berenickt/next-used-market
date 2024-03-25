'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import Text from '@/components/common/Text'
import {
  RECENT_KEYWORDS_KEY,
  addRecentKeyword,
  clearRecentKeyword,
  getRecentKeywords,
} from '@/utils/localstorage'

type Props = {
  handleClose: () => void
}

/**
 * @description localstorage를 활용한 최근 검색어 컴포넌트
 * @param handleClose 최근 검색어창 닫기 함수
 */
export default function Recent({ handleClose }: Props) {
  const [recents, setRecents] = useState<string[]>([]) // 최근 검색어

  /**
   * @description 최근 검색어 조회 후 상태 업데이트
   */
  const handleSetRecents = useCallback(() => {
    const recents = getRecentKeywords() // 최근 검색어 조회
    setRecents(recents)
  }, [])

  useEffect(() => {
    handleSetRecents()
  }, [handleSetRecents])

  useEffect(() => {
    const eventHandler = () => handleSetRecents()
    window.addEventListener(RECENT_KEYWORDS_KEY, eventHandler)

    return () => window.removeEventListener(RECENT_KEYWORDS_KEY, eventHandler)
  }, [handleSetRecents])

  return (
    <div className="flex flex-col h-full">
      {/* (1) 최근 검색어 리스트 영역 */}
      <div className="p-2 overflow-hidden flex-1">
        {/* (1-1) 최근 검색어 표시 제목 */}
        <div className="border-b border-red-500 pb-1 mb-2">
          <Text size="sm" color="red" weight="bold">
            최근 검색어
          </Text>
        </div>
        {/* (1-2) 최근 검색어 리스트 */}
        {recents.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <Text color="grey" size="sm">
              최근 검색어가 없습니다
            </Text>
          </div>
        ) : (
          <div className="h-full overflow-scroll pb-8">
            {recents.map(recent => (
              <Link
                // encodeURIComponent : URI 구성요소로 사용될 수 있는 문자열로 인코딩
                href={`/search?query=${encodeURIComponent(recent)}`} // 검색 페이지로 이동
                key={recent}
                prefetch={false}
                onClick={() => {
                  addRecentKeyword(recent)
                  handleClose()
                }}>
                {/* truncate : 검색어 길이가 길면 ... 으로 표시 */}
                <Text size="sm" key={recent} className="block my-1 truncate">
                  {recent}
                </Text>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* (2) 최근 검색어 하단 버튼 영역 */}
      <div className="bg-gray-100 flex justify-between items-center h-8 px-2">
        <Text size="sm" onClick={clearRecentKeyword} className="cursor-pointer">
          검색어 전체삭제
        </Text>
        <Text size="sm" onClick={handleClose} className="cursor-pointer">
          닫기
        </Text>
      </div>
    </div>
  )
}
