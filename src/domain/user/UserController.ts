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

		const response = await new UserRegisterUseCase(getUsersRepository()).execute({
			name,
			email,
			password,
		});

		return res
			.status(response.success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
			.json(response.success ? response.data : { success: false, error: response.error });
	}

	static async update (req: Request, res: Response) {
		const { newName, newEmail, olderPassword, newPassword } = req.body;

		const response = await new UserUpdateByIdUseCase(getUsersRepository()).execute({
			id: getDecodedJwtToken(req).user_id,
			newName: newName,
			newEmail: newEmail,
			olderPassword: olderPassword,
			newPassword: newPassword,
		});

		const { success, data, error } = response;

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, user: data } : { success: false, error });
	}

	static async login (req: Request, res: Response) {
		const { email, password } = req.body;

		const response = await new UserLoginUseCase(getUsersRepository()).execute({
			email,
			password,
		});

		const { success, data, error } = response;

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, user: data } : { success: false, error });
	}

	static async logout (req: Request, res: Response) {
		const response = await new UserLogoutUseCase(getUsersRepository()).execute(getDecodedJwtToken(req).user_id);

		const { success, status, error } = response;

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, status } : { success: false, error });
	}

	static async deleteById (req: Request, res: Response) {
		const { user_id } = req.params;

		const response = await new UserDeleteByIdUseCase(getUsersRepository()).execute(user_id);

		const { success, status, error } = response;

		return res
			.status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, status } : { success: false, error });
	}
}
