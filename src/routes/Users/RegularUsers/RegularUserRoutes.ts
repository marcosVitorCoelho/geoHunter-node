import express from 'express'
import { DeleteOneRegularUser, createRegularUser, getAllRegularUser, getOneRegularUser, updateOneRegularUser, loginUser } from '../../../controller/RegularUserController'
import { authMiddleware } from '../../../middlewares/authToken'

const router = express.Router()

router.post('/registerRegularUser', createRegularUser)
router.post('/loginRegularUser', loginUser)
router.get('/getOneRegularUser/:id', getOneRegularUser)
router.get('/getAllRegularUser', authMiddleware, getAllRegularUser)
router.put('/updateOneRegularUser/:id', updateOneRegularUser)
router.delete('/deleteOneRegularUser/:id', DeleteOneRegularUser)


export default router 