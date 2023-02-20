import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing logout user", () => {
    it("it should return http status code 200 with correct json response", async () => {
        const userObject = {
            name: faker.internet.userName(),
            email: "emailLogoutTest@gmail.com",
            password: "test123",
        };

        const userRegistred = await request(app)
            .post("/api/user/register")
            .send(userObject)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        const response = await request(app)
            .post("/api/user/logout")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${userRegistred.body.jwtToken}`);

        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body.success).toBeTruthy();
        expect(response.body.status).toBe("User loggued out successfully");

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
