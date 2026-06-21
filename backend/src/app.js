import express from "express";
import morgan from "morgan";
import { errorHandler } from "./api/middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";
import storeRouter from "./api/routes/store.routes.js";
import authRouter from "./api/routes/auth.routes.js";
import userRouter from "./api/routes/user.routes.js";

const app = express();

app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/store',storeRouter)
app.use('/api/user',userRouter)

app.use((req,res,next) => {
    next(new ApiError(404,"Not found"))
})

app.use(errorHandler)

export default app;