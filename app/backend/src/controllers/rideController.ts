import { Request, Response } from 'express'

import { isServiceError } from '../Errors/errors'
import RideService from '../services/rideService'

const rideService = RideService()

function RideController() {
  const rideEstimateController = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await rideService.rideEstimate(req.body)

      res.status(200).json(response)
    } catch (error) {
      if (isServiceError(error)) {
        res.status(error.status).json({
          error_code: error.error_code,
          error_description: error.error_description,
        })
      } else {
        res.status(500).json({
          error_code: 'SERVER_ERROR',
          error_description: 'Ocorreu um erro inesperado.',
        })
      }
    }
  }

  const rideConfirmController = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await rideService.rideCreateHistory(req.body)

      res.status(200).json(response)
    } catch (error) {
      if (isServiceError(error)) {
        res.status(error.status).json({
          error_code: error.error_code,
          error_description: error.error_description,
        })
        return
      } else {
        res.status(500).json({
          error_code: 'SERVER_ERROR',
          error_description: 'Ocorreu um erro inesperado.',
        })
      }
    }
  }

  const rideGetHistoryController = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await rideService.rideGetHistory(req)

      res.status(200).json(response)
    } catch (error) {
      if (isServiceError(error)) {
        res.status(error.status).json({
          error_code: error.error_code,
          error_description: error.error_description,
        })
      } else {
        res.status(500).json({
          error_code: 'SERVER_ERROR',
          error_description: 'Ocorreu um erro inesperado.',
        })
      }
    }
  }

  return {
    rideEstimateController,
    rideConfirmController,
    rideGetHistoryController,
  }
}

export default RideController
