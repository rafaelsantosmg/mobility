import { Request, Response } from 'express'

import { default as createServiceError, isServiceError } from '../Errors/errors'
import { calculateRideEstimate } from '../services/rideService'

const estimateRideController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination } = req.body

    if (!origin || !destination) {
      throw createServiceError(
        'INVALID_INPUT',
        'Os dados de origem e destino são obrigatórios.'
      )
    }

    if (origin === destination) {
      throw createServiceError(
        'INVALID_DATA',
        'O endereço de origem e destino não podem ser iguais.'
      )
    }

    const estimatedPrice = await calculateRideEstimate(origin, destination)

    res.status(200).json({ estimatedPrice })
  } catch (error) {
    if (isServiceError(error)) {
      res.status(400).json({
        error_code: error.error_code,
        error_description: error.message,
      })
    } else {
      res.status(500).json({
        error_code: 'SERVER_ERROR',
        error_description: 'Ocorreu um erro interno no servidor.',
      })
    }
  }
}

export default estimateRideController
