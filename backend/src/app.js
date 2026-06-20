import express from "express";
import morgan from "morgan";
import userRouter from "./api/routes/user.routes.js";
import { errorHandler } from "./api/middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/auth',userRouter)

app.use((req,res,next) => {
    next(new ApiError(404,"Not found"))
})

app.use(errorHandler)

export default app;