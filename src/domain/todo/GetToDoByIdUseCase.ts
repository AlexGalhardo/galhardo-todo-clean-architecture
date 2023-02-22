import { getToDosRepository } from "../../factories/getToDosRepository";
import { getUsersRepository } from "../../factories/getUsersRepository";
import { IToDosRepository } from "../../ports/IToDosRepository";
import { IUsersRepository } from "../../ports/IUsersRepository";

export default class GetToDoByIdUseCase {
	constructor(
		private readonly toDosRepository: IToDosRepository = getToDosRepository(),
		private readonly usersRepository: IUsersRepository = getUsersRepository(),
	) { }

	async execute (userId: string, toDoId: string) {
		try {
			const { success } = await this.usersRepository.getUserEntityById(userId);

			if (success) {
				const { success, toDoEntity } = await this.toDosRepository.getById(toDoId);

				if (success && toDoEntity.getUserId === userId) {
					return {
						success: true,
						toDo: toDoEntity,
					};
				}
			} else {
				return {
					success: false,
					error: `Ìnvalid Jwt Token, user not found`,
				};
			}
		} catch (error) {
			return {
				success: false,
				error,
			};
		}
	}
}
