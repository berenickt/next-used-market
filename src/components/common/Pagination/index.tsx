type Props = {
  /** 현재 사용자가 보고 있는 페이지 */
  currentPage: number
  /** 전체 항목의 갯수 (단, 한 페이지는 10개의 항목을 가지고 있어야 한다) */
  count: number
  /** 사용자가 페이지를 변경하였을때 호출할 콜백 함수 */
  handlePageChange: (pageNumber: number) => void
}

const btnClassName =
  'border border-slate-300 px-2 py-2 flex justify-center items-center leading-none disabled:opacity-30 hover:bg-slate-200'

/**
 * 페이지네이션을 표시하기 위한 컴포넌트
 */
export default function Pagination({
  currentPage,
  count,
  handlePageChange,
}: Props) {
  const totalPage = Math.ceil(count / 10) // 한 페이지에 10개의 항목이 있다고 가정, 올림 처리

  // max함수를 이용해 1보다 작은 값이 나오지 않도록 처리
  const startPageIndex = Math.max(
    1, // 1부터 시작하도록
    // 5개의 페이지의 시작페이지가 1이 되고, 현재 페이지가 중앙에 위치하도록 3인 경우 1이 나오도록
    Math.min(totalPage - 4, currentPage - 2),
  )
  // 마지막 페이지가 1인 경우 4를 더하고, 전체 페이지 중 최소값
  const endPageIndex = Math.min(startPageIndex + 4, totalPage)

  if (totalPage < 2) return null

  return (
    <div className="flex gap-1 my-3">
      {/* 이전 버튼 */}
      <button
        className={btnClassName}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}>
        이전
      </button>
      {/* 페이지 버튼 */}
      {Array.from({ length: endPageIndex - startPageIndex + 1 }).map(
        (_, idx) => {
          const pageIndex = startPageIndex + idx
          return (
            <button
              className={btnClassName}
              key={pageIndex}
              disabled={pageIndex === currentPage}
              onClick={() => handlePageChange(pageIndex)}>
              {pageIndex}
            </button>
          )
        },
      )}
      {/* 다음 버튼 */}
      <button
        className={btnClassName}
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(currentPage + 1)}>
        다음
      </button>
    </div>
  )
}
