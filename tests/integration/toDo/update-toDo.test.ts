import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";

import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing update toDo", () => {
	it("it should return http status code 200 with correct json response object", async () => {
		const userRegistredResponse = await request(app)
			.post("/api/user/register")
			.send({
				name: faker.internet.userName(),
				email: faker.internet.email(),
				password: "test123",
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(userRegistredResponse.statusCode).toBe(HttpStatusCode.CREATED);
		expect(userRegistredResponse.body.jwtToken).toBeDefined();

		const createdToDoResponse = await request(app)
			.post("/api/todo/create")
			.send({
				title: "test title",
				description: "test description",
				done: true,
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

		expect(createdToDoResponse.statusCode).toBe(HttpStatusCode.CREATED);
		expect(createdToDoResponse.body.success).toBeTruthy();

		const updatedTodoResponse = await request(app)
			.put("/api/todo/update")
			.send({
				id: createdToDoResponse.body.toDo.id,
				title: "title updated",
				description: "description updated",
				done: false,
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${userRegistredResponse.body.jwtToken}`);

		expect(updatedTodoResponse.statusCode).toBe(HttpStatusCode.OK);
		expect(updatedTodoResponse.body.success).toBeTruthy();

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
