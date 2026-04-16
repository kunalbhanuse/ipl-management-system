import ApiError from "../../common/utils/ApiError.js";
import Sponsor from "./sponsor.model.js";

const registerSponsorServices = async ({ name }) => {
  const registerSponsor = await Sponsor.create({
    name,
  });
  if (!registerSponsor) {
    throw ApiError.notFound("Creating user failed !");
  }
  return registerSponsor;
};

export { registerSponsorServices };
