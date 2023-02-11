import { Router } from "express";

import UserController from "./domain/user/UserController";
import ToDosController from "./domain/todo/ToDosController";
import { userIsAuthenticated } from "./middlewares/userIsAuthenticated";

export default Router()
	.post("/user/register", UserController.register)
	.post("/user/login", UserController.login)
	.post("/user/logout", userIsAuthenticated, UserController.logout)
	.put("/user/update/:user_id", userIsAuthenticated, UserController.update)

	.get("/todo/all", userIsAuthenticated, ToDosController.getAllTransactions)
	.get("/todo/:todo_id", userIsAuthenticated, ToDosController.getTransactionsByCategory)
	.post("/todo/create", userIsAuthenticated, ToDosController.createTransaction)
	.put("/todo/update/:todo_id", userIsAuthenticated, ToDosController.updateToDoById)
	.delete("/todo/delete/:todo_id", userIsAuthenticated, ToDosController.deleteToDoById)

// import { initTRPC } from '@trpc/server';
// import { z } from 'zod';

// const t = initTRPC.create();

// const router = t.router;
// const publicProcedure = t.procedure;

// interface User {
// 	id: string;
// 	name: string;
// }

// const userList: User[] = [
// 	{
// 		id: '1',
// 		name: 'KATT',
// 	},
// ];

// const appRouter = router({
// 	userById: publicProcedure
// 		.input((val: unknown) => {
// 			if (typeof val === 'string') return val;
// 			throw new Error(`Invalid input: ${typeof val}`);
// 		})
// 		.query((req) => {
// 			const input = req.input;
// 			const user = userList.find((it) => it.id === input);

// 			return user;
// 		}),
// 	userCreate: publicProcedure
// 		.input(z.object({ name: z.string() }))
// 		.mutation((req) => {
// 			const id = `${Math.random()}`;

// 			const user: User = {
// 				id,
// 				name: req.input.name,
// 			};

// 			userList.push(user);

// 			return user;
// 		}),
// });

// export type AppRouter = typeof appRouter;
