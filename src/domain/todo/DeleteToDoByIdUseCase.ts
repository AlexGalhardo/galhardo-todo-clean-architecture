import { IToDosRepository } from "../../ports/IToDosRepository";

export default class DeleteToDoByIdUseCase {
    private readonly toDosRepository: IToDosRepository;

    constructor(toDosRepository: IToDosRepository) {
        this.toDosRepository = toDosRepository;
    }

    async execute(user_id: string) {
        return await this.toDosRepository.deleteById(user_id);
    }
}
