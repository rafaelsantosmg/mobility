import { Request, Response } from 'express'
import { calculateRideEstimate } from '../services/rideService'
import ServiceError from '../types/errors'

const estimateRideController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { origin, destination } = req.body

    if (!origin || !destination) {
      throw new ServiceError(
        'INVALID_INPUT',
        'Os dados de origem e destino são obrigatórios.'
      )
    }

    if (origin === destination) {
      throw new ServiceError(
        'INVALID_DATA',
        'O endereço de origem e destino não podem ser iguais.'
      )
    }

    const estimatedPrice = await calculateRideEstimate(origin, destination)

    res.status(200).json({ estimatedPrice })
  } catch (error) {
    if (error instanceof ServiceError) {
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
