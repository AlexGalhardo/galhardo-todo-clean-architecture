import { ToDo } from "@prisma/client";
import { randomUUID } from "crypto";

import prisma from "../../config/prisma";
import { IToDosRepository, ICreateToDoParams, IUpdateToDoParams } from "../../ports/IToDosRepository";
import DateTime from "../../utils/DateTime";

export default class PostgresToDosRepository implements IToDosRepository {
    async getAll(user_id: string): Promise<ToDo[]> {
        return await prisma.toDo.findMany({
            where: {
                user_id,
            },
        });
    }

    async getById(toDoId: string): Promise<ToDo[]> {
        return await prisma.toDo.findMany({
            where: {
                id: toDoId,
            },
        });
    }

    async create(toDoParamObject: ICreateToDoParams): Promise<ToDo | null> {
        const { userId, title, description, done } = toDoParamObject;

        return await prisma.toDo.create({
            data: {
                id: randomUUID(),
                user_id: userId,
                title,
                description,
                done,
                created_at: DateTime.getNow(),
            },
        });
    }

    async updateById(toDoParamObject: IUpdateToDoParams): Promise<ToDo> {
        const { toDoId, title, description, done } = toDoParamObject;

        return await prisma.toDo.update({
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

    async deleteById(toDoId: string): Promise<ToDo> {
        return await prisma.toDo.delete({
            where: {
                id: toDoId,
            },
        });
    }
}
