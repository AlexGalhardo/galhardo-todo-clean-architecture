import Bcrypt from "../../utils/Bcrypt";
import { IUserLoginUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";

export default class UserLoginUseCase {
	private readonly usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	async execute ({ email, password }: IUserLoginUseCaseParams) {
		try {
			const { userEntity } = await this.usersRepository.getUserEntityByEmail(email)

			if (userEntity) {
				const passwordIsValid = await Bcrypt.compare(password, userEntity.getPassword);
				if (passwordIsValid) {
					userEntity.setJwtToken()
					await this.usersRepository.save(userEntity)
					return {
						success: true,
						data: userEntity,
					};
				}
			}
		}
		catch (error) {
			return {
				success: false,
				error: `${error}`,
			};
		}
	}
}
