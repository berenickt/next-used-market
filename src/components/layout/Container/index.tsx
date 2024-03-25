import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
}

/***
 * @description Wrapper 안쪽은 container 컴포넌트를 사용하여 레이아웃을 잡는다.
 */
export default function Container({ children, className }: Props) {
  return (
    <section
      className={classNames(className, 'w-full mx-auto px-24')}
      style={{ maxWidth: 1200 }}>
      {children}
    </section>
  )
}
