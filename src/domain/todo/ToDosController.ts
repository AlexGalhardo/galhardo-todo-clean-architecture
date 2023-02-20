import { Request, Response } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

import { getToDosRepository } from "../../factories/getToDosRepository";
import { getDecodedJwtToken } from "../../utils/DecodeJwtToken";
import CreateToDoUseCase from "./CreateToDoUseCase";
import DeleteToDoByIdUseCase from "./DeleteToDoByIdUseCase";
import GetAllToDosUseCase from "./GetAllToDosUseCase";
import GetToDoByIdUseCase from "./GetToDoByIdUseCase";
import UpdateToDoByIdUseCase from "./UpdateToDoByIdUseCase";

export default class ToDosController {
	static async getAllToDos (req: Request, res: Response) {
		const { success, data, error } = await new GetAllToDosUseCase().execute(
			getDecodedJwtToken(req).user_id,
		);

		return res
			.status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, data } : { success: false, error });
	}

	static async getById (req: Request, res: Response) {
		const { todo_id } = req.params;

		const { success, data, error } = await new GetToDoByIdUseCase(getToDosRepository()).execute(todo_id);

		return res
			.status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
			.json(success ? { success: true, data } : { success: false, error });
	}

	static async create (req: Request, res: Response) {
		const { title, description, done } = req.body;

		const response = await new CreateToDoUseCase(getToDosRepository()).execute({
			userId: getDecodedJwtToken(req).user_id,
			title,
			description,
			done,
		});

		return res.status(response ? 200 : 400).json(response);
	}

	static async updateToDoById (req: Request, res: Response) {
		const { todo_id } = req.params;
		const { title, description, done } = req.body;

		const response = await new UpdateToDoByIdUseCase(getToDosRepository()).execute({
			toDoId: todo_id,
			title,
			description,
			done,
		});

		return res.status(response ? 200 : 400).json(response);
	}

	static async deleteToDoById (req: Request, res: Response) {
		const { todo_id } = req.params;

		const response = await new DeleteToDoByIdUseCase(getToDosRepository()).execute(todo_id);

		return res.status(response ? 200 : 400).json(response);
	}
}
