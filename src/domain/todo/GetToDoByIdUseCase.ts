import { getToDosRepository } from "../../factories/getToDosRepository";
import { IToDosRepository } from "../../ports/IToDosRepository";

export default class GetToDoByIdUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute(toDoId: string) {
        try {
            const { success, toDoEntity } = await this.toDosRepository.getById(toDoId);

            if (success) {
                return {
                    success: true,
                    toDo: toDoEntity,
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
