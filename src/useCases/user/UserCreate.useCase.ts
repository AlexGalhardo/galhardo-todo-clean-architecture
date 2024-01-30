import { randomUUID } from "node:crypto";
import { getUsersRepository } from "../../factories/getUsersRepository";
import { UsersRepositoryPort } from "src/repositories/Users.repository";
import { User } from "@prisma/client";

interface UserCreateUseCaseResponse {
    success: boolean;
    data: User;
}

export interface UserCreateDTO {
    name: string;
    email: string;
    password: string;
}

export default class UserCreateUseCase {
    constructor(private readonly usersRepository: UsersRepositoryPort = getUsersRepository()) {}

    async execute({ name, email, password }: UserCreateDTO): Promise<UserCreateUseCaseResponse> {
        try {
            const userCreated = await this.usersRepository.create({
                id: randomUUID(),
                name,
                email,
                password,
            });

            if (userCreated) return { success: true, data: userCreated };
        } catch (error) {
            throw new Error(error);
        }
    }
}
