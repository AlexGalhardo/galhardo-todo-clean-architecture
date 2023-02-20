import { ToDo } from "@prisma/client";
import { randomUUID } from "crypto";
import ToDoEntity from "src/entities/ToDoEntity";

import prisma from "../../config/prisma";
import { IToDosRepository, ToDoRepositoryResponse } from "../../ports/IToDosRepository";
import DateTime from "../../utils/DateTime";

export default class PostgresToDosRepository implements IToDosRepository {
    private getToDoEntityFromPrismaToDo(queryResponse: ToDo) {
        return new ToDoEntity(
            queryResponse.id,
            queryResponse.user_id,
            queryResponse.title,
            queryResponse.description,
            queryResponse.done,
            queryResponse.created_at,
            queryResponse.updated_at,
        );
    }

    private getToDoSEntitiesFromPrismaToDos(queryResponse: ToDo[]) {
        const toDoesEntities: ToDoEntity[] = [];

        queryResponse.forEach((todo: ToDo) => {
            toDoesEntities.push(
                new ToDoEntity(
                    todo.id,
                    todo.user_id,
                    todo.title,
                    todo.description,
                    todo.done,
                    todo.created_at,
                    todo.updated_at,
                ),
            );
        });

        return toDoesEntities;
    }

    async getAllByUserId(userId: string): Promise<ToDoRepositoryResponse> {
        try {
            const allToDosFound = await prisma.toDo.findMany({
                where: {
                    user_id: userId,
                },
            });

            if (allToDosFound) {
                return {
                    success: true,
                    toDosEntities: this.getToDoSEntitiesFromPrismaToDos(allToDosFound),
                };
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    async getById(toDoId: string): Promise<ToDoRepositoryResponse> {
        try {
            const toDo = await prisma.toDo.findUnique({
                where: {
                    id: toDoId,
                },
            });

            if (toDo) {
                return {
                    success: true,
                    toDoEntity: this.getToDoEntityFromPrismaToDo(toDo),
                };
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    async create(newToDo: ToDoEntity): Promise<ToDoRepositoryResponse> {
        try {
            const toDo = await prisma.toDo.create({
                data: {
                    id: randomUUID(),
                    user_id: userId,
                    title,
                    description,
                    done,
                    created_at: DateTime.getNow,
                },
            });

            if (toDo) {
                return {
                    success: true,
                    toDoEntity: this.getToDoEntityFromPrismaToDo(toDo),
                };
            }
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    async save(toDo: ToDoEntity): Promise<ToDoRepositoryResponse> {
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

    async deleteById(toDoId: string): Promise<ToDoRepositoryResponse> {
        try {
            const queryResponse = await prisma.toDo.delete({
                where: {
                    id: toDoId,
                },
            });

            if (queryResponse) return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }
}
