'use client'

import '@toast-ui/editor/dist/toastui-editor.css'

import { Viewer } from '@toast-ui/react-editor'

type Props = {
  value: string
}

/**
 * @description 마크다운 뷰어
 * @param Props {string} value - 마크다운 값
 * @see https://www.npmjs.com/package/@toast-ui/react-editor
 * @see https://nhn.github.io/tui.editor/latest/ToastUIEditorViewer
 * @see https://velog.io/@bluejoyq/react-toast-ui-editor
 */
export default function MarkdownViewer({ value }: Props) {
  return (
    <div className="tui--large">
      <Viewer initialValue={value} />
    </div>
  )
}
