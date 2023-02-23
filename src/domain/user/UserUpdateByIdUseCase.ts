import { getUsersRepository } from "../../factories/getUsersRepository";
import { IUserUpdateByIdUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";
import Bcrypt from "../../utils/Bcrypt";

export default class UserUpdateByIdUseCase {
	constructor(private readonly usersRepository: IUsersRepository = getUsersRepository()) { }

	async execute ({ id, newName, newEmail, olderPassword, newPassword }: IUserUpdateByIdUseCaseParams) {
		try {
			const { success: userAlreadyExistsWithThisNewEmail } = await this.usersRepository.getUserEntityByEmail(newEmail)

			console.log('userAlreadyExistsWithThisNewEmail => ', userAlreadyExistsWithThisNewEmail)

			if (!userAlreadyExistsWithThisNewEmail) {
				const { userEntity: user } = await this.usersRepository.getUserEntityById(id);

				const olderPasswordIsCorrect = await Bcrypt.compare(olderPassword, user.getPassword);

				if (!olderPasswordIsCorrect) {
					return {
						success: false,
						error: `The older password for user ${user.getName} is not correct`,
					};
				}

				user.setName(newName);
				user.setEmail(newEmail);
				user.setUpdatedAt();
				await user.setPassword(newPassword);

				const { success } = await this.usersRepository.save(user);

				if (success) {
					return {
						success: true,
						data: user,
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
