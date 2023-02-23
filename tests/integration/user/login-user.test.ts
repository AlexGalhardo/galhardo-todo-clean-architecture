import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing login user", () => {
    it("it should return http status code 200 with correct json response along with user jwtToken", async () => {
        const userRegistredResponse = await request(app)
            .post("/api/user/register")
            .send({
                name: faker.internet.userName(),
                email: "emailTest@gmail.com",
                password: "test123",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(userRegistredResponse.statusCode).toBe(HttpStatusCode.CREATED);
        expect(userRegistredResponse.body.jwtToken).toBeDefined();

        const loginUserResponse = await request(app)
            .post("/api/user/login")
            .send({
                email: "emailTest@gmail.com",
                password: "test123",
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        expect(loginUserResponse.statusCode).toBe(HttpStatusCode.OK);
        expect(loginUserResponse.body.success).toBeTruthy();
        expect(loginUserResponse.body.user).toBeDefined();
        expect(loginUserResponse.body.user.email).toBe("emailTest@gmail.com");

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
