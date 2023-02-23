import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing logout user", () => {
    it("it should return http status code 200 with correct json response", async () => {
        const userRegistredResponse = await request(app)
            .post("/api/user/register")
            .send({
                name: faker.internet.userName(),
                email: "emailLogoutTest@gmail.com",
                password: "test123",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(userRegistredResponse.statusCode).toBe(HttpStatusCode.CREATED);
        expect(userRegistredResponse.body.jwtToken).toBeDefined();

        const logoutUserResponse = await request(app)
            .post("/api/user/logout")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

        expect(logoutUserResponse.statusCode).toBe(HttpStatusCode.OK);
        expect(logoutUserResponse.body.success).toBeTruthy();
        expect(logoutUserResponse.body.status).toBe("User loggued out successfully");

        afterAll(async () => {
            const deleteUserResponse = await request(app)
                .delete(`/api/user/delete/${userRegistredResponse.body.id}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

            expect(deleteUserResponse.statusCode).toBe(HttpStatusCode.OK);
            expect(deleteUserResponse.body.success).toBeTruthy();
        });
    });
});
