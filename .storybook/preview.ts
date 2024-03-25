import type { Preview } from '@storybook/react'
import '../src/styles/globals.css' // Storybook에 tailwindcss 설정을 적용

// React 컴포넌트의 미리보기
const preview: Preview = {
  parameters: {
    // on으로 시작하고 대문자로 시작하는 이름을 가진 속성들을 찾는다.
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      // 컨트롤의 타입에 따라 일치하는 정규식을 정의
      matchers: {
        // color 타입의 컨트롤은 background 또는 color로 끝나는 속성 이름을 가질 수 있다.
        color: /(background|color)$/i,
        // date 타입의 컨트롤은 Date로 끝나는 속성 이름을 가질 수 있다.
        date: /Date$/i,
      },
    },
  },
}

export default preview
