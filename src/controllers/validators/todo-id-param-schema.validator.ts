import { z } from "zod";

const todoIdParamSchema = z.object({ id: z.string().uuid() });

export default todoIdParamSchema;
