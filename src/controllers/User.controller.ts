import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import UserDeleteByIdUseCase from "../useCases/user/UserDeleteByIdUseCase";
import UserLoginUseCase from "../useCases/user/UserLoginUseCase";
import UserLogoutUseCase from "../useCases/user/UserLogoutUseCase";
import UserRegisterUseCase from "../useCases/user/UserCreate.useCase";
import UserUpdateByIdUseCase from "../useCases/user/UserUpdateByIdUseCase";

export default class UserController {
    static async register(req: Request, res: Response): Promise<Response<IUserUseCaseDefaultResponse>> {
        const { name, email, password } = req.body;

        const { success, data, error } = await new UserRegisterUseCase().execute({
            name,
            email,
            password,
        });

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? data : { success: false, error });
    }

    static async update(req: Request, res: Response): Promise<Response<IUserUseCaseDefaultResponse>> {
        const { newName, newEmail, olderPassword, newPassword } = req.body;

        const { success, data, error } = await new UserUpdateByIdUseCase().execute({
            id: getDecodedJwtToken(req).userId,
            newName,
            newEmail,
            olderPassword,
            newPassword,
        });

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, user: data } : { success: false, error });
    }

    static async login(req: Request, res: Response): Promise<Response<IUserUseCaseDefaultResponse>> {
        const { email, password } = req.body;

        const { success, data, error } = await new UserLoginUseCase().execute({
            email,
            password,
        });

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, user: data } : { success: false, error });
    }

    static async logout(req: Request, res: Response): Promise<Response<IUserUseCaseDefaultResponse>> {
        const { success, status, error } = await new UserLogoutUseCase().execute(getDecodedJwtToken(req).userId);

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, status } : { success: false, error });
    }

    static async deleteById(req: Request, res: Response): Promise<Response<IUserUseCaseDefaultResponse>> {
        const { user_id } = req.params;

        const { success, status, error } = await new UserDeleteByIdUseCase().execute(user_id);

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, status } : { success: false, error });
    }
}
