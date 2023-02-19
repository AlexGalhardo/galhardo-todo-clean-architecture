import { IToDosRepository } from "../../ports/IToDosRepository";

export default class GetAllToDosUseCase {
    private readonly toDosRepository: IToDosRepository;

    constructor(toDosRepository: IToDosRepository) {
        this.toDosRepository = toDosRepository;
    }

    async execute(user_id: string) {
        return await this.toDosRepository.getAll(user_id);
    }
}
