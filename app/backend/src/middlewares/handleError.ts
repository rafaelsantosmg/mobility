import { NextFunction, Request, Response } from 'express'

interface ErrorWithStatus extends Error {
  status?: number
}

function handleError(
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err.status) {
    res.status(err.status).json({ message: err.message })
  }
  res.status(500).json({ message: 'Internal Error' })
}

export default handleError
