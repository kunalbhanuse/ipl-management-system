import { z } from "zod";

const validateRegisterSponser = z.object({
  name: z.string().trim().min(2).max(100),
});

export { validateRegisterSponser };
