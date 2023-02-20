import { randomUUID } from "crypto";
import { describe, it, expect } from "vitest";

import ToDoEntity from "../../../src/entities/ToDoEntity";

describe("testing toDo entity", async () => {
    it("it should create toDo entity with correct properties response", async () => {
        const firstToDoId = randomUUID();
        const secondToDoId = randomUUID();

        const firstToDo = new ToDoEntity(firstToDoId, "first todo", "first description", true);

        expect(firstToDo.getId).toBe(firstToDoId);
        expect(firstToDo.getTitle).toBe("first todo");
        expect(firstToDo.getDescription).toBe("first description");
        expect(firstToDo.getDone).toBeTruthy();
        expect(firstToDo.getCreatedAt).toBeDefined();
        expect(firstToDo.getUpdatedAt).toBeNull();

        firstToDo.setTitle("First Title Updated");
        firstToDo.setDescription("First description updated");
        firstToDo.setDone(false);
        firstToDo.setUpdatedAt();

        expect(firstToDo.getTitle).toBe("First Title Updated");
        expect(firstToDo.getDescription).toBe("First description updated");
        expect(firstToDo.getDone).toBeFalsy();
        expect(firstToDo.getUpdatedAt).toBeDefined();

        const secondTodo = new ToDoEntity(secondToDoId, "second todo", "second description");

        expect(secondTodo.getId).toBe(secondToDoId);
        expect(secondTodo.getTitle).toBe("second todo");
        expect(secondTodo.getDescription).toBe("second description");
        expect(secondTodo.getDone).toBeFalsy();
        expect(secondTodo.getCreatedAt).toBeDefined();
        expect(secondTodo.getUpdatedAt).toBeNull();
    });
});
