import { redirect } from 'next/navigation'

/**
 * @description 상점 페이지
 * @param param0
 * @returns
 */
export default async function Shops({
  params,
}: {
  params: { shopId: string }
}) {
  return redirect(`/shops/${params.shopId}/products`)
}
