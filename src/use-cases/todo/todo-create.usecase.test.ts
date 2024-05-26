import { afterAll, describe, expect, it } from "bun:test";

describe("todo-create.usecase.test.ts", () => {
    it("should create a new todo", async () => {
        const request = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: "todo test",
                description: "description",
                done: false,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const response = await request.json();

        expect(response.success).toBe(true);
        expect(response.data.id).toBeDefined();
        expect(response.data.title).toBe("todo test");
        expect(response.data.description).toBe("description");
        expect(response.data.done).toBeFalse();
        expect(new Date(response.data.created_at)).toBeDate();
        expect(response.data.updated_at).toBeNull();

        afterAll(async () => {
            await fetch(`http://localhost:3000/todo/${response.data.id}`, {
                method: "DELETE",
            });
        });
    });
});
