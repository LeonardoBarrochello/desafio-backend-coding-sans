import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { router } from "./routes";
import { AppError } from "../errors/AppError";

const app = express();

app.use(express.json())
app.use(morgan("dev"));
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log("entrou aq")
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        })
    }
    return response.status(500).json({
        status: 500,
        message: "Internal Server Error",
        stack: err.stack
    })

})

app.get("*", (req, res) => {
    return res.status(404).json({
        status: 404,
        message: "Route not found"
    })
})



export { app }