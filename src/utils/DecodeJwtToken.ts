import { Request } from "express";
import jwt from "jsonwebtoken";

export function getDecodedJwtToken(req: Request) {
    const JWT_TOKEN = req.headers.authorization?.split(" ")[1];

    if (process.env.NODE_ENV === "development_user_test") {
        return {
            user_id: process.env.USER_TEST_ID,
        };
    }

    return jwt.verify(JWT_TOKEN as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;
}
