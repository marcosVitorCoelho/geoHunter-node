import express from 'express'
import { DeleteOneRegularUser, createRegularUser, getAllRegularUser, getOneRegularUser, updateOneRegularUser } from '../controller/RegularUserController'

const router = express.Router()

router.post('/createRegularUser', createRegularUser)
router.get('/getOneRegularUser/:id', getOneRegularUser)
router.get('/getAllRegularUser', getAllRegularUser)
router.put('/updateOneRegularUser/:id', updateOneRegularUser)
router.delete('/deleteOneRegularUser/:id', DeleteOneRegularUser)


export default router 