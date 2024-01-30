import { User } from "@prisma/client";
import { getUsersRepository } from "../../factories/getUsersRepository";
import { UsersRepositoryPort } from "src/repositories/Users.repository";

interface UserDeleteByIdUseCaseResponse {
    success: boolean;
    data: User;
}

export default class UserDeleteByIdUseCase {
    constructor(private readonly usersRepository: UsersRepositoryPort = getUsersRepository()) {}

    async execute(id: string): Promise<UserDeleteByIdUseCaseResponse> {
        try {
            console.log("\n\n user id que entoru => ", id);

            const userDeleted = await this.usersRepository.delete(id);

            if (userDeleted) {
                return {
                    success: true,
                    data: userDeleted,
                };
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
