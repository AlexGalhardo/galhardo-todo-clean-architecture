import { ToDosRepositoryPort } from "~/repositories/todos.repository";
import { getToDosRepository } from "../../factories/get-todos-repository.factory";
import { ToDo } from "@prisma/client";

interface ToDoGetAllUseCaseResponse {
    success: boolean;
    data?: ToDo[];
}

interface ToDoGetAllUseCasePort {
    execute(userId: string): Promise<ToDoGetAllUseCaseResponse>;
}

export default class ToDoGetAllUseCase implements ToDoGetAllUseCasePort {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute(): Promise<ToDoGetAllUseCaseResponse> {
        try {
            const todosFound = await this.toDosRepository.getAll();
            if (todosFound) return { success: true, data: todosFound };
            return { success: false, data: todosFound };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
