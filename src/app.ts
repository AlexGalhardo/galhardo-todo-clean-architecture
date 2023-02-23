import compression from "compression";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";

import "express-async-errors";

import routes from "./routes";

const app = express();

export default app
    .use(express.json())
    .use(cors())
    .use(compression())
    .use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false }))
    .use("/api", routes)
    .use((error: Error, _: Request, response: Response, next: NextFunction) => {
        if (error instanceof Error) {
            return response.status(400).json({
                message: error.message,
            });
        }

        response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });

        return next();
    })
    .get("/", (_, res: Response) => {
        return res.status(200).json({
            status: "TODO API CLEAN ARCHITECTURE HTTP REST API WORKING!",
        });
    });
