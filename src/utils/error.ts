/**
 * @description 인증 에러
 */
export class AuthError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'AuthError'
  }
}
