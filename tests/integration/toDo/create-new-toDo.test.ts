import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing create new toDo", () => {
    it("it should return http status code 201 with correct json response object", async () => {
        const name = faker.internet.userName();
        const email = faker.internet.email();

        const userRegistredResponse = await request(app)
            .post("/api/user/register")
            .send({
                name,
                email,
                password: "test123",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(userRegistredResponse.statusCode).toBe(HttpStatusCode.CREATED);
        expect(userRegistredResponse.body.jwtToken).toBeDefined();

        const createdToDoResponse = await request(app)
            .post("/api/todo/create")
            .send({
                title: "test title",
                description: "test description",
                done: true,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

        expect(createdToDoResponse.statusCode).toBe(HttpStatusCode.CREATED);
        expect(createdToDoResponse.body.success).toBeTruthy();

        afterAll(async () => {
            const respondeDeletedUser = await request(app)
                .delete(`/api/user/delete/${userRegistredResponse.body.id}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

            expect(respondeDeletedUser.statusCode).toBe(HttpStatusCode.OK);
            expect(respondeDeletedUser.body.success).toBeTruthy();
        });
    });
});
