import { Request, Response } from "express";

import { getUsersRepository } from "../../factories/getUsersRepository";
import { getDecodedJwtToken } from "../../utils/DecodeJwtToken";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import UserDeleteByIdUseCase from "./UserDeleteByIdUseCase";
import UserLoginUseCase from "./UserLoginUseCase";
import UserLogoutUseCase from "./UserLogoutUseCase";
import UserRegisterUseCase from "./UserRegisterUseCase";
import UserUpdateByIdUseCase from "./UserUpdateByIdUseCase";

export default class UserController {
	static async register (req: Request, res: Response) {
		const { name, email, password } = req.body;

		const { success, data, error } = await new UserRegisterUseCase(getUsersRepository()).execute({
			name,
			email,
			password,
		});

		return res
			.status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
			.json(success ? data : { success: false, error });
	}

	static async update (req: Request, res: Response) {
		const { newName, newEmail, olderPassword, newPassword } = req.body;

		const { success, data, error } = await new UserUpdateByIdUseCase(getUsersRepository()).execute({
			id: getDecodedJwtToken(req).user_id,
			newName: newName,
			newEmail: newEmail,
			olderPassword: olderPassword,
			newPassword: newPassword,
		});

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, user: data } : { success: false, error });
	}

	static async login (req: Request, res: Response) {
		const { email, password } = req.body;

		const { success, data, error } = await new UserLoginUseCase(getUsersRepository()).execute({
			email,
			password,
		});

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, user: data } : { success: false, error });
	}

	static async logout (req: Request, res: Response) {
		const { success, status, error } = await new UserLogoutUseCase(getUsersRepository()).execute(getDecodedJwtToken(req).user_id);

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, status } : { success: false, error });
	}

	static async deleteById (req: Request, res: Response) {
		const { user_id } = req.params;

		const { success, status, error } = await new UserDeleteByIdUseCase(getUsersRepository()).execute(user_id);

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, status } : { success: false, error });
	}
}
