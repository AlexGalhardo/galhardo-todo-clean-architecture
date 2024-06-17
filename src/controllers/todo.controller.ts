import logger from "src/config/logger";
import ToDoCreateUseCase from "src/use-cases/todo/todo-create.usecase";
import ToDoDeleteByIdUseCase from "src/use-cases/todo/todo-delete.usecase";
import ToDoGetAllUseCase from "src/use-cases/todo/todo-get-all.usecase";
import ToDoGetByIdUseCase from "src/use-cases/todo/todo-get-by-id.usecase";
import ToDoUpdateUseCase from "src/use-cases/todo/todo-update-by-id.usecase";
import createTodoSchema from "./validators/create-todo-schema.validator";
import todoIdParamSchema from "./validators/todo-id-param-schema.validator";

export default class ToDoController {
	static async getAll(_: any, reply: any) {
		try {
			const { success, data } = await new ToDoGetAllUseCase().execute();
			if (success === true) {
				reply.status(200).send({ success: true, data });
				logger.info(`TODO GET ALL: \n\n ${JSON.stringify(data)}`);
			}
		} catch (error: any) {
			logger.error(`ERROR GETTING ALL TODOS: \n\n ${JSON.stringify(error)}`);
			return reply.send({ success: false, message: error.issues ?? error.message });
		}
	}

	static async getById(request: any, reply: any) {
		try {
			todoIdParamSchema.parse(request.params)
			const { id } = request.params;
			const { success, data } = await new ToDoGetByIdUseCase().execute(id);
			if (success === true) {
				reply.status(200).send({ success: true, data });
				logger.info(`TODO GET BY ID: \n\n ${JSON.stringify(data)}`);
			}
		} catch (error: any) {
			logger.error(`ERROR CREATING TODO: \n\n ${JSON.stringify(error)}`);
			return reply.send({ success: false, message: error.issues ?? error.message });
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
				reply.status(201).send({ success: true, data });
				logger.info(`TODO CREATED: \n\n ${JSON.stringify(data)}`);
			}
		} catch (error: any) {
			logger.error(`ERROR CREATING TODO: \n\n ${JSON.stringify(error)}`);
			return reply.send({ success: false, message: error.issues ?? error.message });
		}
	}

	static async update(request: any, reply: any) {
		try {
			todoIdParamSchema.parse(request.params)
			const { id } = request.params;
			createTodoSchema.parse(request.body);
			const { title, description, done } = request.body;
			const { success, data } = await new ToDoUpdateUseCase().execute({
				id,
				title,
				description,
				done,
			});
			if (success === true) {
				reply.status(200).send({ success: true, data });
				logger.info(`TODO UPDATED: \n\n ${JSON.stringify(data)}`);
			}
		} catch (error: any) {
			logger.error(`ERROR UPDATING TODO: \n\n ${JSON.stringify(error)}`);
			return reply.send({ success: false, message: error.issues ?? error.message });
		}
	}

	static async delete(request: any, reply: any) {
		try {
			todoIdParamSchema.parse(request.params)
			const { id } = request.params;
			const { success, data } = await new ToDoDeleteByIdUseCase().execute(id);
			if (success === true) {
				reply.status(200).send({ success: true, data });
				logger.info(`TODO DELETED: \n\n ${JSON.stringify(data)}`);
			}
		} catch (error: any) {
			logger.error(`ERROR DELETING TODO: \n\n ${JSON.stringify(error)}`);
			return reply.send({ success: false, message: error.issues ?? error.message });
		}
	}
}
