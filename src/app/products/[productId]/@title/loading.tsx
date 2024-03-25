import Spinner from '@/components/common/Spinner'

/**
 * @description 상품 상세 타이틀 로딩
 */
export default function ProductsDetailTitleLoading() {
  return (
    <div className="h-96 flex justify-center items-center">
      <Spinner />
    </div>
  )
}
