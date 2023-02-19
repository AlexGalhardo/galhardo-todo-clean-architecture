import { IUserUpdateByIdUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";

export default class UserUpdateByIdUseCase {
	private readonly usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	async execute (userUpdateByIdUseCaseParams: IUserUpdateByIdUseCaseParams) {
		const repositoryResponse = await this.usersRepository.updateById(userUpdateByIdUseCaseParams);

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
