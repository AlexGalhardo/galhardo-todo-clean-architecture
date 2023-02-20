import { getUsersRepository } from "src/factories/getUsersRepository";
import { IUsersRepository } from "src/ports/IUsersRepository";

export default class GetAllToDosUseCase {
	private readonly usersRepository: IUsersRepository;

	constructor() {
		this.usersRepository = getUsersRepository();
	}

	async execute (userId: string) {
		const { userEntity } = await this.usersRepository.getUserEntityById(userId)
	}
}
