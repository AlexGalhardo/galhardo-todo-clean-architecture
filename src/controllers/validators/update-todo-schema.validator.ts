import { z } from "zod";

const updateTodoSchema = z.object({
    title: z.string().max(128, "Title must be at most 128 characters long"),
    description: z.string().max(256, "Description must be at most 256 characters long"),
    done: z.boolean(),
});

export default updateTodoSchema;
