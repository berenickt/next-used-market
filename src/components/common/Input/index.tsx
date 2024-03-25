import classNames from 'classnames'
import { ForwardedRef, forwardRef } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'input'> {}

/**
 * Input 요소를 처리하기 위한 컴포넌트
 * @description forwardRef : ref를 전달하기 위한 함수
 * @see https://ko.react.dev/reference/react/forwardRef
 */
const Input = forwardRef(function Input(
  { ...props }: Props, // 나머지 모든 속성을 props로 전달
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      ref={ref} // ref를 전달
      className={classNames(
        props.className,
        'border text-base p-2 outline-none text-black disabled:opacity-50',
      )}
    />
  )
})

export default Input
