import { Router } from "express";

import UserController from "./domain/user/UserController";
import ToDosController from "src/domain/todo/ToDosController";
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
