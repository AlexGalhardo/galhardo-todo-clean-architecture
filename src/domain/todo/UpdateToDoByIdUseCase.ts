import { getToDosRepository } from "../../factories/getToDosRepository";
import {
    IToDosRepository,
    IToDoUseCaseDefaultResponse,
    IUpdateToDoByIdUseCaseParams,
} from "../../ports/IToDosRepository";

export default class UpdateToDoByIdUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute({
        id,
        title,
        description,
        done,
    }: IUpdateToDoByIdUseCaseParams): Promise<IToDoUseCaseDefaultResponse> {
        try {
            const { success, toDoEntity } = await this.toDosRepository.getById(id);

            if (success) {
                toDoEntity.setTitle(title);
                toDoEntity.setDescription(description);
                toDoEntity.setDone(done);
                toDoEntity.setUpdatedAt();

                const { success } = await this.toDosRepository.save(toDoEntity);

                if (success) {
                    return {
                        success: true,
                        toDo: toDoEntity,
                    };
                }
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }
}
