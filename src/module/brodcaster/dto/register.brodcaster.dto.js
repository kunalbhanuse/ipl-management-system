import { z } from "zod";

const validateRegisterBrodcaster = z.object({
  name: z.string().trim().min(2).max(100),
});

export { validateRegisterBrodcaster };
