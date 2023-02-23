import { getToDosRepository } from "../../factories/getToDosRepository";
import { IToDosRepository } from "../../ports/IToDosRepository";

export default class GetAllToDosUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute(userId: string): Promise<IToDoUseCaseDefaultResponse> {
        try {
            const { success, toDosEntities } = await this.toDosRepository.getAllByUserId(userId);

            if (success) {
                return {
                    success: true,
                    toDos: toDosEntities,
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
