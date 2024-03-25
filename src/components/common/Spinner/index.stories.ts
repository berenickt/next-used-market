import type { Meta, StoryObj } from '@storybook/react'

import Spinner from '.'

const meta = {
  title: 'Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>

/**
 * StoryObj 타입 : Storybook의 스토리 객체를 나타냄
 */
export default meta
type Story = StoryObj<typeof meta>

export const DefaultSpinner: Story = {
  args: {},
}
