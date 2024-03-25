import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ko-kr'

import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'

type Props = {
  disabled?: boolean
  initialValue?: string
  handleOnChage: (value: string) => void
}

/**
 * @description 마크다운 에디터
 * @Param {boolean} disabled - 비활성화 여부
 * @Param {string} initialValue - 초기값
 * @Param {function} handleOnChage - 변경 이벤트
 * @see https://www.npmjs.com/package/@toast-ui/react-editor
 * @see 옵션 https://nhn.github.io/tui.editor/latest/ToastUIEditorCore
 * @see toolbarItems https://nhn.github.io/tui.editor/latest/tutorial-example15-customizing-toolbar-buttons
 * @see 다국어처리 https://nhn.github.io/tui.editor/latest/tutorial-example16-i18n
 * @see https://one-day-one-coding.tistory.com/entry/Toast-UI-Editor-%EC%84%A4%EC%B9%98-%EC%8B%9C-%EC%98%A4%EB%A5%98%EB%B0%9C%EC%83%9D-force-legacy-peer-deps
 */
export default function MarkdownEditor({
  disabled,
  initialValue,
  handleOnChage,
}: Props) {
  // 리뷰가 있는 경우, autoFocus를 비활성화
  const ref = useRef<Editor>(null)

  return (
    <div className="relative">
      {/* 비활성화 상태일 경우, 불투명 배경 추가 */}
      {disabled && (
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50 z-30" />
      )}
      <Editor
        autofocus={false}
        initialValue={initialValue}
        previewStyle="vertical"
        height="300px"
        initialEditType="wysiwyg"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'link'],
        ]}
        language="ko-KR"
        useCommandShortcut={true} // 단축키 사용 여부
        hideModeSwitch // 탭바 숨기기 모드
        ref={ref}
        onChange={() => {
          if (disabled) return
          // @see https://nhn.github.io/tui.editor/latest/ToastUIEditorCore
          // getInstance() : 에디터의 인스턴스를 가져옴
          // getMarkdown() : 에디터의 Markdown 내용을 가져옴
          handleOnChage(ref.current?.getInstance().getMarkdown() || '')
        }}
      />
    </div>
  )
}
