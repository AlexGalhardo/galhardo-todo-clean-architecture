import { ICreateToDoParams, IToDosRepository } from "../../ports/IToDosRepository";

export default class CreateToDoUseCase {
    private readonly toDosRepository: IToDosRepository;

    constructor(toDosRepository: IToDosRepository) {
        this.toDosRepository = toDosRepository;
    }

    async execute(toDoParamObject: ICreateToDoParams) {
        return this.toDosRepository.create(toDoParamObject);
    }
}
