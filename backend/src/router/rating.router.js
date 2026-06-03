import { Router } from 'express'
import { authenticate } from "../middleware/authMiddleware.js";
import { rateStore } from '../controller/rating.controller.js';


const ratingRouter = Router()

ratingRouter.post('/', authenticate,rateStore)

export default ratingRouter