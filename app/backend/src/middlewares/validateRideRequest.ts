import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Schema, ValidationError } from 'joi'

const validateRideRequest = (schema: Schema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error }: { error?: ValidationError } = schema.validate(req.body, {
      abortEarly: false,
    })

    if (error) {
      const errors = error.details.map((detail) => detail.message).join(', ')

      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: errors,
      })
      return
    }

    next()
  }
}

export default validateRideRequest
