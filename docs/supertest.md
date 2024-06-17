## Supertest

- Example
```js
import { afterAll, describe, expect, it } from "bun:test";
import request from "supertest";
import app from "../../server";

describe("todo-delete.usecase.test.ts", () => {
    it("should create todo", async () => {
        request(app.server)
            .post("/todo")
            .set("Content-Type", "application/json")
            .send(
                JSON.stringify({
                    title: "todo test",
                    description: "description",
                    done: false,
                }),
            )
            .expect(201)
            .end(function (err, { body }) {
                if (err) throw new Error(err);

                expect(body.success).toBe(true);
                expect(body.data.id).toBeDefined();
                expect(body.data.title).toBe("todo test");
                expect(body.data.description).toBe("description");
                expect(body.data.done).toBeFalse();
                expect(new Date(body.data.created_at)).toBeDate();
                expect(body.data.updated_at).toBeNull();

                afterAll(async () => {
                    app.close();
                });
            });
    });
});
```
