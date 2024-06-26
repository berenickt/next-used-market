import classNames from 'classnames'

/***
 * React.ComponentPropsWithoutRef<'span'>은 span 요소의 ref을 제외한 모든 속성을 상속받는다.
 */
interface Props extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * 텍스트의 크기를 설정합니다. (기본값: md)
   */
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  /**
   * 텍스트의 색상을 설정합니다. (기본값: black)
   */
  color?: 'black' | 'grey' | 'red' | 'white'
  /**
   * 텍스트의 굵기를 설정합니다. (기본값: normal)
   */
  weight?: 'light' | 'normal' | 'bold'
}

/**
 * 일반적인 텍스트를 표시하기 위한 컴포넌트
 */
export default function Text({
  size = 'md',
  color = 'black',
  weight = 'normal',
  ...props // 나머지 모든 속성을 props로 전달
}: Props) {
  return (
    <span
      {...props}
      className={classNames(
        props.className, // 다른 클래스 이름이 있다면 그것도 포함
        {
          'text-4xl': size === '4xl',
          'text-3xl': size === '3xl',
          'text-2xl': size === '2xl',
          'text-xl': size === 'xl',
          'text-lg': size === 'lg',
          'text-base': size === 'md',
          'text-sm': size === 'sm',
          'text-xs': size === 'xs',
        },
        {
          'text-black': color === 'black',
          'text-zinc-400': color === 'grey',
          'text-red-500': color === 'red',
          'text-white': color === 'white',
        },
        {
          'font-light': weight === 'light',
          'font-normal': weight === 'normal',
          'font-bold': weight === 'bold',
        },
      )}
    />
  )
}
