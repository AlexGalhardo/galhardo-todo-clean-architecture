import { randomUUID } from "node:crypto";

import UserEntity from "../../entities/UserEntity";
import { getUsersRepository } from "../../factories/getUsersRepository";
import {
    IUserRegisterUseCaseParams,
    IUsersRepository,
    IUserUseCaseDefaultResponse,
} from "../../ports/IUsersRepository";

export default class UserRegisterUseCase {
    constructor(private readonly usersRepository: IUsersRepository = getUsersRepository()) {}

    async execute({ name, email, password }: IUserRegisterUseCaseParams): Promise<IUserUseCaseDefaultResponse> {
        const newUser = await UserEntity.init(randomUUID(), name, email, password);

        const { success, userEntity, error } = await this.usersRepository.create(newUser);

        if (success) {
            return {
                success: true,
                data: userEntity,
            };
        }

        return {
            success: false,
            error,
        };
    }
}
