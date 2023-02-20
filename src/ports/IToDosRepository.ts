import { ToDo } from "@prisma/client";
import ToDoEntity from "src/entities/ToDoEntity";

export interface IToDoCreateUseCaseResponse {
	httpStatusCodeResponse: 201 | 400;
	response: {
		success: boolean;
		message: "ToDo Created!" | "ToDo NOT Created!";
		data?: ToDo;
	};
}

export interface IToDoDeleteByIdUseCaseResponse {
	httpStatusCodeResponse: 200 | 404;
	response: {
		success: boolean;
		message: string;
	};
}

export interface IToDoGetAllUseCaseResponse {
	httpStatusCodeResponse: 200 | 404;
	response: {
		success: boolean;
		message: string;
		data?: ToDo[];
	};
}

export interface IUpdateToDoByIdResponse {
	httpStatusCodeResponse: 200 | 404;
	response: {
		success: boolean;
		message: string;
		data?: ToDo;
	};
}

export interface IToDoUpdateByIdUseCaseResponse {
	httpStatusCodeResponse: 200 | 404;
	response: {
		success: boolean;
		message: string;
		blogUpdated?: ToDo;
	};
}

export interface ICreateToDoParams {
	userId: string;
	title: string;
	description: string;
	done: boolean;
}

export interface IUpdateToDoParams {
	toDoId: string;
	title: string;
	description: string;
	done: boolean;
}

export interface ToDoRepositoryResponse {
	success: boolean
	status?: string
	toDoEntity?: ToDoEntity
	error?: string
}

export interface IToDosRepository {
	getAll (userId: string): Promise<ToDo[]>;

	getToDoEntityById (toDoId: string): Promise<ToDoRepositoryResponse>

	create (toDoParamObject: ICreateToDoParams): Promise<ToDo | null>;

	updateById (toDoParamObject: IUpdateToDoParams): Promise<ToDo>;

	deleteById (toDoId: string): Promise<ToDo>;
}
