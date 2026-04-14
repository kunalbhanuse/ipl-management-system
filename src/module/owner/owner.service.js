import mongoose from "mongoose";
import ApiError from "../../common/utils/ApiError.js";
import Owner from "./owner.model.js";
const registerService = async ({ name, company, userId }) => {
  if (!name || !userId) {
    throw ApiError.forbidden("Login First ");
  }
  const owner = await Owner.create({
    name,
    company,
    userId,
  });
  if (!owner) {
    throw ApiError.badRequest("Owner creation failed !");
  }
  return owner;
};

const getAllOwnersService = async () => {
  const owner = await Owner.find();

  return owner;
};

const getOwnerByIdService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid Owner id ");
  }

  const owner = await Owner.findById(id).populate("userId");
  if (!owner) {
    throw ApiError.notFound("user not found with this id");
  }
  return owner;
};

const UpdateOwnerService = async ({ id, userId, company }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid Owner Id");
  }

  const owner = await Owner.findById(id);
  if (!owner) {
    throw ApiError.notFound("Owner not found ");
  }

  if (owner.userId.toString() !== userId) {
    throw ApiError.forbidden("U are not allowed to update other profile !");
  }
  const updateOwner = await Owner.findByIdAndUpdate(
    id,
    { company },
    { new: true },
  );

  return updateOwner;
};

const deleteOwnerService = async ({ id, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid id");
  }
  const checkOwner = await Owner.findById(id);
  if (!checkOwner) {
    throw ApiError.notFound("User does not exists");
  }
  if (checkOwner.userId.toString() !== userId) {
    throw ApiError.forbidden("U are not allowed to delete other users");
  }

  const deleteOwner = await Owner.findByIdAndDelete(id);
  if (!deleteOwner) {
    throw ApiError.notFound("Unable to delete Owner");
  }
  console.log("DELETED OWNER : -", deleteOwner);
  return deleteOwner;
};
export {
  registerService,
  getAllOwnersService,
  getOwnerByIdService,
  UpdateOwnerService,
  deleteOwnerService,
};
