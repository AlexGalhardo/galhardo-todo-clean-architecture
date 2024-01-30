import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { ToDo } from "@prisma/client";
import ToDoCreateUseCase from "src/useCases/todo/ToDoCreate.useCase";
import ToDoUpdateUseCase from "src/useCases/todo/ToDoUpdate.useCase";
import ToDoDeleteByIdUseCase from "../useCases/todo/ToDoDelete.useCase";
import ToDoGetAllUseCase from "src/useCases/todo/ToDoGetAll.useCase";
import ToDoGetByIdUseCase from "src/useCases/todo/ToDoGetById.useCase";

interface ToDoControllerResponse {
    success: boolean;
    message?: string;
    data?: ToDo | ToDo[];
}

export default class ToDoController {
    static async getAll(req: Request, res: Response): Promise<Response<ToDoControllerResponse>> {
        try {
            const { success, data } = await new ToDoGetAllUseCase().execute(res.locals.userId);
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async getById(req: Request, res: Response): Promise<Response<ToDoControllerResponse>> {
        try {
            const { todo_id } = req.params;
            const { success, data } = await new ToDoGetByIdUseCase().execute(todo_id);
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async create(req: Request, res: Response): Promise<Response<ToDoControllerResponse>> {
        try {
            const { title, description, done } = req.body;
            const { success, data } = await new ToDoCreateUseCase().execute({
                user_id: res.locals.userId,
                title,
                description,
                done,
            });
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response): Promise<Response<ToDoControllerResponse>> {
        try {
            const { id, title, description, done } = req.body;
            const { success, data } = await new ToDoUpdateUseCase().execute({
                id,
                title,
                description,
                done,
            });
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<Response<ToDoControllerResponse>> {
        try {
            const { todo_id } = req.params;
            const { success, data } = await new ToDoDeleteByIdUseCase().execute(todo_id);
            if (success === true) return res.status(HttpStatusCode.OK).json({ success: true, data });
        } catch (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}
