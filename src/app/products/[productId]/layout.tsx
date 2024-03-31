import { Metadata } from 'next'
import { ReactNode } from 'react'

import ProductWrapper from './_components/ProductWrapper'

import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProductApi } from '@/repository/products/getProductApi'

/***
 * @description Nextjs 13에서 제공하는 Parallel Routes
 */
type Props = {
  params: { productId: string }
  title: ReactNode // 폴더의 @detail/page.tsx에서 가져옴
  detail: ReactNode // 폴더의 @detail/page.tsx에서 가져옴
  shop: ReactNode // 폴더의 @detail/page.tsx에서 가져옴
}

/**
 * @description 상품 상세 페이지 메타데이터
 * @param param0
 * @returns
 */
export async function generateMetadata({ params: { productId } }: Props): Promise<Metadata> {
  const { data: product } = await getProductApi(productId)

  const title = `중고장터 - ${product.title}`

  return {
    title,
    openGraph: {
      title,
      images: product.imageUrls,
    },
  }
}

/**
 * @description 상품 상세 페이지
 * @param param0
 * @returns
 */
export default async function ProductsDetailLayout({
  params: { productId },
  title,
  detail,
  shop,
}: Props) {
  const { data: product } = await getProductApi(productId)

  return (
    <ProductWrapper productId={product.id}>
      <Wrapper>
        <Container>
          {title}
          <div className='flex border-t border-black pt-10'>
            <div className='w-4/6 pr-2'>{detail}</div>
            <div className='w-2/6 border-l border-grey pl-2'>{shop}</div>
          </div>
        </Container>
      </Wrapper>
    </ProductWrapper>
  )
}
