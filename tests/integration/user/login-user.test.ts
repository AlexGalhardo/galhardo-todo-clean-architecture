import { faker } from "@faker-js/faker";
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import app from "../../../src/app";
import { HttpStatusCode } from "../../../src/utils/HttpStatusCode";

describe("testing login user", () => {
	it("it should return http status code 200 with correct json response along with user jwtToken", async () => {
		const userObject = {
			name: faker.internet.userName(),
			email: "emailTest@gmail.com",
			password: "test123",
		};

		const userRegistred = await request(app)
			.post("/api/user/register")
			.send(userObject)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		const response = await request(app)
			.post("/api/user/login")
			.send({
				email: "emailTest@gmail.com",
				password: "test123",
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json");

		expect(response.statusCode).toBe(HttpStatusCode.OK);
		expect(response.body.success).toBeTruthy()
		expect(response.body.user).toBeDefined()
		expect(response.body.user.email).toBe("emailTest@gmail.com")

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
