import classNames from 'classnames'

import ShopProfileImage from '../ShopProfileImage'
import Text from '../Text'

interface Props {
  /** 상점 이름 */
  name: string
  /** 상점 프로필 이미지 주소 */
  profileImageUrl?: string
  /** 상점에 등록된 상품 수 */
  productCount: number
  /** 상점을 팔로우 하는 팔로워 수 */
  followerCount: number
  /** 상점 컴포넌트 뷰 타입 */
  type?: 'row' | 'column'
  /** 상점 타이틀 영역 클릭시 동작할 콜백 함수 */
  handleClickTitle?: () => void
  /** 상점 프로필 이미지 영역 클릭시 동작할 콜백 함수 */
  handleClickProfileImage?: () => void
  /** ProductCount 영역 클릭시 동작할 콜백 함수 */
  handleClickProductCount?: () => void
  /** FollowerCount 영역 클릭시 동작할 콜백 함수 */
  handleClickFollowerCount?: () => void
}

export default function Shop({
  name,
  profileImageUrl,
  productCount,
  followerCount,
  handleClickTitle,
  handleClickProfileImage,
  handleClickProductCount,
  handleClickFollowerCount,
  type = 'row',
}: Props) {
  return (
    <div
      className={classNames(
        'flex',
        // row, column에 따라 다른 flex 스타일 적용
        {
          'flex-row': type === 'row',
          'flex-col': type === 'column',
        },
        type === 'column' && 'gap-1 items-center',
      )}>
      {/* 상점 이미지 영역 */}
      <div
        className={classNames(
          'w-14',
          handleClickProfileImage && 'cursor-pointer',
        )}
        onClick={handleClickProfileImage}>
        <ShopProfileImage imageUrl={profileImageUrl} />
      </div>
      {/* 상정 설명 영역 */}
      <div
        className={classNames(
          'flex flex-col overflow-hidden', // overflow-hidden : 요소 밖으로 삐져나오는 컨텐츠를 숨김
          type === 'row' && 'ml-3 justify-around',
          type === 'column' && 'w-full', // column 타입일 때 가로폭 100%
        )}>
        {/* 상점 설명 - 제목 */}
        <div
          className={classNames(
            'truncate', // 글자가 너무 길면 ...으로 표시
            type === 'column' && 'text-center',
            handleClickTitle && 'cursor-pointer',
          )}
          onClick={handleClickTitle}>
          <Text>{name}</Text>
        </div>
        {/* 상점 설명 - 상품 수, 팔로워 수 */}
        <Text
          size="sm"
          color={type === 'row' ? 'grey' : 'black'}
          className={classNames(
            'flex gap-2',
            type === 'column' && 'justify-center',
          )}>
          {/* 상품 수 */}
          <div
            className={classNames(
              'text-center',
              handleClickProductCount && 'cursor-pointer',
            )}
            onClick={handleClickProductCount}>
            상품 {productCount.toLocaleString()}
          </div>
          |{/* 팔로워 수 */}
          <div
            className={classNames(
              'text-center',
              handleClickFollowerCount && 'cursor-pointer',
            )}
            onClick={handleClickFollowerCount}>
            팔로워 {followerCount.toLocaleString()}
          </div>
        </Text>
      </div>
    </div>
  )
}
