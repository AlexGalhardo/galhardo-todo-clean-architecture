import { randomUUID } from "node:crypto";

import ToDoEntity from "../../entities/ToDoEntity";
import { getToDosRepository } from "../../factories/getToDosRepository";
import { ICreateToDoUseCaseParams, IToDosRepository } from "../../ports/IToDosRepository";

export default class CreateToDoUseCase {
    constructor(private readonly toDosRepository: IToDosRepository = getToDosRepository()) {}

    async execute({ userId, title, description, done }: ICreateToDoUseCaseParams) {
        try {
            const newToDo = new ToDoEntity(randomUUID(), userId, title, description, done);

            const { success, toDoEntity } = await this.toDosRepository.create(newToDo);

            if (success) {
                return {
                    success: true,
                    data: toDoEntity,
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
