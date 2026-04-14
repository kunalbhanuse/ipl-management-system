import { z } from "zod";

const validateUpdateTeam = z.object({
  name: z.string().trim().min(2).max(100).optional(),
});

export { validateUpdateTeam };
