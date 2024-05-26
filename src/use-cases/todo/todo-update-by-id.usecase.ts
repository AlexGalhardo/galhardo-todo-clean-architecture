import { ToDo } from "@prisma/client";
import { getToDosRepository } from "src/factories/get-todos-repository.factory";
import { ToDosRepositoryPort } from "~/repositories/todos.repository";

export interface ToDoUpdateDTO {
    id: string;
    title: string;
    description: string;
    done: boolean;
}

interface ToDoUpdateUseCaseResponse {
    success: boolean;
    data?: ToDo;
}

interface ToDoUpdateUseCasePort {
    execute({ id, title, description, done }: ToDoUpdateDTO): Promise<ToDoUpdateUseCaseResponse>;
}

export default class ToDoUpdateUseCase implements ToDoUpdateUseCasePort {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute({ id, title, description, done }: ToDoUpdateDTO): Promise<ToDoUpdateUseCaseResponse> {
        try {
            const todoUpdated = await this.toDosRepository.update({
                id,
                title,
                description,
                done,
            });

            if (todoUpdated) return { success: true, data: todoUpdated };

            return { success: false };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
