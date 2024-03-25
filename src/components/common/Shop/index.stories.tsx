import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import Shop from '.'

const meta = {
  title: 'Shop',
  component: Shop,
  tags: ['autodocs'],
  args: {},
  // decorators : 추가적인 값을 부여할 수 있는 옵션
  decorators: [
    // Story 하나 하나를 그릴 떄, 데코레이터로 감싸져서 그려짐
    Story => (
      <div className="border p-2" style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Shop>

/**
 * StoryObj 타입 : Storybook의 스토리 객체를 나타냄
 */
export default meta
type Story = StoryObj<typeof meta>

export const DefaultShop: Story = {
  args: {
    name: '상점',
    productCount: 999,
    followerCount: 999,
    type: 'row',
  },
}

export const ImagedShop: Story = {
  args: {
    name: '상점',
    productCount: 999,
    followerCount: 999,
    type: 'row',
    profileImageUrl: faker.image.dataUri(), // Faker 랜덤 이미지 주소 생성
  },
}
