import { ToDo } from "@prisma/client";
import { getToDosRepository } from "src/factories/getToDosRepository";
import { ToDosRepositoryPort } from "src/repositories/ToDos.repository";

export interface ToDoUpdateDTO {
    id: string;
    title: string;
    description: string;
    done: boolean;
}

interface ToDoUpdateUseCaseResponse {
    success: boolean;
    data: ToDo;
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

            return { success: true, data: todoUpdated };
        } catch (error) {
            throw new Error(error);
        }
    }
}
