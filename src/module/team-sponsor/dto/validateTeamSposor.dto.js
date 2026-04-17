import { z } from "zod";

const validateRegisterTeamSponsor = z.object({
  teamId: z.string().min(1, "teamId is required"),
  sponsorId: z.string().min(1, "sponsorId is required"),
});

export { validateRegisterTeamSponsor };
