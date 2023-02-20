import { randomUUID } from "node:crypto";
import UserEntity from "../../entities/UserEntity";
import { IUserRegisterUseCaseParams, IUsersRepository } from "../../ports/IUsersRepository";

export default class UserRegisterUseCase {
	private readonly usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	async execute ({ name, email, password }: IUserRegisterUseCaseParams) {
		const newUser = await UserEntity.init(randomUUID(), name, email, password);

		const { success, userEntity, error } = await this.usersRepository.create(newUser);

		if (success) {
			return {
				success: true,
				message: `User ${userEntity.getEmail} created successfully`,
				data: userEntity,
			};
		}

		return {
			success: false,
			error: `${error}`,
		};
	}
}
