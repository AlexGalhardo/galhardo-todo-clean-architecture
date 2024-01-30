import { getUsersRepository } from "../../factories/getUsersRepository";
import { UsersRepositoryPort, IUserUseCaseDefaultResponse } from "../../ports/UsersRepositoryPort";

export default class UserLogoutUseCase {
    constructor(private readonly usersRepository: UsersRepositoryPort = getUsersRepository()) {}

    async execute(userId: string): Promise<IUserUseCaseDefaultResponse> {
        const { success, error } = await this.usersRepository.logout(userId);

        if (success) {
            return {
                success: true,
                status: "User loggued out successfully",
            };
        }

        return {
            success: false,
            error,
        };
    }
}
