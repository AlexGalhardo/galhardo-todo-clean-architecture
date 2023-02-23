import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing register user", () => {
	it("it should return http status code 200 with correct json response object", async () => {
		const userRegistredResponse = await request(app)
			.post("/api/user/register")
			.send({
				id: randomUUID(),
				name: faker.internet.userName(),
				email: faker.internet.email(),
				password: "test123",
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(userRegistredResponse.statusCode).toBe(HttpStatusCode.CREATED);
		expect(userRegistredResponse.body.jwtToken).toBeDefined();

		const updatedUser = {
			newName: faker.internet.userName(),
			newEmail: faker.internet.email(),
			olderPassword: "test123",
			newPassword: "123456",
		};

		const updateUserResponse = await request(app)
			.put("/api/user/update")
			.send(updatedUser)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

		expect(updateUserResponse.statusCode).toBe(HttpStatusCode.OK);
		expect(updateUserResponse.body.user.id).toBeDefined();
		expect(updateUserResponse.body.user.name).toMatchObject(updatedUser.newName);
		expect(updateUserResponse.body.user.email).toMatchObject(updatedUser.newEmail);
		expect(updateUserResponse.body.user.updatedAt).toBeDefined();

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
