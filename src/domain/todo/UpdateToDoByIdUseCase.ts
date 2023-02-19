import { IToDosRepository, IUpdateToDoParams } from "../../ports/IToDosRepository";

export default class UpdateToDoByIdUseCase {
    private readonly toDosRepository: IToDosRepository;

    constructor(toDosRepository: IToDosRepository) {
        this.toDosRepository = toDosRepository;
    }

    async execute(toDoParamObject: IUpdateToDoParams) {
        return this.toDosRepository.updateById(toDoParamObject);
    }
}
