import UserEntity from "../../entities/UserEntity";
import { IUserRegisterUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";

export default class UserRegisterUseCase {
    private readonly usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    async execute(userRegisterUseCaseParams: IUserRegisterUseCaseParams) {
        const repositoryResponse = await this.usersRepository.register(userRegisterUseCaseParams);

        if (repositoryResponse.success) {
            return {
                success: true,
                message: `User ${repositoryResponse.userEntity.getEmail} created successfully`,
                data: repositoryResponse.userEntity,
            };
        }

        return {
            success: false,
            error: `${repositoryResponse.error}`,
        };
    }
}
