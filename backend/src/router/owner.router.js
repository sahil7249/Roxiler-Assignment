import { Router } from "express";
import { getOwnerDashboard } from "../controller/owner.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const ownerRouter = Router()

ownerRouter.get('/',authenticate, getOwnerDashboard)

export default ownerRouter