import { ToDo } from "@prisma/client";
import { randomUUID } from "node:crypto";
import prisma from "../config/prisma";
import { ToDoCreateDTO } from "src/useCases/todo/ToDoCreate.useCase";
import { ToDoUpdateDTO } from "src/useCases/todo/ToDoUpdate.useCase";

export interface ToDosRepositoryPort {
    getAllByUserId(userId: string): Promise<ToDo[]>;
    getById(id: string): Promise<ToDo>;
    create(todo: ToDoCreateDTO): Promise<ToDo>;
    update(todo: ToDoUpdateDTO): Promise<ToDo>;
    delete(id: string): Promise<ToDo>;
}

export default class ToDosRepository implements ToDosRepositoryPort {
    async getAllByUserId(userId: string): Promise<ToDo[]> {
        try {
            return await prisma.toDo.findMany({
                where: {
                    user_id: userId,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(toDoId: string): Promise<ToDo> {
        try {
            return await prisma.toDo.findUnique({
                where: {
                    id: toDoId,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async create({ user_id, title, description, done }: ToDoCreateDTO): Promise<ToDo> {
        try {
            return await prisma.toDo.create({
                data: {
                    id: randomUUID(),
                    user_id,
                    title,
                    description,
                    done,
                    created_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async update({ id, title, description, done }): Promise<ToDo> {
        try {
            return await prisma.toDo.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    done,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id: string): Promise<ToDo> {
        try {
            return await prisma.toDo.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
