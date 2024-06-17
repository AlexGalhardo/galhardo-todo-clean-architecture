import Fastify from "fastify";
import ToDoController from "./controllers/todo.controller";

const app = Fastify({
    // logger: true,
});

app.get("/", (_, reply) =>
    reply.send({
        success: true,
        message: "🚀 TODO API CLEAN ARCHITECTURE IS ON, LETS GOOO!",
    }),
)
    .get("/todo/all", (request, reply) => ToDoController.getAll(request, reply))
    .get("/todo/:id", (request, reply) => ToDoController.getById(request, reply))
    .post("/todo", (request, reply) => ToDoController.create(request, reply))
    .put("/todo/:id", (request, reply) => ToDoController.update(request, reply))
    .delete("/todo/:id", (request, reply) => ToDoController.delete(request, reply))
    // .register((instance, opts, done) => {
    // 	instance.get('/', (request, reply) => {
    // 		reply.send({ hello: 'world' });
    // 	});
    // 	done();
    // })
    .listen({ port: Number(process.env.PORT) ?? 3000, host: "0.0.0.0" }, (err, _) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        console.log(
            `\n\n 🚀 TODO API CLEAN ARCHITECTURE HTTP REST API server is running at http://localhost:${Number(process.env.PORT) ?? 3000}`,
        );
    });

export default app;
