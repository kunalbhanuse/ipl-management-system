import { z } from "zod";

const validateUpdateBrodcaster = z.object({
  name: z.string().trim().min(2).max(100),
});

export { validateUpdateBrodcaster };
