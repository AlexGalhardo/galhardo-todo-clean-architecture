import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import { faker } from '@faker-js/faker';

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";
import { randomUUID } from "crypto";

describe("testing register user", () => {
	it("it should return http status code 200 with correct json response object", async () => {
		const userId = randomUUID();
		const userObject = {
			id: userId,
			name: faker.internet.userName(),
			email: faker.internet.email(),
			password: "test123",
		};

		const userCreated = await request(app)
			.post("/api/user/register")
			.send(userObject)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		const newEmail = faker.internet.email()
		const updatedUser = {
			id: userId,
			newName: faker.internet.userName(),
			newEmail,
			olderPassword: "test123",
			newPassword: "123456",
		};

		const response = await request(app)
			.put("/api/user/update")
			.send(updatedUser)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${userCreated.body.jwtToken}`)

		expect(response.statusCode).toBe(HttpStatusCode.OK);
		expect(response.body.user.id).toBeDefined();
		expect(response.body.user.name).toMatchObject(updatedUser.newName);
		expect(response.body.user.email).toMatchObject(updatedUser.newEmail);
		expect(response.body.user.updatedAt).toBeTruthy();

		afterAll(async () => {
			const response = await request(app)
				.delete(`/api/user/delete/${userCreated.body.id}`)
				.send(userObject)
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.set("Authorization", `Bearer ${userCreated.body.jwtToken}`);

			expect(response.statusCode).toBe(HttpStatusCode.OK);
			expect(response.body.success).toBeTruthy();
		})
	});
});
