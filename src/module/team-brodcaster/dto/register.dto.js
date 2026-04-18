import { z } from "zod";

const validateRegister = z.object({
  teamId: z.string(),
  broadcasterId: z.string(),
});

export { validateRegister };
