import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing register user", () => {
    it("it should return http status code 201 with correct json response object", async () => {
        const userObject = {
            name: "test",
            email: "test@gmail.com",
            password: "test123",
        };

        const response = await request(app)
            .post("/api/user/register")
            .send(userObject)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
        expect(response.body.user.id).toBeDefined();
        expect(response.body.user.name).toMatchObject(userObject.name);
        expect(response.body.user.email).toMatchObject(userObject.email);
        expect(response.body.user.password).toBeDefined();
    });
});
