/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import { ToDo } from "@prisma/client";
import { randomUUID } from "crypto";

import prisma from "../../config/prisma";
import DateTime from "../../utils/DateTime";
import {
	IToDosRepository,
	ICreateToDoParams,
	IUpdateToDoParams,
} from "../../ports/IToDosRepository";

export default class PostgresToDosRepository implements IToDosRepository {
	async getAll (user_id: string): Promise<ToDo[]> {
		return await prisma.todo.findMany({
			where: {
				user_id,
			},
		});
	}

	async getById (
		toDoId: string
	): Promise<ToDo[]> {
		return await prisma.todo.findMany({
			where: {
				id: toDoId,
			},
		});
	}

	async create (toDoParamObject: ICreateToDoParams): Promise<ToDo | null> {
		const { userId, title, description, done } = toDoParamObject;

		const Account = await prisma.account.findFirst({
			where: {
				user_id,
			},
		});

		return prisma.todo.update({
			where: {
				user_id: userId
			},
			data: {
				title,
				description,
				done,
				updated_at: DateTime.getNow(),
			},
		});
	}

	async updateById (toDoParamObject: IUpdateToDoParams): Promise<ToDo> {
		const { toDoId, title, description, done } = toDoParamObject;

		return await prisma.todo.update({
			where: {
				id: toDoId,
			},
			data: {
				title,
				description,
				done,
			},
		});
	}

	async deleteById (toDoId: string): Promise<ToDo> {
		return await prisma.todo.delete({
			where: {
				id: toDoId,
			},
		});
	}
}
