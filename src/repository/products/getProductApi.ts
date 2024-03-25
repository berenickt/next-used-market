import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

/**
 * @description 상품 조회
 * @param productId
 * @see https://github.com/sindresorhus/camelcase-keys
 * supabase는 snake_case로 데이터를 반환하기 때문에, camelCase로 변환해주는 라이브러리를 사용
 */
export async function getProductApi(
  productId: string,
): Promise<{ data: Product }> {
  console.log('getProductApi', productId)
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`, {
    next: { tags: ['product'] },
  })
  const data = await res.json()

  return camelcaseKeys(data, { deep: true })
}
