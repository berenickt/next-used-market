import { fakerKO as faker } from '@faker-js/faker'

import {
  ChatMessage,
  ChatRoom,
  Follow,
  Like,
  Product,
  Review,
  Shop,
} from '@/types'

/*** Faker를 사용하여 Mock 데이터 생성
 * @see https://fakerjs.dev/guide/usage.html#node-js
 *
 * 고유 ID 생성
 * @see https://fakerjs.dev/api/datatype.html#uuid
 *
 * 상품명 생성
 * @see https://fakerjs.dev/api/commerce.html#productname
 *
 * 숫자형 데이터 생성
 * @see https://fakerjs.dev/api/number.html#int
 *
 * 도시명 생성
 * @see https://fakerjs.dev/api/location.html#city
 *
 * 설명 문장 생성
 * @see https://fakerjs.dev/api/lorem.html#sentences
 *
 * 이미지 주소 생성
 * @see https://fakerjs.dev/api/image.html#datauri
 *
 * boolean 값 생성
 * @see https://fakerjs.dev/api/datatype.html#boolean
 *
 * 단어 생성
 * @see https://fakerjs.dev/api/lorem.html#word
 *
 * 생성 날짜(과거)
 * @see https://fakerjs.dev/api/date.html#past
 */

/** (1)
 * @description 상품 목록 조회 Mock API
 * @param defaultValue 기본값으로 받을 데이터가 있으면 사용하고, 없으면 Faker로 생성
 */
export function getMockProductData(defaultValue?: Partial<Product>) {
  const data: Product = {
    id: defaultValue?.id ?? faker.string.uuid(),
    title: defaultValue?.title ?? faker.commerce.productName(),
    price:
      defaultValue?.price ?? faker.number.int({ min: 10, max: 1000 }) * 100,
    address: defaultValue?.address ?? '서울특별시 중구',
    description: defaultValue?.description ?? faker.lorem.sentences(10, '\n'),
    imageUrls:
      defaultValue?.imageUrls ??
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
        faker.image.dataUri(),
      ),
    isChangeable: defaultValue?.isChangeable ?? faker.datatype.boolean(),
    isUsed: defaultValue?.isUsed ?? faker.datatype.boolean(),
    tags:
      defaultValue?.tags ??
      (faker.datatype.boolean()
        ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
            faker.lorem.word(),
          )
        : null),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    purchaseBy:
      defaultValue?.purchaseBy ??
      (faker.datatype.boolean() ? faker.string.uuid() : null),
  }
  return data
}

/** (2)
 * @description 상점 목록 조회 Mock API
 */
export function getMockShopData(defaultValue?: Partial<Shop>) {
  const data: Shop = {
    id: defaultValue?.id ?? faker.string.uuid(),
    name: defaultValue?.name ?? faker.internet.displayName(),
    imageUrl: defaultValue?.imageUrl ?? faker.image.dataUri(),
    introduce: defaultValue?.introduce ?? faker.lorem.sentences(3, '\n'),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

/** (3)
 * @description 리뷰 목록 조회 Mock API
 */
export function getMockReviewData(defaultValue?: Partial<Review>) {
  const data: Review = {
    id: defaultValue?.id ?? faker.string.uuid(),
    productId: defaultValue?.productId ?? faker.string.uuid(),
    contents: defaultValue?.contents ?? faker.lorem.sentences(3, '\n'),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

/** (4)
 * @description 좋아요 목록 조회 Mock API
 */
export function getMockLikeData(defaultValue?: Partial<Like>) {
  const data: Like = {
    id: defaultValue?.id ?? faker.string.uuid(),
    productId: defaultValue?.productId ?? faker.string.uuid(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

/** (5)
 * @description 팔로우 목록 조회 Mock API
 */
export function getMockFollowData(defaultValue?: Partial<Follow>) {
  const data: Follow = {
    id: defaultValue?.id ?? faker.string.uuid(),
    followingShopId: defaultValue?.followingShopId ?? faker.string.uuid(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

/** (6)
 * @description 채팅방 목록 조회 Mock API
 */
export function getMockChatRoomData(defaultValue?: Partial<ChatRoom>) {
  const data: ChatRoom = {
    id: defaultValue?.id ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    fromShopId: defaultValue?.fromShopId ?? faker.string.uuid(),
    toShopId: defaultValue?.toShopId ?? faker.string.uuid(),
  }
  return data
}

/** (7)
 * @description 채팅 메시지 목록 조회 Mock API
 */
export function getMockChatMessageData(defaultValue?: Partial<ChatMessage>) {
  const data: ChatMessage = {
    id: defaultValue?.id ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    chatRoom: defaultValue?.chatRoom ?? faker.string.uuid(),
    message:
      defaultValue?.message ??
      (faker.datatype.boolean()
        ? faker.lorem.sentences(3, '\n')
        : faker.image.dataUri()),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
  }
  return data
}

/** (8)
 * @description 이미지 주소 생성
 */
export function getMockImageDataUri() {
  return faker.image.dataUri()
}

/** (9)
 * @description 3초간 시간 지연을 하고, Promise를 반환을 이용해 API 호출을 가정하는 함수
 */
export const timeout = (ms = 3000) =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })
