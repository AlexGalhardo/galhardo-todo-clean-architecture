import { ToDosRepositoryPort } from "~/repositories/todos.repository";
import { getToDosRepository } from "../../factories/get-todos-repository.factory";
import { ToDo } from "@prisma/client";

interface ToDoGetByIdUseCaseResponse {
    success: boolean;
    data?: ToDo;
}

interface ToDoGetByIdUseCasePort {
    execute(toDoId: string): Promise<ToDoGetByIdUseCaseResponse>;
}

export default class ToDoGetByIdUseCase implements ToDoGetByIdUseCasePort {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute(toDoId: string): Promise<ToDoGetByIdUseCaseResponse> {
        try {
            const todoFound = await this.toDosRepository.getById(toDoId);
            if (todoFound) return { success: true, data: todoFound };
            return { success: false };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
