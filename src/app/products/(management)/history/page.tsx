import { redirect } from 'next/navigation'

/**
 * @description 상품 구매/판매 내역
 * @returns
 */
export default function ProductsHistory() {
  return redirect('/products/history/sell')
}
