import { z } from "zod";

const validateUpdate = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  role: z
    .enum(["batsman", "bowler", "all-rounder", "wicket-keeper"])
    .optional(),
});

export { validateUpdate };
