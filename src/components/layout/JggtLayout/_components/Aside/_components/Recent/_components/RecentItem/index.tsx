import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Text from '@/components/common/Text'
import { removeRecentItemId } from '@/utils/localstorage'

type Props = {
  id: string
  title: string
  price: number
  imageUrl: string
}

/***
 * @description 최근 본 상품을 보여주는 컴포넌트
 */
export default function RecentItem({ id, title, price, imageUrl }: Props) {
  const [isHover, setIsHover] = useState(false) // 마우스 호버 상태

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <Link href={`/products/${id}`}>
        {!isHover ? (
          // 마우스가 호버되지 않았을 때
          <div className="w-16 h-16 border border-grey-300 relative">
            <Image src={imageUrl} alt={title} fill />
          </div>
        ) : (
          // 마우스 호버되면, 상품 정보를 보여줌
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 right-0 h-16 w-52 bg-white flex">
              {/* 닫기 버튼 */}
              <div
                className="absolute bg-black flex justify-center items-center text-white cursor-pointer"
                style={{ width: 20, height: 20, left: -20 }}
                onClick={e => {
                  e.preventDefault() // 이벤트 버블링 방지
                  removeRecentItemId(id) // 최근 본 상품에서 삭제
                }}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '1rem' }}>
                  close
                </span>
              </div>
              {/* 상품의 정보 */}
              <div className="flex-1 overflow-hidden px-2 flex flex-col justify-center gap-2 border-black border-t border-l border-b">
                {/* truncate : 긴 문자열을 ...으로 줄여줌 */}
                <Text size="xs" className="truncate">
                  {title}sadhkfjkahsdfkadhfjkasdhkashdfjkadsfhjkadshfjksadf
                </Text>
                <Text size="xs"> {price.toLocaleString()}원 </Text>
              </div>
              {/* 상품 이미지 */}
              <div className="w-16 h-16 shrink-0 border-t border-b border-r border-black relative">
                <Image src={imageUrl} alt={title} fill />
              </div>
            </div>
          </div>
        )}
      </Link>
    </div>
  )
}
