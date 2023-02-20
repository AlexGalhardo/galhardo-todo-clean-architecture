import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import PostgresUsersRepository from "../repositories/postgresql/PostgresUsersRepository";
import { getDecodedJwtToken } from "../utils/DecodeJwtToken";

export default interface IUserJwtPayload extends jwt.JwtPayload {
    user_id: string;
}

export const userIsAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer") ||
        !req.headers.authorization.split(" ")[1]
    ) {
        if (process.env.NODE_ENV === "development") {
            return next();
        }
        return res.status(422).json({
            success: false,
            message: "Please provide the User JWT Token in Header Authorization Bearer Token",
        });
    }

    try {
        const { success } = await new PostgresUsersRepository().getUserEntityById(getDecodedJwtToken(req).user_id);

        if (!success) {
            return res.status(422).json({
                success: false,
                message: "User jwt token inválid",
            });
        }

        return next();
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error,
        });
    }
};
