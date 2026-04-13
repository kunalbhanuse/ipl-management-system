import { email, z } from "zod";

const validateForgetPassword = z.object({
  email: z.string().email(),
});

export { validateForgetPassword };
