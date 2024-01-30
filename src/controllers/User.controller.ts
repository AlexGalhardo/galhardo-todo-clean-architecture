import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import UserDeleteByIdUseCase from "../useCases/user/UserDeleteByIdUseCase";
import UserLoginUseCase from "../useCases/user/UserLoginUseCase";
import UserLogoutUseCase from "../useCases/user/UserLogoutUseCase";
import UserUpdateByIdUseCase from "../useCases/user/UserUpdateByIdUseCase";
import { User } from "@prisma/client";
import UserCreateUseCase from "src/useCases/user/UserCreate.useCase";

interface UserControllerResponse {
    success: boolean;
    message?: string;
    data?: User;
}

export default class UserController {
    static async create(req: Request, res: Response): Promise<Response<UserControllerResponse>> {
        try {
            const { name, email, password } = req.body;
            const { success, data } = await new UserCreateUseCase().execute({
                name,
                email,
                password,
            });
            if (success === true) return res.status(HttpStatusCode.CREATED).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response): Promise<Response<UserControllerResponse>> {
		try {
            const { newName, newEmail, olderPassword, newPassword } = req.body;

			const { success, data } = await new UserUpdateByIdUseCase().execute({
				id: res.locals.userId,
				newName,
				newEmail,
				olderPassword,
				newPassword,
			});

            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async login(req: Request, res: Response): Promise<Response<UserControllerResponse>> {
		try {
            const { email, password } = req.body;

			const { success, data } = await new UserLoginUseCase().execute({
				email,
				password,
			});

            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async logout(req: Request, res: Response): Promise<Response<UserControllerResponse>> {
		try {
            const { success } = await new UserLogoutUseCase().execute(res.locals.userId);
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<Response<UserControllerResponse>> {
		try {
            const { user_id } = req.params;
        	const { success, data } = await new UserDeleteByIdUseCase().execute(user_id);
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}
