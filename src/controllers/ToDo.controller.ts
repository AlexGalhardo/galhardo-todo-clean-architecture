import ToDoCreateUseCase from "src/use-cases/todo/todo-create.usecase";
import ToDoDeleteByIdUseCase from "src/use-cases/todo/todo-delete.usecase";
import ToDoGetAllUseCase from "src/use-cases/todo/todo-get-all.usecase";
import ToDoGetByIdUseCase from "src/use-cases/todo/todo-get-by-id.usecase";
import ToDoUpdateUseCase from "src/use-cases/todo/todo-update-by-id.usecase";

export default class ToDoController {
    static async getAll(_: any, reply: any) {
        try {
            const { success, data } = await new ToDoGetAllUseCase().execute();
            if (success === true) return reply.send({ success: true, data });
        } catch (error: any) {
            return reply.send({ success: false, message: error.message });
        }
    }

    static async getById(request: any, reply: any) {
        try {
            const { todo_id } = request.params;
            const { success, data } = await new ToDoGetByIdUseCase().execute(todo_id);
            if (success === true) return reply.send({ success: true, data });
        } catch (error: any) {
            return reply.send({ success: false, message: error.message });
        }
    }

    static async create(request: any, reply: any) {
        try {
            const { title, description, done } = request.body;
            const { success, data } = await new ToDoCreateUseCase().execute({
                title,
                description,
                done,
            });
            if (success === true) reply.send({ success: true, data });
        } catch (error: any) {
            return reply.send({ success: false, message: error.message });
        }
    }

    static async update(request: any, reply: any) {
        try {
            const { id, title, description, done } = request.body;
            const { success, data } = await new ToDoUpdateUseCase().execute({
                id,
                title,
                description,
                done,
            });
            if (success === true) return reply.send({ success: true, data });
        } catch (error: any) {
            return reply.send({ success: false, message: error.message });
        }
    }

    static async delete(request: any, reply: any) {
        try {
            const { todo_id } = request.params;
            const { success, data } = await new ToDoDeleteByIdUseCase().execute(todo_id);
            if (success === true) return reply.send({ success: true, data });
        } catch (error: any) {
            return reply.send({ success: false, message: error.message });
        }
    }
}
