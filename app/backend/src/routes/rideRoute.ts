import { Router } from 'express'

import {
  rideConfirmController,
  rideEstimateController,
} from '../controllers/rideController'
import validateRideRequest from '../middlewares/validateRideRequest'
import rideEstimateSchema, { rideConfirmSchema } from '../schemas/rideSchemas'

const rideRouter = Router()

rideRouter.post(
  '/estimate',
  validateRideRequest(rideEstimateSchema),
  rideEstimateController
)
rideRouter.patch(
  '/confirm',
  validateRideRequest(rideConfirmSchema),
  rideConfirmController
)

export default rideRouter
