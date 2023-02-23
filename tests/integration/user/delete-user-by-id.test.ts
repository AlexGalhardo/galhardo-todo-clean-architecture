import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing delete user by id", () => {
	it("it should return http status code 200 with correct json response object", async () => {
		const name = faker.internet.userName();
		const email = faker.internet.email();
		const createdUserResponse = await request(app)
			.post("/api/user/register")
			.send({
				name,
				email,
				password: "test123",
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		const deleteUserResponse = await request(app)
			.delete(`/api/user/delete/${createdUserResponse.body.id}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${createdUserResponse.body.jwtToken}`);

		expect(deleteUserResponse.statusCode).toBe(HttpStatusCode.OK);
		expect(deleteUserResponse.body.success).toBeTruthy();
	});
});
