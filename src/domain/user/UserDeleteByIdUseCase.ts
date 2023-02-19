import { IUsersRepository } from "../../ports/IUsersRepository";

export default class UserDeleteByIdUseCase {
    private readonly usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(userId: string) {
        const repositoryResponse = await this.usersRepository.deleteById(userId);

        if (repositoryResponse.success) {
            return {
                success: true,
                status: `User id ${userId} deleted`,
            };
        }

        return {
            success: false,
            error: `${repositoryResponse.error}`,
        };
    }
}
