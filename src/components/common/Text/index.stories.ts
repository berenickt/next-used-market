import type { Meta, StoryObj } from '@storybook/react'

import Text from '.'

const meta = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'Hello World!', // 컴포넌트의 기본 텍스트
  },
} satisfies Meta<typeof Text>

/**
 * StoryObj 타입 : Storybook의 스토리 객체를 나타냄
 */
export default meta
type Story = StoryObj<typeof meta>

export const DefaultText: Story = {
  args: {},
}

export const SizedText: Story = {
  args: { size: '4xl' },
}

export const ColoredText: Story = {
  args: { color: 'red' },
}

export const WeightedText: Story = {
  args: { weight: 'bold' },
}
