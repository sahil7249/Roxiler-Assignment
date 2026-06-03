import express from "express";
import dotenv from 'dotenv';
import authRouter from "./router/auth.router.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import morgan from 'morgan';
import adminRouter from "./router/admin.router.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(morgan("tiny"))

app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)

app.use(errorMiddleware)

app.listen(PORT,() => {
    console.log(`App is running at : http://localhost:${PORT}/`)
})