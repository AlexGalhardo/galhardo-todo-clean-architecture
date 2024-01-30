import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UsersRepository from "../repositories/Users.repository";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { ErrorsMessages } from "src/utils/ErrorsMessages";

export default interface IUserJwtPayload extends jwt.JwtPayload {
    userId: string;
}

export const userIsAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    if (
        !request.headers.authorization ||
        !request.headers.authorization.startsWith("Bearer") ||
        !request.headers.authorization.split(" ")[1]
    ) {
        if (process.env.NODE_ENV === "development_user_test") {
            return next();
        }
        return response.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: "Invalid User JWT Token in Header Authorization Bearer Token",
        });
    }

    try {
        const headerJwtToken = request.headers.authorization?.split(" ")[1];

        if (process.env.NODE_ENV === "development_user_test") {
            return {
                userId: process.env.USER_TEST_ID,
            };
        }

        const { id } = jwt.verify(headerJwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        const userFound = await new UsersRepository().getById(id);

        if (!userFound) {
            return response.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: ErrorsMessages.USER_NOT_FOUND,
            });
        }

        response.locals.userId = id;

        return next();
    } catch (error) {
        return response.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: error.message,
        });
    }
};
