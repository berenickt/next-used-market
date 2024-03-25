import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

/**
 * @description Wrapper 컴포넌트는 가장 바깥 쪽 레이아웃을 잡는 컴포넌트로, 모든 페이지에 사용
 */
export default function Wrapper({ children, className }: Props) {
  return (
    <section className={classNames(className, 'w-full')}>{children}</section>
  )
}
