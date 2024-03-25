'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import AutoComplete from './_components/AutoComplete'
import Recent from './_components/Recent'

import { addRecentKeyword } from '@/utils/localstorage'

/**
 * @description 헤더의 검색 컴포넌트
 */
export default function Search() {
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  const [search, setSearch] = useState('') // 검색어
  const [isFocused, setIsFocused] = useState(false) // 검색창에 포커스되었는지

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const shouldSearchClosed = !!ref.current?.contains(e.target as Node)
      setIsFocused(shouldSearchClosed)
    }

    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  return (
    <div className="relative flex-1" ref={ref}>
      <div className="w-full border-2 border-red-500 px-4 py-2">
        <form
          className="flex justify-between"
          onSubmit={e => {
            e.preventDefault()
            addRecentKeyword(search) // 최근 검색어 추가
            // encodeURIComponent : URI 구성요소로 사용될 수 있는 문자열로 인코딩
            router.push(`/search?query=${encodeURIComponent(search)}`) // 검색 페이지로 이동
          }}>
          <input
            className="w-full text-sm font-light outline-0"
            type="text"
            placeholder="상품명, 상점명 입력"
            value={search}
            onFocus={() => setIsFocused(true)} // 검색창에 포커스되면
            onChange={e => setSearch(e.target.value)}
          />
          <button className="flex justify-center items-center">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      {/* 포커스 되었을 떄, 자동완성 바깥창 표시 */}
      {isFocused && (
        <div
          className={classNames(
            'absolute w-full bg-white border border-grey-300 mt-2 h-96',
          )}>
          {/* 검색어가 있으면 자동완성, 없으면 최근 검색어 표시 */}
          {search ? (
            <AutoComplete
              query={search}
              handleClose={() => setIsFocused(false)}
            />
          ) : (
            <Recent handleClose={() => setIsFocused(false)} />
          )}
        </div>
      )}
    </div>
  )
}
