import { getToDosRepository } from "../../factories/getToDosRepository";
import { IToDosRepository } from "../../ports/IToDosRepository";

export default class GetAllToDosUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute(userId: string) {
        try {
            const { success, toDosEntities } = await this.toDosRepository.getAllByUserId(userId);

            if (success) {
                return {
                    success: true,
                    data: toDosEntities,
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
