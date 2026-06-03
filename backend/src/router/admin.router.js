import { Router } from 'express'
import { createStore, getStores } from '../controller/admin.controller.js'
import { authenticate, authorize } from "../middleware/authMiddleware.js";


const adminRouter = Router()

adminRouter.post('/store',authenticate ,authorize("ADMIN"), createStore)
adminRouter.get('/stores',authenticate ,authorize("ADMIN"), getStores)

export default adminRouter;