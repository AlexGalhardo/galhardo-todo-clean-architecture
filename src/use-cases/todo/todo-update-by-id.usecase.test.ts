import { afterAll, describe, expect, it } from "bun:test";

describe("todo-update-by-id.usecase.test.ts", () => {
    it("should update todo by id in params", async () => {
        const request = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: "todo get by id",
                description: "description get by id",
                done: false,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const response = await request.json();

        expect(response.success).toBe(true);
        expect(response.data.id).toBeDefined();
        expect(response.data.title).toBe("todo get by id");
        expect(response.data.description).toBe("description get by id");
        expect(response.data.done).toBeFalse();
        expect(new Date(response.data.created_at)).toBeDate();
        expect(response.data.updated_at).toBeNull();

        const requestUpdate = await fetch(`http://localhost:3000/todo/${response.data.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: "title test updated",
                description: "description test updated",
                done: true,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const responseUpdate = await requestUpdate.json();

        expect(responseUpdate.success).toBe(true);
        expect(responseUpdate.data.id).toBeDefined();
        expect(responseUpdate.data.title).toBe("title test updated");
        expect(responseUpdate.data.description).toBe("description test updated");
        expect(responseUpdate.data.done).toBeTrue();
        expect(new Date(responseUpdate.data.created_at)).toBeDate();
        expect(new Date(responseUpdate.data.updated_at)).toBeDate();

        afterAll(async () => {
            await fetch(`http://localhost:3000/todo/${response.data.id}`, {
                method: "DELETE",
            });
        });
    });
});
