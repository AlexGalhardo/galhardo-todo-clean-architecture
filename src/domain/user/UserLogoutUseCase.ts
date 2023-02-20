import { getUsersRepository } from "../../factories/getUsersRepository";
import { IUsersRepository } from "../../ports/IUsersRepository";

export default class UserLogoutUseCase {
    constructor(private readonly usersRepository: IUsersRepository = getUsersRepository()) {}

    async execute(userId: string) {
        const { success, error } = await this.usersRepository.logout(userId);

        if (success) {
            return {
                success: true,
                status: "User loggued out successfully",
            };
        }

        return {
            success: false,
            error: `${error}`,
        };
    }
}
