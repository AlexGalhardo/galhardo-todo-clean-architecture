import { ToDosRepositoryPort } from "src/repositories/ToDos.repository";
import { getToDosRepository } from "../../factories/getToDosRepository";
import { ToDo } from "@prisma/client";

interface ToDoGetByIdUseCaseResponse {
    success: boolean;
    data: ToDo;
}

interface ToDoGetByIdUseCasePort {
    execute(toDoId: string): Promise<ToDoGetByIdUseCaseResponse>;
}

export default class ToDoGetByIdUseCase implements ToDoGetByIdUseCasePort {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute(toDoId: string): Promise<ToDoGetByIdUseCaseResponse> {
        try {
            const todoFound = await this.toDosRepository.getById(toDoId);
            return { success: true, data: todoFound };
        } catch (error) {
            throw new Error(error);
        }
    }
}
