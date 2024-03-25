import classNames from 'classnames'

import Likes from './_components/Likes'
import Recent from './_components/Recent'
import styles from './style.module.scss'

import Container from '@/components/layout/Container'

/**
 * @description 메인 화면 오른쪽에서 좋아요, 최근 본 상품을 보여주는 컴포넌트
 */
export default function Aside() {
  return (
    // relative : 자식 요소의 위치를 absolute로 설정할 때, 이 요소를 기준으로 위치를 잡는다.
    <Container className="relative">
      <aside
        className={classNames(
          styles.aside, //
          'absolute top-8 flex flex-col gap-2 w-24',
        )}>
        <Likes />
        <Recent />
      </aside>
    </Container>
  )
}
