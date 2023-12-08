import express from 'express'
import { createRole, getAllRoles, getOneRole, updateOneRole, deleteOneRole } from '../controller/RoleController'
const router = express.Router()

router.post('/createRole', createRole)
router.get('/getOneRole/:id', getOneRole)
router.get('', getAllRoles)
router.put('/updateOneRole/:id', updateOneRole)
router.delete('/deleteOneRole/:id', deleteOneRole)


export default router 