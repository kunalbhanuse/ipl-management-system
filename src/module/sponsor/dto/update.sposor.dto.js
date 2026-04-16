import { z } from "zod";

const validateUpdate = z.object({
  name: z.string().trim().min(2).max(100),
});

export { validateUpdate };
