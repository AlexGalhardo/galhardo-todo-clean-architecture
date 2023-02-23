import { getToDosRepository } from "../../factories/getToDosRepository";
import { IToDosRepository, IToDoUseCaseDefaultResponse } from "../../ports/IToDosRepository";

export default class DeleteToDoByIdUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute(toDoId: string): Promise<IToDoUseCaseDefaultResponse> {
        try {
            const { success } = await this.toDosRepository.deleteById(toDoId);

            if (success) {
                return {
                    success: true,
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
