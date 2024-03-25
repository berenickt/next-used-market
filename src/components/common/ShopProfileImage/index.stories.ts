import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import ShopProfileImage from '.'

const meta = {
  title: 'ShopProfileImage',
  component: ShopProfileImage,
  tags: ['autodocs'], // "autodocs" tags를 추가하면, 컴포넌트 문서 작성 가능
  args: {},
} satisfies Meta<typeof ShopProfileImage>

/**
 * StoryObj 타입 : Storybook의 스토리 객체를 나타냄
 */
export default meta
type Story = StoryObj<typeof meta>

export const DefaultShopProfileImage: Story = {
  args: {},
}

export const ImagedShopProfileImage: Story = {
  args: {
    imageUrl: faker.image.dataUri(), // Faker 랜덤 이미지 주소 생성
  },
}
