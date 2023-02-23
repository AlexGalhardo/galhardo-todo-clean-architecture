import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../utils/HttpStatusCode";

import PostgresUsersRepository from "../repositories/postgresql/PostgresUsersRepository";
import { getDecodedJwtToken } from "../utils/DecodeJwtToken";

export default interface IUserJwtPayload extends jwt.JwtPayload {
	userId: string;
}

export const userIsAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith("Bearer") ||
		!req.headers.authorization.split(" ")[1]
	) {
		if (process.env.NODE_ENV === "development_user_test") {
			return next();
		}
		return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
			success: false,
			message: "Please provide the User JWT Token in Header Authorization Bearer Token",
		});
	}

	try {
		const { success } = await new PostgresUsersRepository().getUserEntityById(getDecodedJwtToken(req).userId);
		if (!success) {
			return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
				success: false,
				message: "User jwt token inválid",
			});
		}
		return next();
	} catch (error) {
		return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
			success: false,
			message: error,
		});
	}
};
