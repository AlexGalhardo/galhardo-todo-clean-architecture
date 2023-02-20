import { IUsersRepository } from "../../ports/IUsersRepository";

export default class UserLogoutUseCase {
	private readonly usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	async execute (userId: string) {
		const { success, error } = await this.usersRepository.logout(userId);

		if (success) {
			return {
				success: true,
				status: "User loggued out successfully",
			};
		}

		return {
			success: false,
			error: `${error}`,
		};
	}
}
