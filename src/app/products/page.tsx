import { redirect } from 'next/navigation'

/**
 * @description 상품 페이지
 */
export default async function Products() {
  return redirect('/products/manage')
}
