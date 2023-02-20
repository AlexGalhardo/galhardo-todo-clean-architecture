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

    .get("/todo/all", userIsAuthenticated, ToDosController.getAllToDos)
    .get("/todo/:todo_id", userIsAuthenticated, ToDosController.getById)
    .post("/todo/create", userIsAuthenticated, ToDosController.create)
    .put("/todo/update", userIsAuthenticated, ToDosController.updateById)
    .delete("/todo/delete/:todo_id", userIsAuthenticated, ToDosController.deleteToDoById);
