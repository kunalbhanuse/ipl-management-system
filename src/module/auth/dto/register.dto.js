import { z } from "zod";

const validateRegister = z.object({
  name: z.string().trim().min(2, "Name to short").max(50, "Name to long"),
  email: z.string().email("Invalid email Format"),
  password: z
    .string()
    .min(6, "Min 6 char password required ")
    .max(30, "password to long"),
  role: z.enum(["PLAYER", "OWNER", "BROADCASTER", "SPONSOR"]),
});

export { validateRegister };
