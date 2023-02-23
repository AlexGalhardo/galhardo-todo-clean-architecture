import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing register user", () => {
	it("it should return http status code 201 with correct json response object", async () => {
		const userObject = {
			name: faker.internet.userName(),
			email: faker.internet.email(),
			password: "test123",
		};

		const userRegistredResponse = await request(app)
			.post("/api/user/register")
			.send(userObject)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(userRegistredResponse.statusCode).toBe(HttpStatusCode.CREATED);
		expect(userRegistredResponse.body.id).toBeDefined();
		expect(userRegistredResponse.body.name).toMatchObject(userObject.name);
		expect(userRegistredResponse.body.email).toMatchObject(userObject.email);
		expect(userRegistredResponse.body.password).toBeDefined();
		expect(userRegistredResponse.body.jwtToken).toBeDefined();
		expect(userRegistredResponse.body.updatedAt).toBeNull();

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
