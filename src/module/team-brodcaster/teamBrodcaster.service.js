import ApiError from "../../common/utils/ApiError.js";
import Owner from "../owner/owner.model.js";
import Team from "../team/team.model.js";
import TeamBroadcaster from "./teamBrodcaster.model.js";
import Broadcaster from "../brodcaster/brodcaster.model.js";
import mongoose from "mongoose";
import { id } from "zod/locales";
const registerService = async ({ teamId, broadcasterId, userId }) => {
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("owner not found");
  }
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.notFound("team not found");
  }

  if (owner._id.toString() !== team.ownerId.toString()) {
    throw ApiError.forbidden("U are not allowed to perform this action ");
  }
  const brodcaster = await Broadcaster.findById(broadcasterId);
  if (!brodcaster) {
    throw ApiError.notFound("Broadcaster not found ");
  }
  const teamBrodcaster = await TeamBroadcaster.create({
    teamId,
    broadcasterId,
  });
  return teamBrodcaster;
};

const getallteamBrodcasterService = async () => {
  const getAll = await TeamBroadcaster.find()
    .populate("teamId")
    .populate("broadcasterId");
  return getAll;
};

const teamBrodcasterByIdService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Provide valid id");
  }
  const teamBrodcaster = await TeamBroadcaster.findById(id)
    .populate("teamId")
    .populate("broadcasterId");
  if (!teamBrodcaster) {
    throw ApiError.notFound("teamBrodcaster not found ");
  }
  return teamBrodcaster;
};
const updateTeamBrodcasterService = async ({
  id,
  teamId,
  broadcasterId,
  userId,
}) => {
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("Owner not found");
  }
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.notFound("team not found");
  }
  const brodcaster = await Broadcaster.findById(broadcasterId);
  if (!brodcaster) {
    throw ApiError.notFound("Brodcaster not found");
  }

  if (owner._id.toString() !== team.ownerId.toString()) {
    throw ApiError.forbidden("U dont have acces to perform this action ");
  }

  const updateTeamBrodcaster = await TeamBroadcaster.findByIdAndUpdate(
    id,
    { teamId, broadcasterId },
    { new: true },
  );
  if (!updateTeamBrodcaster) {
    throw ApiError.notFound("TeamBroadcaster not found or update failed");
  }
  return updateTeamBrodcaster;
};

const deleteTeamBrodcasterService = async ({ id, userId }) => {
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("Owner not found");
  }

  const teamBrodcasteruser =
    await TeamBroadcaster.findById(id).populate("teamId");
  if (!teamBrodcasteruser) {
    throw ApiError.notFound("TeamBrodcasteruser not found");
  }

  if (owner._id.toString() !== teamBrodcasteruser.teamId.ownerId.toString()) {
    throw ApiError.forbidden("U dont have acces to perform this action ");
  }
  const deleted = await TeamBroadcaster.findByIdAndDelete(id);
  return deleted;
};

export {
  registerService,
  getallteamBrodcasterService,
  teamBrodcasterByIdService,
  updateTeamBrodcasterService,
  deleteTeamBrodcasterService,
};
