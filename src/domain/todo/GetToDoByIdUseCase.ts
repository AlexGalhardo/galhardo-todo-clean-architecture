import { getUsersRepository } from "../../factories/getUsersRepository";
import { IUsersRepository } from "../../ports/IUsersRepository";
import { getToDosRepository } from "../../factories/getToDosRepository";
import { IToDosRepository } from "../../ports/IToDosRepository";

export default class GetToDoByIdUseCase {
	constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository(), private readonly usersRepository: IUsersRepository = getUsersRepository()) { }

	async execute (userId: string, toDoId: string) {
		try {
			const { success } = await this.usersRepository.getUserEntityById(userId)

			if (success) {
				const { success, toDoEntity } = await this.toDosRepository.getById(toDoId);

				if (success && toDoEntity.getUserId === userId) {
					return {
						success: true,
						toDo: toDoEntity,
					};
				}
			}
			else {
				return {
					success: true,
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
