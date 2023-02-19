import { IUserLoginUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";

export default class UserLoginUseCase {
    private readonly usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(userLoginUseCaseParams: IUserLoginUseCaseParams) {
        const repositoryResponse = await this.usersRepository.login(userLoginUseCaseParams);

        console.log("repositoryResponse => ", repositoryResponse);

        if (repositoryResponse.success) {
            return {
                success: true,
                data: repositoryResponse.userEntity,
            };
        }

        return {
            success: false,
            error: `${repositoryResponse.error}`,
        };
    }
}
