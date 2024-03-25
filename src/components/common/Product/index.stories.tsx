import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import Product from '.'

const meta = {
  title: 'Product',
  component: Product,
  tags: ['autodocs'], // "autodocs" tags를 추가하면, 컴포넌트 문서 작성 가능
  args: {},
  // decorators : 추가적인 값을 부여할 수 있는 옵션
  decorators: [
    // Story 하나 하나를 그릴 떄, 데코레이터로 감싸져서 그려짐
    // 여기서는 가로 사이즈를 52로 고정하는 데코레이터를 추가
    Story => (
      <div className="w-52">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Product>

/**
 * StoryObj 타입 : Storybook의 스토리 객체를 나타냄
 */
export default meta
type Story = StoryObj<typeof meta>

export const DefaultProduct: Story = {
  args: {
    title: '샘플 제품',
    price: 50_000,
    createdAt: '2021-01-01',
    imageUrl: faker.image.dataUri(), // Faker 랜덤 이미지 주소 생성
  },
}

export const SoldOutProduct: Story = {
  args: {
    title: '샘플 제품',
    price: 50_000,
    createdAt: '2021-01-01',
    imageUrl: faker.image.dataUri(), // Faker 랜덤 이미지 주소 생성
    isSoldOut: true,
  },
}
