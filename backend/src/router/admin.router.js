import { Router } from 'express'
import { createStore, getStats, getStores, getUsers } from '../controller/admin.controller.js'
import { authenticate, authorize } from "../middleware/authMiddleware.js";


const adminRouter = Router()

adminRouter.post('/store',authenticate ,authorize("ADMIN"), createStore)
adminRouter.get('/stores',authenticate ,authorize("ADMIN"), getStores)
adminRouter.get('/stats',authenticate ,authorize("ADMIN"), getStats)
adminRouter.get('/users',authenticate ,authorize("ADMIN"), getUsers)

export default adminRouter;