export interface ServiceError extends Error {
  error_code: string
  error_description: string
  status: number
}

export function isServiceError(error: unknown): error is ServiceError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'status' in error &&
    'error_code' in error &&
    'error_description' in error
  )
}

export function createServiceError(
  error_code: string,
  error_description: string,
  status: number
): ServiceError {
  const error = new Error(error_description) as ServiceError
  error.name = 'ServiceError'
  error.error_code = error_code
  error.error_description = error_description
  error.status = status

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, createServiceError)
  }

  return error
}

export default createServiceError
