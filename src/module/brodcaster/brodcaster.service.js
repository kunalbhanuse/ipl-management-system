import mongoose from "mongoose";
import ApiError from "../../common/utils/ApiError.js";
import Broadcaster from "./brodcaster.model.js";

const registerService = async ({ name }) => {
  const broadcaster = await Broadcaster.create({
    name,
  });
  if (!broadcaster) {
    throw ApiError.badRequest("Unable to create Brodcaster");
  }
  return broadcaster;
};

const getAllBrodcasterService = async () => {
  const allBrodcasters = await Broadcaster.find();
  if (!allBrodcasters) {
    throw ApiError.notFound("Unable to get the brodcasters !");
  }
  return allBrodcasters;
};

const getBrodcasterByIdService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.notFound("Provide Valid id ");
  }
  const broadcaster = await Broadcaster.findById(id);
  if (!broadcaster) {
    throw ApiError.notFound("Unable to get the brodcasters");
  }
  return broadcaster;
};

const updateBrodcasterService = async ({ id, name }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.notFound("Provide Valid id ");
  }
  const updatedBrodcaster = await Broadcaster.findByIdAndUpdate(
    id,
    { name },
    { new: true },
  );
  if (!updatedBrodcaster) {
    throw ApiError.notFound("Unable to find and update Brodcaster !");
  }
  return updatedBrodcaster;
};

const deleteBrodcasterService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.notFound("Provide Valid id ");
  }

  const deletedBrodcaster = await Broadcaster.findByIdAndDelete(id);
  if (!deletedBrodcaster) {
    throw ApiError.notFound("Unable to delete the brodcaster !");
  }
  return deletedBrodcaster;
};

export {
  registerService,
  getAllBrodcasterService,
  getBrodcasterByIdService,
  updateBrodcasterService,
  deleteBrodcasterService,
};
