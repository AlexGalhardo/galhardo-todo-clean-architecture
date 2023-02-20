import { randomUUID } from "crypto";
import { describe, it, expect } from "vitest";

import ToDoEntity from "../../../src/entities/ToDoEntity";
import UserEntity from "../../../src/entities/UserEntity";
import Bcrypt from "../../../src/utils/Bcrypt";

describe("testing user entity", async () => {
    it("it should create user entity with correct properties response", async () => {
        const userId = randomUUID();
        const user = await UserEntity.init(userId, "name", "email@gmail.com", "password123");

        const passwordCorrectly = await Bcrypt.compare("password123", user.getPassword);

        const firstToDoId = randomUUID();
        const secondToDoId = randomUUID();
        const thirdToDoId = randomUUID();

        const firstTodo = new ToDoEntity(firstToDoId, userId, "first todo", "first description", true);
        const secondTodo = new ToDoEntity(secondToDoId, userId, "first todo", "first description");
        const thirdTodo = new ToDoEntity(thirdToDoId, userId, "first todo", "first description", true);

        user.addToDo(firstTodo);
        user.addToDo(secondTodo);
        user.addToDo(thirdTodo);

        expect(user.getId).toBe(userId);
        expect(user.getName).toBe("name");
        expect(user.getEmail).toBe("email@gmail.com");
        expect(passwordCorrectly).toBeTruthy();
        expect(user.getJwtToken).toBeDefined();
        expect(user.getCreatedAt).toBeDefined();
        expect(user.getUpdatedAt).toBeNull();

        expect(user.getToDoById(firstToDoId)?.getId).toBe(firstToDoId);
        expect(user.getToDoById(secondToDoId)?.getId).toBe(secondToDoId);
        expect(user.getToDoById(thirdToDoId)?.getId).toBe(thirdToDoId);

        expect(user.getAllTodos).toStrictEqual([firstTodo, secondTodo, thirdTodo]);
    });
});
