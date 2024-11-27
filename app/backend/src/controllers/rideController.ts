import { Request, Response } from 'express'

import { isServiceError } from '../Errors/errors'
import { calculateRideEstimate, rideCreateHistory } from '../services/rideService'

export const rideEstimateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await calculateRideEstimate(req.body)

    res.status(200).json(response)
  } catch (error) {
    if (isServiceError(error)) {
      res.status(404).json({
        error_code: 'NOT_FOUND',
        error_description: 'Não foi encontrado um ride com esse ID.',
      })
    }
  }
}

export const rideConfirmController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await rideCreateHistory(req.body)

    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({
      error_code: 'NOT_FOUND',
      error_description: 'Não foi encontrado um ride com esse ID.',
    })
  }
}
