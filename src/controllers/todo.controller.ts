import logger from "src/config/logger";
import ToDoCreateUseCase from "src/use-cases/todo/todo-create.usecase";
import ToDoDeleteByIdUseCase from "src/use-cases/todo/todo-delete.usecase";
import ToDoGetAllUseCase from "src/use-cases/todo/todo-get-all.usecase";
import ToDoGetByIdUseCase from "src/use-cases/todo/todo-get-by-id.usecase";
import ToDoUpdateUseCase from "src/use-cases/todo/todo-update-by-id.usecase";
import createTodoSchema from "./validators/create-todo-schema.validator";

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
			const { id } = request.params;
			const { success, data } = await new ToDoGetByIdUseCase().execute(id);
			if (success === true) return reply.send({ success: true, data });
			return reply.send({ success: false, message: "Todo not found" });
		} catch (error: any) {
			return reply.send({ success: false, message: error.message });
		}
	}

	static async create(request: any, reply: any) {
		try {
			createTodoSchema.parse(request.body);
			const { title, description, done } = request.body;
			const { success, data } = await new ToDoCreateUseCase().execute({
				title,
				description,
				done,
			});
			if (success === true) {
				reply.send({ success: true, data });
				logger.info(`TODO CREATED: \n\n ${JSON.stringify(data)}`);
			}
		} catch (error: any) {
			logger.error(`ERROR CREATING TODO: \n\n ${JSON.stringify(error)}`);
			return reply.send({ success: false, message: error.issues ?? error.message });
		}
	}

	static async update(request: any, reply: any) {
		try {
			const { id } = request.params;
			const { title, description, done } = request.body;
			const { success, data } = await new ToDoUpdateUseCase().execute({
				id,
				title,
				description,
				done,
			});
			if (success === true) return reply.send({ success: true, message: "Todo updated!", data });
			return reply.send({ success: false, message: "Todo not found to update" });
		} catch (error: any) {
			return reply.send({ success: false, message: error.message });
		}
	}

	static async delete(request: any, reply: any) {
		try {
			const { id } = request.params;
			const { success, data } = await new ToDoDeleteByIdUseCase().execute(id);
			if (success === true) return reply.send({ success: true, message: "Todo deleted!", data });
			return reply.send({ success: false, message: "Todo not found to delete" });
		} catch (error: any) {
			return reply.send({ success: false, message: error.message });
		}
	}
}
