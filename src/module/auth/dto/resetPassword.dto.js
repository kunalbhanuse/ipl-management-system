import { z } from "zod";
const validateResetPassword = z.object({
  password: z
    .string()
    .min(6, "Min 6 char password required ")
    .max(30, "password to long"),
  token: z.string(),
});

export { validateResetPassword };
