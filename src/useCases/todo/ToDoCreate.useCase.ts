import { ToDo } from "@prisma/client";
import { getToDosRepository } from "src/factories/getToDosRepository";
import { ToDosRepositoryPort } from "src/repositories/ToDos.repository";

export interface ToDoCreateDTO {
    user_id: string;
    title: string;
    description: string;
    done: boolean;
}

interface ToDoCreateUseCaseResponse {
    success: boolean;
    data?: ToDo;
    message?: string;
}

export default class ToDoCreateUseCase {
    constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) {}

    async execute({ user_id, title, description, done }: ToDoCreateDTO): Promise<ToDoCreateUseCaseResponse> {
        try {
            const todoCreated = await this.toDosRepository.create({
                user_id,
                title,
                description,
                done,
            });

            if (todoCreated) return { success: true, data: todoCreated };
        } catch (error) {
            throw new Error(error);
        }
    }
}
