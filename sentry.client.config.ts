// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

/*** sentry
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 * 애플리케이션에서 발생한 에러를 추적하는데 사용되는 서비스
 * 에러가 발생하면, `이메일/ Slack` 등으로 메일을 보내줌
 * 사용자가 발생한 에러를 확인하고, 브라우저 환경, 장치, 브라우저 버전 등을 확인할 수 있음
 * sentry 자동 설정
 */
Sentry.init({
  dsn: 'https://d19d3d72f7a783cfcb4f87dcba04153e@o4506495232245760.ingest.sentry.io/4506570667851776',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
