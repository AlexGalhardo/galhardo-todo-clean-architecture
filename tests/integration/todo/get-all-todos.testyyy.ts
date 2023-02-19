import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../../src/app";
import PostgresToDosRepository from "../../../src/repositories/postgresql/PostgresToDosRepository";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

const { USER_TEST_ID, USER_TEST_EMAIL, USER_TEST_PASSWORD } = process.env;

describe("testing get all users", () => {
    it("it should return http status code 200 with all users entity json array response", async () => {
        const userTestLoginResponse = await request(app)
            .post("/api/user/login")
            .send({
                email: USER_TEST_EMAIL,
                password: USER_TEST_PASSWORD,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");

        const response = await request(app)
            .get("/api/transaction/all")
            .set("Authorization", `Bearer ${userTestLoginResponse.body.jwtToken}`);

        const expected_response = await new PostgresToDosRepository().getAll(USER_TEST_ID as string);

        expect(response.statusCode).toBe(HttpStatusCode.OK);
        expect(response.body).toMatchObject(expected_response);
    });
});
