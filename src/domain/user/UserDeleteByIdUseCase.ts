import { getUsersRepository } from "../../factories/getUsersRepository";
import { IUsersRepository, IUserUseCaseDefaultResponse } from "../../ports/IUsersRepository";

export default class UserDeleteByIdUseCase {
    constructor(private readonly usersRepository: IUsersRepository = getUsersRepository()) {}

    async execute(userId: string): Promise<IUserUseCaseDefaultResponse> {
        const { success, error } = await this.usersRepository.deleteById(userId);

        if (success) {
            return {
                success: true,
                status: `User id: ${userId} deleted`,
            };
        }

        return {
            success: false,
            error,
        };
    }
}
