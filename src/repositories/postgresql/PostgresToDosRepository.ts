import { ToDo } from "@prisma/client";
import { randomUUID } from "crypto";

import prisma from "../../config/prisma";
import ToDoEntity from "../../entities/ToDoEntity";
import { IToDosRepository, ToDoRepositoryResponse } from "../../ports/IToDosRepository";

export default class PostgresToDosRepository implements IToDosRepository {
    private getToDoEntityFromPrismaToDo(queryResponse: ToDo): ToDoEntity {
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

    private getToDoSEntitiesFromPrismaToDos(queryResponse: ToDo[]): ToDoEntity[] {
        const toDosEntities: ToDoEntity[] = [];

        queryResponse.forEach((todo: ToDo) => {
            toDosEntities.push(
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

        return toDosEntities;
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
                    user_id: newToDo.getUserId,
                    title: newToDo.getTitle,
                    description: newToDo.getDescription,
                    done: newToDo.getDone,
                    created_at: newToDo.getCreatedAt,
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

    async save(updatedToDo: ToDoEntity): Promise<ToDoRepositoryResponse> {
        try {
            const queryResponse = await prisma.toDo.update({
                where: {
                    id: updatedToDo.getId,
                },
                data: {
                    title: updatedToDo.getTitle,
                    description: updatedToDo.getDescription,
                    done: updatedToDo.getDone,
                },
            });

            if (queryResponse) return { success: true, toDoEntity: this.getToDoEntityFromPrismaToDo(queryResponse) };
        } catch (error) {
            return { success: false, error };
        }
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
