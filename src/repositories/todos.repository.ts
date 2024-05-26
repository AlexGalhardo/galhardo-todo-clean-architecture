import { ToDo } from "@prisma/client";
import { randomUUID } from "node:crypto";
import prisma from "../config/prisma";
import { ToDoCreateDTO } from "src/use-cases/todo/todo-create.usecase";
import { ToDoUpdateDTO } from "src/use-cases/todo/todo-update-by-id.usecase";

export interface ToDosRepositoryPort {
    getAll(): Promise<ToDo[]>;
    getById(id: string): Promise<ToDo | null>;
    create(todo: ToDoCreateDTO): Promise<ToDo>;
    update(todo: ToDoUpdateDTO): Promise<ToDo | null>;
    delete(id: string): Promise<ToDo | null>;
}

export default class ToDosRepository implements ToDosRepositoryPort {
    async getAll(): Promise<ToDo[]> {
        if (process.env.USE_JSON_DATABASE === "true") {
            try {
                return await Bun.file("./src/repositories/todos.json").json();
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

        try {
            return await prisma.toDo.findMany({});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getById(id: string): Promise<ToDo | null> {
        if (process.env.USE_JSON_DATABASE === "true") {
            try {
                const file = await Bun.file("./src/repositories/todos.json").json();

                const todoFoundById = file.find((todo: any) => todo.id === id);

                if (todoFoundById) return todoFoundById;

                return null;
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

        try {
            return await prisma.toDo.findUnique({
                where: {
                    id,
                },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create({ title, description, done }: ToDoCreateDTO): Promise<ToDo> {
        if (process.env.USE_JSON_DATABASE === "true") {
            try {
                const file = await Bun.file("./src/repositories/todos.json").json();

                const newTodo = {
                    id: randomUUID(),
                    title,
                    description,
                    done,
                    created_at: new Date(),
                    updated_at: null,
                };

                file.push(newTodo);

                await Bun.write("./src/repositories/todos.json", JSON.stringify(file, null, 4));

                return newTodo;
            } catch (error: any) {
                throw new Error(error.message);
            }
        }

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
            throw new Error(error.message);
        }
    }

    async update({ id, title, description, done }: ToDoUpdateDTO): Promise<ToDo | null> {
        if (process.env.USE_JSON_DATABASE === "true") {
            try {
                const file = await Bun.file("./src/repositories/todos.json").json();

                const todoIndex = file.findIndex((todo: any) => todo.id === id);

                if (todoIndex === -1) return null;

                file[todoIndex].title = title;
                file[todoIndex].description = description;
                file[todoIndex].done = done;

                await Bun.write("./src/repositories/todos.json", JSON.stringify(file, null, 4));

                return file[todoIndex];
            } catch (error: any) {
                throw new Error(`Error updating todo: ${error.message}`);
            }
        }

        try {
            return await prisma.toDo.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    done,
                    updated_at: new Date(),
                },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: string): Promise<ToDo | null> {
        if (process.env.USE_JSON_DATABASE === "true") {
            try {
                const file = await Bun.file("./src/repositories/todos.json").json();

                const todoIndex = file.findIndex((todo: any) => todo.id === id);

                if (todoIndex === -1) return null;

                const todoDeleted = file.splice(todoIndex, 1);

                await Bun.write("./src/repositories/todos.json", JSON.stringify(file, null, 4));

                return todoDeleted;
            } catch (error: any) {
                throw new Error(`Error deleting todo: ${error.message}`);
            }
        }

        try {
            return await prisma.toDo.delete({
                where: {
                    id,
                },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
