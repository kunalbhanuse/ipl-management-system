import { z } from "zod";

const validateUpdateOwner = z.object({
  company: z.string().trim().min(2).max(100).optional(),
});

export { validateUpdateOwner };
