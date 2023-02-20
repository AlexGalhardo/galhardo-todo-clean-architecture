import { getToDosRepository } from "../../factories/getToDosRepository";
import { IToDosRepository, IUpdateToDoByIdUseCaseParams } from "../../ports/IToDosRepository";

export default class UpdateToDoByIdUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute({ id, title, description, done }: IUpdateToDoByIdUseCaseParams) {
        try {
            const { success, toDoEntity, error } = await this.toDosRepository.getById(id);

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
            console.log("CHEGOU AQUI");
            return {
                success: false,
                error,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }
}
