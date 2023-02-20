import { getToDosRepository } from "src/factories/getToDosRepository";
import { IToDosRepository } from "../../ports/IToDosRepository";

export default class GetToDoByIdUseCase {
	constructor(private readonly toDosRepository: IToDosRepository) {
		this.toDosRepository = getToDosRepository()
	}

	async execute (toDoId: string) {
		try {
			const { toDoEntity } = await this.toDosRepository.getToDoEntityById(toDoId)

			if (toDoEntity) {
				return {
					success: true,
					data: userEntity.getAllTodos
				}
			}
		}
		catch (error) {
			return {
				success: false,
				error
			}
		}
	}
}
