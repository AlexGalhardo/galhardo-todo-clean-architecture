import Fastify from "fastify";
import ToDoController from "./controllers/todo.controller";

const fastify = Fastify({
    logger: true,
});

fastify
    .get("/", (_, reply) =>
        reply.send({
            success: true,
            message: "🚀 TODO API CLEAN ARCHITECTURE IS ON, LETS GOOO!",
        }),
    )
    .get("/todo/all", (request, reply) => ToDoController.getAll(request, reply))
    .get("/todo/:todo_id", (request, reply) => ToDoController.getById(request, reply))
    .post("/todo", (request, reply) => ToDoController.create(request, reply))
    .put("/todo", (request, reply) => ToDoController.update(request, reply))
    .delete("/todo/:todo_id", (request, reply) => ToDoController.delete(request, reply))
    .listen({ port: Number(Bun.env.PORT) ?? 3000 }, (err, _) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        console.log(
            `\n\n 🚀 TODO API CLEAN ARCHITECTURE HTTP REST API server is running at http://localhost:${Number(Bun.env.PORT) ?? 6666}`,
        );
    });
