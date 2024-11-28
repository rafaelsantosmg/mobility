import { Router } from 'express'

import RideController from '../controllers/rideController'
import validateRideRequest from '../middlewares/validateRideRequest'
import rideEstimateSchema, { rideConfirmSchema } from '../schemas/rideSchemas'

const rideRouter = Router()
const rideController = RideController()

rideRouter.get('/:customer_id', rideController.rideGetHistoryController)

rideRouter.post(
  '/estimate',
  validateRideRequest(rideEstimateSchema),
  rideController.rideEstimateController
)
rideRouter.patch(
  '/confirm',
  validateRideRequest(rideConfirmSchema),
  rideController.rideConfirmController
)

export default rideRouter
