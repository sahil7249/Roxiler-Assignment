import { Router } from 'express'
import { createStore, getStores } from '../controller/store.controller.js'
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.js';
import { createStoreSchema } from '../validators/store.validator.js';

const storeRouter = Router()

storeRouter.post('/',authenticate,authorize("ADMIN"), validateRequest(createStoreSchema) ,createStore);
storeRouter.get('/',authenticate,getStores)

export default storeRouter