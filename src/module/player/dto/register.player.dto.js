import { z } from "zod";

const validateRegister = z.object({
  name: z.string().trim().min(2).max(100),
  role: z.enum(["batsman", "bowler", "all-rounder", "wicket-keeper"]),
});

export { validateRegister };
