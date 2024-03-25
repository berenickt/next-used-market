import classNames from 'classnames'

import Spinner from '../Spinner'

/**
 * React.ComponentPropsWithoutRef<'button'>은 button 요소의 ref을 제외한 모든 속성을 상속받는다.
 */
interface Props extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * 버튼 크기를 지정합니다 (기본값: 'md')
   */
  size?: 'xs' | 'sm' | 'md'
  /**
   * 버튼 색상을 지정합니다 (기본값: 'black')
   */
  color?: 'black' | 'grey' | 'orange' | 'red'
  /**
   * 버튼 내부 색상이 칠해져 있는지 여부를 지정합니다
   */
  outline?: boolean
  /**
   * 사용자 인터렉션이 진행되고 있는지 여부를 지정합니다
   */
  isLoading?: boolean
  /**
   * 버튼이 width: 100%여야 하는 경우 사용합니다
   */
  fullWidth?: boolean
}

/**
 * 버튼을 표시하기 위한 컴포넌트
 */
export default function Button({
  color = 'black',
  size = 'md',
  outline,
  fullWidth,
  isLoading,
  children,
  ...props // 나머지 모든 속성을 props로 전달
}: Props) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled} // 로딩 중이면, disabled 속성을 추가
      className={classNames(
        props.className, // 다른 클래스 이름이 있다면 그것도 포함
        'disabled:opacity-50 relative', // disabled 속성이 있을 때, 투명도를 50%로 변경
        size === 'xs' && 'text-xs px-2',
        size === 'sm' && 'text-sm px-3 py-1',
        size === 'md' && 'text-base px-5 py-2',
        fullWidth && 'w-full',
        outline === true
          ? {
              'text-black': true,
              border: true,
              'border-black': color === 'black',
              'border-slate-300': color === 'grey',
              'border-orange-500': color === 'orange',
              'border-red-700': color === 'red',
            }
          : {
              'text-white': true,
              'bg-black': color === 'black',
              'bg-slate-300': color === 'grey',
              'bg-orange-500': color === 'orange',
              'bg-red-500': color === 'red',
            },
      )}>
      {isLoading ? (
        <>
          {/* absolute : 요소를 절대위치로 띄움 */}
          <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
            <Spinner size={size} />
          </div>
          {/* opacity-0 : 요소를 화면에만 숨겨서, 너비를 그대로 함  */}
          <div className="opacity-0">{children}</div>
        </>
      ) : (
        children
      )}
    </button>
  )
}
