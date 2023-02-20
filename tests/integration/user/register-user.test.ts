import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing register user", () => {
    it("it should return http status code 201 with correct json response object", async () => {
        const name = faker.internet.userName();
        const email = faker.internet.email();

        const userObject = {
            name,
            email,
            password: "test123",
        };

        const userRegistred = await request(app)
            .post("/api/user/register")
            .send(userObject)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(userRegistred.statusCode).toBe(HttpStatusCode.CREATED);
        expect(userRegistred.body.id).toBeDefined();
        expect(userRegistred.body.name).toMatchObject(userObject.name);
        expect(userRegistred.body.email).toMatchObject(userObject.email);
        expect(userRegistred.body.password).toBeDefined();
        expect(userRegistred.body.jwtToken).toBeDefined();
        expect(userRegistred.body.updatedAt).toBeNull();

        afterAll(async () => {
            const response = await request(app)
                .delete(`/api/user/delete/${userRegistred.body.id}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${userRegistred.body.jwtToken}`);

            expect(response.statusCode).toBe(HttpStatusCode.OK);
            expect(response.body.success).toBeTruthy();
        });
    });
});
