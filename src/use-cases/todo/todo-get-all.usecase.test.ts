import { afterAll, describe, expect, it } from "bun:test";

describe("todo-get-all.usecase.test.ts", () => {
	it("should get all todos", async () => {
		const requestOne = await fetch("http://localhost:3000/todo", {
			method: "POST",
			body: JSON.stringify({
				title: "todo test 1",
				description: "description 1",
				done: true,
			}),
			headers: { "Content-Type": "application/json" },
		});

		const requestTwo = await fetch("http://localhost:3000/todo", {
			method: "POST",
			body: JSON.stringify({
				title: "todo test 2",
				description: "description 2",
				done: true,
			}),
			headers: { "Content-Type": "application/json" },
		});

		const requestThree = await fetch("http://localhost:3000/todo", {
			method: "POST",
			body: JSON.stringify({
				title: "todo test 3",
				description: "description 3",
				done: true,
			}),
			headers: { "Content-Type": "application/json" },
		});

		const responseOne: any = await requestOne.json();
		const responseTwo: any = await requestTwo.json();
		const responseThree: any = await requestThree.json();

		const request = await fetch("http://localhost:3000/todo/all");

		const response: any = await request.json();

		expect(response.success).toBe(true);
		expect(response.data.length).toBeGreaterThan(2);

		const titles = response.data.map((todo: any) => todo.title);
		const descriptions = response.data.map((todo: any) => todo.description);

		expect(titles).toContain("todo test 1");
		expect(titles).toContain("todo test 2");
		expect(titles).toContain("todo test 3");

		expect(descriptions).toContain("description 1");
		expect(descriptions).toContain("description 2");
		expect(descriptions).toContain("description 3");

		afterAll(async () => {
			await fetch(`http://localhost:3000/todo/${responseOne.data.id}`, {
				method: "DELETE",
			});

			await fetch(`http://localhost:3000/todo/${responseTwo.data.id}`, {
				method: "DELETE",
			});

			await fetch(`http://localhost:3000/todo/${responseThree.data.id}`, {
				method: "DELETE",
			});
		});
	});
});
