import type { ToDo } from "@prisma/client";
import { getToDosRepository } from "src/factories/get-todos-repository.factory";
import { type ToDosRepositoryPort } from "~/repositories/todos.repository";

export interface ToDoCreateDTO {
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
	constructor(private readonly toDosRepository: ToDosRepositoryPort = getToDosRepository()) { }

	async execute({ title, description, done }: ToDoCreateDTO): Promise<ToDoCreateUseCaseResponse> {
		try {
			const todoCreated = await this.toDosRepository.create({
				title,
				description,
				done,
			});

			if (todoCreated) return { success: true, data: todoCreated };
			return { success: false };
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
