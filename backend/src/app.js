import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan('tiny'))

app.get('/',(req,res) => {
    res.send("Hello world")
})

export default app;