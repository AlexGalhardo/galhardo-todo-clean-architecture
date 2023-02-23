import { getUsersRepository } from "../../factories/getUsersRepository";
import { IUserUpdateByIdUseCaseParams, IUsersRepository, IUserUseCaseDefaultResponse } from "../../ports/IUsersRepository";
import Bcrypt from "../../utils/Bcrypt";

export default class UserUpdateByIdUseCase {
	constructor(private readonly usersRepository: IUsersRepository = getUsersRepository()) { }

	async execute ({ id, newName, newEmail, olderPassword, newPassword }: IUserUpdateByIdUseCaseParams): Promise<IUserUseCaseDefaultResponse> {
		try {
			const { success: userAlreadyExistsWithThisNewEmail } = await this.usersRepository.getUserEntityByEmail(newEmail)

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
			else {
				return {
					success: false,
					error: 'A user already exists with this newEmail'
				}
			}
		} catch (error) {
			return {
				success: false,
				error: `${error}`,
			};
		}
	}
}
