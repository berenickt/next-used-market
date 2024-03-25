import Spinner from '@/components/common/Spinner'

/***
 * @description MarkdownEditor의 Skeleton UI
 * 300px는 MarkdownEditor의 높이에 맞춘 것
 */
export default function MarkdownEditorSkeleton() {
  return (
    <div style={{ height: 300 }} className="flex justify-center items-center ">
      <Spinner />
    </div>
  )
}
