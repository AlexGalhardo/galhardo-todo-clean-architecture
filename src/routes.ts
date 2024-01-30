import { Router } from "express";

import ToDoController from "./controllers/ToDo.controller";
import UserController from "./controllers/User.controller";
import { userIsAuthenticated } from "./middlewares/userIsAuthenticated";

export default Router()
    .post("/user", UserController.create)
    .post("/user/login", UserController.login)
    .post("/user/logout", userIsAuthenticated, UserController.logout)
    .put("/user", userIsAuthenticated, UserController.update)
    .delete("/user/:user_id", userIsAuthenticated, UserController.delete)

    .get("/todo/all", userIsAuthenticated, ToDoController.getAll)
    .get("/todo/:todo_id", userIsAuthenticated, ToDoController.getById)
    .post("/todo", userIsAuthenticated, ToDoController.create)
    .put("/todo", userIsAuthenticated, ToDoController.update)
    .delete("/todo/:todo_id", userIsAuthenticated, ToDoController.delete);
