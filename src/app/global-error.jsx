'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

/**
 * @description 글로벌 에러 페이지
 */
export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  )
}
