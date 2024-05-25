import { ToDo } from "@prisma/client";
import { randomUUID } from "node:crypto";
import prisma from "../config/prisma";
import { ToDoCreateDTO } from "src/use-cases/todo/todo-create.usecase";
import { ToDoUpdateDTO } from "src/use-cases/todo/todo-update-by-id.usecase";

export interface ToDosRepositoryPort {
    getAll(): Promise<ToDo[]>;
    getById(id: string): Promise<ToDo | null>;
    create(todo: ToDoCreateDTO): Promise<ToDo>;
    update(todo: ToDoUpdateDTO): Promise<ToDo>;
    delete(id: string): Promise<ToDo>;
}

export default class ToDosRepository implements ToDosRepositoryPort {
    async getAll(): Promise<ToDo[]> {
        try {
            return await prisma.toDo.findMany({});
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getById(id: string): Promise<ToDo | null> {
        try {
            return await prisma.toDo.findUnique({
                where: {
                    id,
                },
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async create({ title, description, done }: ToDoCreateDTO): Promise<ToDo> {
        try {
            return await prisma.toDo.create({
                data: {
                    id: randomUUID(),
                    title,
                    description,
                    done,
                    created_at: new Date(),
                },
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update({ id, title, description, done }: ToDoUpdateDTO): Promise<ToDo> {
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
        } catch (error: any) {
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
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
