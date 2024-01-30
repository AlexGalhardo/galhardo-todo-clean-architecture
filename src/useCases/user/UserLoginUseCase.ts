import { getUsersRepository } from "../../factories/getUsersRepository";
import { IUserLoginUseCaseParams, UsersRepositoryPort } from "../../ports/UsersRepositoryPort";
import Bcrypt from "../../utils/Bcrypt";

export default class UserLoginUseCase {
    constructor(private readonly usersRepository: UsersRepositoryPort = getUsersRepository()) {}

    async execute({ email, password }: IUserLoginUseCaseParams) {
        try {
            const { userEntity } = await this.usersRepository.getUserEntityByEmail(email);

            if (userEntity) {
                const passwordIsValid = await Bcrypt.compare(password, userEntity.getPassword);
                if (passwordIsValid) {
                    userEntity.setJwtToken();
                    await this.usersRepository.save(userEntity);
                    return {
                        success: true,
                        data: userEntity,
                    };
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }
}
