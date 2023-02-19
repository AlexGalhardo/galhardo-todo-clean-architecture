import { Request, Response } from "express";

import { getToDosRepository } from "../../factories/getToDosRepository";
import { getDecodedJwtToken } from "../../utils/DecodeJwtToken";
import CreateToDoUseCase from "./CreateToDoUseCase";
import DeleteToDoByIdUseCase from "./DeleteToDoByIdUseCase";
import GetAllToDosUseCase from "./GetAllToDosUseCase";
import GetToDosById from "./GetToDoByIdUseCase";
import UpdateToDoByIdUseCase from "./UpdateToDoByIdUseCase";

export default class ToDosController {
    static async getAllTransactions(req: Request, res: Response) {
        const allTransactions = await new GetAllToDosUseCase(getToDosRepository()).execute(
            getDecodedJwtToken(req).user_id,
        );

        return res.status(allTransactions ? 200 : 404).json(allTransactions);
    }

    static async getTransactionsByCategory(req: Request, res: Response) {
        const { toDoId } = req.body;

        const response = await new GetToDosById(getToDosRepository()).execute(toDoId);

        return res.status(response ? 200 : 400).json(response);
    }

    static async createTransaction(req: Request, res: Response) {
        const { title, description, done } = req.body;

        const response = await new CreateToDoUseCase(getToDosRepository()).execute({
            userId: getDecodedJwtToken(req).user_id,
            title,
            description,
            done,
        });

        return res.status(response ? 200 : 400).json(response);
    }

    static async updateToDoById(req: Request, res: Response) {
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

    static async deleteToDoById(req: Request, res: Response) {
        const { todo_id } = req.params;

        const response = await new DeleteToDoByIdUseCase(getToDosRepository()).execute(todo_id);

        return res.status(response ? 200 : 400).json(response);
    }
}
