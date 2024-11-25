import { Router } from "express";
import estimateRideController from "../controllers/rideController";

const rideRouter = Router();

rideRouter.post('/estimate', estimateRideController);

export default rideRouter;
