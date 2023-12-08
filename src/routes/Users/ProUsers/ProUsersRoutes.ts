import express from 'express'
import { DeleteOneProUser, createProUser, getAllProUser, getOneProUser, updateOneProUser, loginProUser } from '../../../controller/ProUserController'
import { authMiddleware } from '../../../middlewares/authToken'

const router = express.Router()

router.post('/registerProUser', createProUser)
router.post('/loginProUser', loginProUser)
router.get('/:id', getOneProUser)
router.get('', authMiddleware, getAllProUser)
router.put('/updateOneProUser/:id', updateOneProUser)
router.delete('/deleteOneProUser/:id', DeleteOneProUser)


export default router 