import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

import Text from '../Text'

interface Props {
  /** 상품 이름 */
  title: string
  /** 상품 가격 */
  price: number
  /** 상품 등록 시간 */
  createdAt: string
  /** 상품 대표 이미지 주소 */
  imageUrl: string
  /** 상품 판매 여부 */
  isSoldOut?: boolean
}

/***
 * @see https://day.js.org/docs/en/plugin/relative-time#docsNav
 */
dayjs.extend(relativeTime).locale('ko')

/**
 * 상품 미리보기 컴포넌트
 * @returns
 */
export default function Product({
  title,
  price,
  createdAt,
  imageUrl,
  isSoldOut,
}: Props) {
  return (
    <div className="flex flex-col border border-slate-300 relative">
      {/* 판매 완료 시 투명도 및 판매 완료 문구 표시 */}
      {isSoldOut && (
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-70 flex justify-center items-center">
          <Text color="white">판매 완료</Text>
        </div>
      )}
      {/* 이미지 */}
      <div
        className="h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* 설명 */}
      <div className="h-20 flex flex-col px-3 justify-center">
        {/* 제품명 */}
        {/* 텍스트가 너무 길어서 한 줄로 표시되지 않을 때, 넘치는 부분을 ...으로 표시 */}
        <Text className="text-ellipsis overflow-hidden whitespace-nowrap block">
          {title}
        </Text>
        <div className="flex justify-between items-center flex-wrap">
          {/* 가격 */}
          {/* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#using_tolocalestring */}
          <div>
            <Text weight="bold"> {price.toLocaleString()} </Text>
            <Text weight="bold" size="sm">
              원
            </Text>
          </div>
          {/* 날짜 */}
          {/* @see https://day.js.org/docs/en/display/from-now#docsNav */}
          <Text weight="light" color="grey" size="sm">
            {dayjs(createdAt).fromNow()}
          </Text>
        </div>
      </div>
    </div>
  )
}
