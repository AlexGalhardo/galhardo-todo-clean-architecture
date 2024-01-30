import { ToDosRepositoryPort } from "src/repositories/ToDos.repository";
import { getToDosRepository } from "../../factories/getToDosRepository";
import { ToDo } from "@prisma/client";

interface ToDoGetAllUseCaseResponse {
    success: boolean;
    data: ToDo[];
}

interface ToDoGetAllUseCasePort {
    execute(userId: string): Promise<ToDoGetAllUseCaseResponse>;
}

export default class ToDoGetAllUseCase implements ToDoGetAllUseCasePort {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute(userId: string): Promise<ToDoGetAllUseCaseResponse> {
        try {
            const todosFound = await this.toDosRepository.getAllByUserId(userId);
            if (todosFound) return { success: true, data: todosFound };
        } catch (error) {
            throw new Error(error);
        }
    }
}
