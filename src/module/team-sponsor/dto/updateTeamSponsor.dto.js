import { z } from "zod";

const validateupdateTeamSponsor = z.object({
  sponsorId: z.string().min(1, "sponsorId is required"),
});

export { validateupdateTeamSponsor };
