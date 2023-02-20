import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import { faker } from '@faker-js/faker';

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing get all user todos", () => {
	it("it should return http status code 200 with correct json response object", async () => {
		const name = faker.internet.userName(),
			email = faker.internet.email();

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

		const responseGetAllToDos = await request(app)
			.post("/api/todo/all")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${userRegistred.body.jwtToken}`)

		console.log('responseGetAllToDos.body => ', responseGetAllToDos.body)

		expect(responseGetAllToDos.statusCode).toBe(HttpStatusCode.OK);

		afterAll(async () => {
			const response = await request(app)
				.delete(`/api/user/delete/${userRegistred.body.id}`)
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.set("Authorization", `Bearer ${userRegistred.body.jwtToken}`);

			expect(response.statusCode).toBe(HttpStatusCode.OK);
			expect(response.body.success).toBeTruthy();
		})
	});
});
