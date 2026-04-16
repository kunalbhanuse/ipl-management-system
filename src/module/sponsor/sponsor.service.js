import mongoose from "mongoose";
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

const getAllSponsersService = async () => {
  const allSponsor = await Sponsor.find();
  if (!allSponsor) {
    throw ApiError.notFound("All sponser not found !");
  }
  return allSponsor;
};

const getSponsorsService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Provided Id Should be valid");
  }

  const sponser = await Sponsor.findById(id);
  if (!sponser) {
    throw ApiError.notFound("sponser not found ");
  }

  return sponser;
};

const updateSponsorService = async ({ id, name }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.notFound("Provide the valid id");
  }

  const updatedSponser = await Sponsor.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );
  if (!updatedSponser) {
    throw (ApiError.badRequest("Unable to update the sposor "), updatedSponser);
  }
  return updatedSponser;
};

const deleteSponsorService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.notFound("Provide the valid id");
  }
  const deletedSponser = await Sponsor.findByIdAndDelete(id);
  if (!deletedSponser) {
    throw ApiError.forbidden("Sponsor deletion failed !");
  }
  return deletedSponser;
};
export {
  registerSponsorServices,
  getAllSponsersService,
  getSponsorsService,
  updateSponsorService,
  deleteSponsorService,
};
