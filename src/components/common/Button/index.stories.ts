import type { Meta, StoryObj } from '@storybook/react'

import Button from '.'

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'], // "autodocs" tags를 추가하면, 컴포넌트 문서 작성 가능
  args: {
    children: 'Hello World!', // 컴포넌트의 기본 텍스트
  },
} satisfies Meta<typeof Button>

/**
 * StoryObj 타입 : Storybook의 스토리 객체를 나타냄
 */
export default meta
type Story = StoryObj<typeof meta>

export const DefaultButton: Story = {
  args: {},
}
