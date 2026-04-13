import { email, z } from "zod";

const validateLogin = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Min 6 char password required ")
    .max(30, "password to long"),
});

export { validateLogin };
