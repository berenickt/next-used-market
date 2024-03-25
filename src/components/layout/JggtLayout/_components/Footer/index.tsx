import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

/**
 * @description Footer 컴포넌트는 중고장터 페이지의 하단을 잡는 컴포넌트
 */
export default function Footer() {
  return (
    <Wrapper>
      <aside className="border-t border-slate-300">
        <Container>
          <div className="py-5 flex gap-5">
            <Text>회사소개</Text>|<Text>이용약관</Text>|<Text>운영정책</Text>
          </div>
        </Container>
      </aside>
    </Wrapper>
  )
}
