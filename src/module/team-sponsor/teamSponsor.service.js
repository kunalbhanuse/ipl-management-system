import mongoose from "mongoose";
import ApiError from "../../common/utils/ApiError.js";
import Owner from "../owner/owner.model.js";
import Team from "../team/team.model.js";
import TeamSponsor from "./teamSponsor.model.js";
import Sponsor from "../sponsor/sponsor.model.js";

const registerTeamSponsorService = async ({ teamId, sponsorId, userId }) => {
  //teamId and sponsorId are going to be checked from the zod

  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.forbidden("Only owners can assign sponsors ");
  }
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.forbidden("You can only assign sponsor to your own team");
  }

  if (owner._id.toString() !== team.ownerId.toString()) {
    throw ApiError.forbidden("U are not allowed to assign the sponsor!");
  }

  const sponsor = await Sponsor.findById(sponsorId);
  if (!sponsor) {
    throw ApiError.notFound("No sponer with this id!");
  }
  const registerTeamSponsor = await TeamSponsor.create({
    teamId,
    sponsorId,
  });

  return registerTeamSponsor;
};

const getAllteamSponsorService = async () => {
  const getAllteamSponsor = await TeamSponsor.find();
  return getAllteamSponsor;
};

const getAllteamSponsorByIdService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Provide valid id");
  }
  const teamSponsor = await TeamSponsor.findById(id)
    .populate("teamId")
    .populate("sponsorId");
  if (!teamSponsor) {
    throw ApiError.notFound("Unable to found TeamSponsor");
  }
  return teamSponsor;
};

const updateTeamSponsorService = async ({ id, userId, sponsorId }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Provide the valid id ");
  }

  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.forbidden("U are not allowed to perform this action ");
  }
  const teamSponser = await TeamSponsor.findById(id);
  if (!teamSponser) {
    throw ApiError.notFound("TeamSponsor not found");
  }
  const team = await Team.findById(teamSponser.teamId);
  if (!team) {
    throw ApiError.notFound("team not found");
  }

  if (team.ownerId.toString() !== owner._id.toString()) {
    throw ApiError.forbidden("U don not have acces to do this ");
  }

  const teamSponserUpdate = await TeamSponsor.findByIdAndUpdate(
    id,
    { sponsorId },
    { new: true },
  );
  if (!teamSponserUpdate) {
    throw ApiError.badRequest("Unable to Update ");
  }
  return teamSponserUpdate;
};

const deleteTeamSposorService = async ({ id, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Provide the valid id ");
  }

  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.forbidden("U are not allowed to perform this action ");
  }

  const teamSponser = await TeamSponsor.findById(id);
  if (!teamSponser) {
    throw ApiError.notFound("TeamSponsor not found");
  }

  const team = await Team.findById(teamSponser.teamId);
  if (!team) {
    throw ApiError.notFound("team not found ");
  }

  if (owner._id.toString() !== team.ownerId.toString()) {
    throw ApiError.forbidden("U dont have acces to delete this ");
  }

  const deleted = await TeamSponsor.findByIdAndDelete(id);
  if (!deleted) {
    throw ApiError.notFound("Unable to delete teamSponsor ");
  }
  return deleted;
};
export {
  registerTeamSponsorService,
  getAllteamSponsorService,
  getAllteamSponsorByIdService,
  updateTeamSponsorService,
  deleteTeamSposorService,
};
