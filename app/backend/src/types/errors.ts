export interface ErrorWithStatus extends Error {
  status?: number
}

export default class ServiceError extends Error {
  error_code: string

  constructor(error_code: string, message: string) {
    super(message)
    this.name = 'ServiceError'
    this.error_code = error_code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError)
    }
  }
}
