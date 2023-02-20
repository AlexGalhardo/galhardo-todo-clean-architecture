import Bcrypt from "../../utils/Bcrypt";
import { IUserUpdateByIdUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";

export default class UserUpdateByIdUseCase {
	private readonly usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	async execute ({ id, newName, newEmail, olderPassword, newPassword }: IUserUpdateByIdUseCaseParams) {

		try {
			if (this.usersRepository.getUserEntityByEmail(newEmail)) {

				const { userEntity: user } = await this.usersRepository.getUserEntityById(id)

				const olderPasswordIsCorrect = await Bcrypt.compare(olderPassword, user.getPassword);

				if (!olderPasswordIsCorrect) {
					return {
						success: false,
						error: `The older password for user ${user.getName} is not correct`,
					};
				}

				user.setName(newName)
				user.setEmail(newEmail)
				await user.setPassword(newPassword)

				const { success } = await this.usersRepository.save(user)

				if (success) {
					return {
						success: true,
						data: user,
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
