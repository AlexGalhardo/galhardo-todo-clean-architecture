import { IUsersRepository } from "../../ports/IUsersRepository";

export default class UserLogoutUseCase {
    private readonly usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(userId: string) {
        const repositoryResponse = await this.usersRepository.logout(userId);

        if (repositoryResponse.success) {
            return {
                success: true,
                status: "User loggued out successfully",
            };
        }

        return {
            success: false,
            error: `${repositoryResponse.error}`,
        };
    }
}
