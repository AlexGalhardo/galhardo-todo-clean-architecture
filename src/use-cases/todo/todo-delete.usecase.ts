import { ToDosRepositoryPort } from "~/repositories/todos.repository";
import { getToDosRepository } from "../../factories/get-todos-repository.factory";
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
            return { success: false, data: todoDeleted };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
