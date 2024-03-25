'use client'

import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

/**
 * @description 404 에러 페이지
 */
export default function Error() {
  return (
    <Wrapper>
      <Container>
        <h1 className="py-1"> 에러가 발생하였습니다 </h1>
      </Container>
    </Wrapper>
  )
}
