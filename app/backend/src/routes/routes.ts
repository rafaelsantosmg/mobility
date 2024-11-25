import rideRouter from "./rideRoute";

const router = require('express').Router();

router.use('/ride', rideRouter);

export default router;
