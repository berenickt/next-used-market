'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import MarkdownEditorSkeleton from '@/components/shared/MarkdownEditor/Skeleton'
import { createReview } from '@/repository/reviews/createReview'
import { Product, Review } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  product: Product
  review: Review | null
}

/*** next/dynamic : Next.js에서 Lazy Loading을 사용하기 위한 방법
 * `Lazy Loading` : 리소스를 필요한 경우에만 로드하는 기술
 * - 필요한 경우메나 로드하기 때문에 초기 로딩 시간을 줄일 수 있음
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
 */
const MarkdownEditor = dynamic(
  // Lazy Loading할 컴포넌트
  () => import('@/components/shared/MarkdownEditor'),
  {
    // ssr 환경에서 Lazy Loading을 사용할지 여부 (기본값: true)
    // - false로 설정하면 클라이언트에서만 컴포넌트를 로드함
    ssr: false,
    // Lazy Loading 진행 중에 Fallback을 노출하기 위한 파라미터
    // 명시적으로 loading을 통해 Fallback을 부여하지 않더라도
    // Suspense 컴포넌트를 사용해 Fallback 노출이 가능하다.
    loading: () => <MarkdownEditorSkeleton />,
  },
)

/**
 * @description 리뷰 작성 폼
 * @param Props { product, review }
 */
export default function ReviewForm({ product, review }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>(review?.contents || '')

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await createReview(supabase, {
        productId: product.id,
        contents: value,
      })
      location.reload()
    } catch (e) {
      alert('리뷰 작성을 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <Container>
        <div className="my-5">
          <Text size="2xl" color="red">
            {product.title}
          </Text>
          <Text size="xl" weight="light">
            의 구매 후기를 작성해주세요.
          </Text>
        </div>
        <div>
          <MarkdownEditor
            initialValue={value}
            disabled={!!review} // 리뷰가 있을 경우 수정 불가
            handleOnChage={value => setValue(value)}
          />
          <div className="flex justify-end mt-2">
            <Button
              color="red"
              onClick={handleSubmit}
              disabled={!!review}
              isLoading={isLoading}>
              작성하기
            </Button>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
