import { Router } from "express";

import ToDosController from "./domain/todo/ToDosController";
import UserController from "./domain/user/UserController";
import { userIsAuthenticated } from "./middlewares/userIsAuthenticated";

export default Router()
	.post("/user/register", UserController.register)
	.post("/user/login", UserController.login)
	.post("/user/logout", userIsAuthenticated, UserController.logout)
	.put("/user/update", userIsAuthenticated, UserController.update)
	.delete("/user/delete/:user_id", userIsAuthenticated, UserController.deleteById)

	.get("/todo/all", userIsAuthenticated, ToDosController.getAllTransactions)
	.get("/todo/:todo_id", userIsAuthenticated, ToDosController.getTransactionsByCategory)
	.post("/todo/create", userIsAuthenticated, ToDosController.createTransaction)
	.put("/todo/update/:todo_id", userIsAuthenticated, ToDosController.updateToDoById)
	.delete("/todo/delete/:todo_id", userIsAuthenticated, ToDosController.deleteToDoById);
