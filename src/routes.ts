import { Router } from "express";

import ToDoController from "./domain/todo/ToDoController";
import UserController from "./domain/user/UserController";
import { userIsAuthenticated } from "./middlewares/userIsAuthenticated";

export default Router()
	.post("/user/register", UserController.register)
	.post("/user/login", UserController.login)
	.post("/user/logout", userIsAuthenticated, UserController.logout)
	.put("/user/update", userIsAuthenticated, UserController.update)
	.delete("/user/delete/:user_id", userIsAuthenticated, UserController.deleteById)

	.get("/todo/all", userIsAuthenticated, ToDoController.getAllToDos)
	.get("/todo/:todo_id", userIsAuthenticated, ToDoController.getById)
	.post("/todo/create", userIsAuthenticated, ToDoController.create)
	.put("/todo/update", userIsAuthenticated, ToDoController.updateById)
	.delete("/todo/delete/:todo_id", userIsAuthenticated, ToDoController.deleteById);
