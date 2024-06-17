import { afterAll, describe, expect, it } from "bun:test";

describe("todo-get-by-id.usecase.test.ts", () => {
    it("should get todo by id in params", async () => {
        const request = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: "todo get by id",
                description: "description get by id",
                done: false,
            }),
            headers: { "Content-Type": "application/json" },
        });

        const response: any = await request.json();

        expect(response.success).toBe(true);
        expect(response.data.id).toBeDefined();
        expect(response.data.title).toBe("todo get by id");
        expect(response.data.description).toBe("description get by id");
        expect(response.data.done).toBeFalse();
        expect(new Date(response.data.created_at)).toBeDate();
        expect(response.data.updated_at).toBeNull();

        const requestFindById = await fetch(`http://localhost:3000/todo/${response.data.id}`);

        const responseFindById: any = await requestFindById.json();

        expect(responseFindById.success).toBe(true);
        expect(responseFindById.data.id).toBeDefined();
        expect(responseFindById.data.title).toBe("todo get by id");
        expect(responseFindById.data.description).toBe("description get by id");
        expect(responseFindById.data.done).toBeFalse();
        expect(new Date(responseFindById.data.created_at)).toBeDate();
        expect(responseFindById.data.updated_at).toBeNull();

        afterAll(async () => {
            await fetch(`http://localhost:3000/todo/${response.data.id}`, {
                method: "DELETE",
            });
        });
    });
});
