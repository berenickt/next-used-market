import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Product from '@/components/common/Product'
import Text from '@/components/common/Text'
import MarkdownViewerSkeleton from '@/components/shared/MarkdownViewer/Skeleton'
import { getProductApi } from '@/repository/products/getProductApi'
import { getProductsByTag } from '@/repository/products/getProductsByTag'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

const MarkdownViewer = dynamic(
  () => import('@/components/shared/MarkdownViewer'),
  {
    ssr: false,
    loading: () => <MarkdownViewerSkeleton />,
  },
)

type Props = {
  params: { productId: string }
}

/**
 * @description 상품 상세 페이지 - 하단 상품 정보
 * @param params - productId
 * @returns
 */
export default async function ProductsDetailDetail({
  params: { productId },
}: Props) {
  const { data: product } = await getProductApi(productId) // 상품 정보 조회

  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const productsByTagsResult = await Promise.all(
    (product.tags || []).map(tag => getProductsByTag(supabase, tag)),
  )

  // flat() : 1단계 깊이의 배열을 평탄화
  const suggest = productsByTagsResult.map(({ data }) => data).flat()

  return (
    <>
      {/* 상품 정보 헤더 */}
      <div className="border-b border-grey pb-3">
        <Text size="xl">상품 정보</Text>
      </div>
      {/* 상품 설명 */}
      <div className="mt-5 mb-10">
        <MarkdownViewer value={product.description} />
      </div>
      {/* 중고 상품 여부, 교환 가능 여부 태그 */}
      <div className="border-y py-4 flex gap-2">
        <div className="rounded bg-slate-200 px-3 py-1 text-sm">
          {product.isUsed ? '중고상품' : '새 상품'}
        </div>
        <div className="rounded bg-slate-200 px-3 py-1 text-sm">
          {product.isChangeable ? '교환가능' : '교환불가'}
        </div>
      </div>
      {/* 거래 지역, 상품 태그 */}
      <div className="flex py-4 border-b mb-10">
        {/* 거래 지역 */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Text size="lg" color="grey">
            거래지역
          </Text>
          <Text color="grey"> {product.address} </Text>
        </div>
        {/* 상품 태그 */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Text size="lg" color="grey">
            상품태그
          </Text>
          <div className="flex gap-2 flex-wrap justify-center">
            {product.tags === null ? (
              <Text color="grey"> 상품 태그가 없습니다.</Text>
            ) : (
              product.tags.map(tag => (
                <div
                  key={tag}
                  className="bg-purple-200 rounded-xl px-2 text-sm">
                  {tag}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* 비슷한 상품 추천 */}
      {suggest.length === 0 ? null : (
        <div>
          <div>
            <Text size="xl">비슷한 상품</Text>
          </div>
          <div className="my-5 flex gap-3 flex-wrap">
            {suggest
              // 비슷한 상품은 최대 3개까지만 보여줍니다.
              .slice(0, 3)
              .map(({ id, title, price, createdAt, imageUrls }) => (
                <Link key={id} href={`/products/${id}`}>
                  <Product
                    title={title}
                    price={price}
                    createdAt={createdAt}
                    imageUrl={imageUrls[0]}
                  />
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  )
}
