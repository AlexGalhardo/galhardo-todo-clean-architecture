import { Request, Response } from "express";

import { IToDoUseCaseDefaultResponse } from "../../ports/IToDosRepository";
import { getDecodedJwtToken } from "../../utils/DecodeJwtToken";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import CreateToDoUseCase from "./CreateToDoUseCase";
import DeleteToDoByIdUseCase from "./DeleteToDoByIdUseCase";
import GetAllToDosUseCase from "./GetAllToDosUseCase";
import GetToDoByIdUseCase from "./GetToDoByIdUseCase";
import UpdateToDoByIdUseCase from "./UpdateToDoByIdUseCase";

export default class ToDoController {
    static async getAllToDos(req: Request, res: Response): Promise<Response<IToDoUseCaseDefaultResponse>> {
        const { success, toDos, error } = await new GetAllToDosUseCase().execute(getDecodedJwtToken(req).userId);

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, toDos } : { success: false, error });
    }

    static async getById(req: Request, res: Response): Promise<Response<IToDoUseCaseDefaultResponse>> {
        const { todo_id } = req.params;

        const { success, toDo, error } = await new GetToDoByIdUseCase().execute(
            getDecodedJwtToken(req).userId,
            todo_id,
        );

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, toDo } : { success: false, error });
    }

    static async create(req: Request, res: Response): Promise<Response<IToDoUseCaseDefaultResponse>> {
        const { title, description, done } = req.body;

        const { success, toDo, error } = await new CreateToDoUseCase().execute({
            userId: getDecodedJwtToken(req).userId,
            title,
            description,
            done,
        });

        return res
            .status(success ? HttpStatusCode.CREATED : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, toDo } : { success: false, error });
    }

    static async updateById(req: Request, res: Response): Promise<Response<IToDoUseCaseDefaultResponse>> {
        const { id, title, description, done } = req.body;

        const { success, toDo, error } = await new UpdateToDoByIdUseCase().execute({
            id,
            title,
            description,
            done,
        });

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, toDo } : { success: false, error });
    }

    static async deleteById(req: Request, res: Response): Promise<Response<IToDoUseCaseDefaultResponse>> {
        const { todo_id } = req.params;

        const { success, error } = await new DeleteToDoByIdUseCase().execute(todo_id);

        return res
            .status(success ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST)
            .json(success ? { success: true, status: `ToDo Id: ${todo_id} deleted` } : { success: false, error });
    }
}
