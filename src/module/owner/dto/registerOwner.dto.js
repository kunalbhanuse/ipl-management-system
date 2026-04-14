import { z } from "zod";

const validateRegister = z.object({
  company: z.string().trim().min(2).max(100),
});

export { validateRegister };
