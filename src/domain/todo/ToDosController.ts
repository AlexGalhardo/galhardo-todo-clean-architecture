import { Request, Response } from "express";

import { getDecodedJwtToken } from "../../utils/DecodeJwtToken";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import CreateToDoUseCase from "./CreateToDoUseCase";
import DeleteToDoByIdUseCase from "./DeleteToDoByIdUseCase";
import GetAllToDosUseCase from "./GetAllToDosUseCase";
import GetToDoByIdUseCase from "./GetToDoByIdUseCase";
import UpdateToDoByIdUseCase from "./UpdateToDoByIdUseCase";

export default class ToDosController {
    static async getAllToDos(req: Request, res: Response) {
        const { success, data, error } = await new GetAllToDosUseCase().execute(getDecodedJwtToken(req).user_id);

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, data } : { success: false, error });
    }

    static async getById(req: Request, res: Response) {
        const { todo_id } = req.params;

        const { success, data, error } = await new GetToDoByIdUseCase().execute(todo_id);

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, data } : { success: false, error });
    }

    static async create(req: Request, res: Response) {
        const { title, description, done } = req.body;

        const { success, data, error } = await new CreateToDoUseCase().execute({
            userId: getDecodedJwtToken(req).user_id,
            title,
            description,
            done,
        });

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, data } : { success: false, error });
    }

    static async updateById(req: Request, res: Response) {
        const { id, title, description, done } = req.body;

        const { success, data, error } = await new UpdateToDoByIdUseCase().execute({
            id,
            title,
            description,
            done,
        });

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, data } : { success: false, error });
    }

    static async deleteToDoById(req: Request, res: Response) {
        const { todo_id } = req.params;

        const { success, error } = await new DeleteToDoByIdUseCase().execute(todo_id);

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, status: `ToDo Id ${todo_id} deleted` } : { success: false, error });
    }
}
