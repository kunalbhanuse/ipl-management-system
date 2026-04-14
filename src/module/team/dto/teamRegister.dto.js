import { z } from "zod";

const validateRegister = z.object({
  name: z
    .string()
    .min(2, "Name should have at least 2 characters")
    .max(100, "Name too long"),
});

export { validateRegister };
