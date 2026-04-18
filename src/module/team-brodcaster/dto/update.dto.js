import { z } from "zod";

const validateUpdate = z.object({
  teamId: z.string(),
  broadcasterId: z.string(),
});

export { validateUpdate };
