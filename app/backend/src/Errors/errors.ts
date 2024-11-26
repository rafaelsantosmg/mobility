export function isServiceError(
  error: unknown
): error is { error_code: string; message: string } {
  return (
    error !== null &&
    typeof error === 'object' &&
    'error_code' in error &&
    'message' in error
  )
}

function createServiceError(
  error_code: string,
  message: string
): Error & { error_code: string } {
  const error = new Error(message) as Error & { error_code: string }
  error.name = 'ServiceError'
  error.error_code = error_code

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, createServiceError)
  }

  return error
}

export default createServiceError
