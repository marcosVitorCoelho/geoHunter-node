import express from 'express'
import { getDistance } from '../controller/DistanceBtwController'
const router = express.Router()
import { authMiddleware } from '../middlewares/authToken'

router.get('/getDistance', getDistance, authMiddleware)

export default router