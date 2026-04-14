import mongoose from "mongoose";
import Team from "./team.model.js";
import Owner from "../owner/owner.model.js";
import ApiError from "../../common/utils/ApiError.js";

const registerService = async ({ name, userId }) => {
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.badRequest("Owner does not exits");
  }

  const team = await Team.create({
    name,
    ownerId: owner._id,
  });

  if (!team) {
    throw ApiError.forbidden("team creation failed !");
  }
  return team;
};

const getAllTeamsService = async () => {
  const teams = await Team.find();
  if (!teams.length === 0) {
    throw ApiError.notFound("No team found !");
  }
  return teams;
};

const getTeamByIdService = async ({ id }) => {
  if (!id) {
    throw ApiError.badRequest("Id should be there");
  }
  const myteam = await Team.findById(id).populate("ownerId");
  if (!myteam) {
    throw ApiError.notFound("No team with this id");
  }
  return myteam;
};
const updateTeamService = async ({ id, userId, name }) => {
  //   check the owner is same or not
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("Owner profile not found");
  }
  const updatedTeam = await Team.findByIdAndUpdate(
    { _id: id, ownerId: owner._id },
    { name },
    { new: true },
  );
  if (!updatedTeam) {
    throw ApiError.forbidden("Team not found or unauthorized access");
  }
  return updatedTeam;
};
const deleteTeamService = async ({ id, userId }) => {
  // Owner check
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("No user Found");
  }

  const deletedTeam = await Team.findOneAndDelete({
    _id: id,
    ownerId: owner._id,
  });
  if (!deletedTeam) {
    throw ApiError.forbidden(
      "Team not found or you do not have permission to delete it",
    );
  }
  return deletedTeam;
};

export {
  registerService,
  getAllTeamsService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
};
