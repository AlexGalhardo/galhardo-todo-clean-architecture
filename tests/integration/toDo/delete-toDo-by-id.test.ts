import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing delete toDo by id", () => {
    it("it should return http status code 200 with correct json response object", async () => {
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

        const respondeDeletedToDo = await request(app)
            .delete(`/api/todo/delete/${createdToDoResponse.body.toDo.id}`)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

        expect(respondeDeletedToDo.statusCode).toBe(HttpStatusCode.OK);
        expect(respondeDeletedToDo.body.success).toBeTruthy();

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
