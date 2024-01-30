import { ToDosRepositoryPort } from "src/repositories/ToDos.repository";
import { getToDosRepository } from "../../factories/getToDosRepository";
import { ToDo } from "@prisma/client";

interface ToDoDeleteByIdUseCaseResponse {
    success: boolean;
    data?: ToDo;
}

export default class ToDoDeleteByIdUseCase {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute(toDoId: string): Promise<ToDoDeleteByIdUseCaseResponse> {
        try {
            const todoDeleted = await this.toDosRepository.delete(toDoId);

            if (todoDeleted) return { success: true, data: todoDeleted };
        } catch (error) {
            throw new Error(error);
        }
    }
}
