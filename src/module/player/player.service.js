import Player from "./player.model.js";
import Owner from "../owner/owner.model.js";
import Team from "../team/team.model.js";
import ApiError from "../../common/utils/ApiError.js";
import mongoose from "mongoose";

const registerdPlayerService = async ({ name, role, userId }) => {
  const owner = await Owner.findOne({ userId });
  console.log("owner:-", owner);
  if (!owner) {
    throw ApiError.notFound("Unable to find owner with this userID");
  }
  const team = await Team.findOne({ ownerId: owner._id });
  if (!team) {
    throw ApiError.notFound("Unable to find team with this ownerId");
  }

  const player = await Player.create({
    name,
    role,
    teamId: team._id,
  });
  if (!player) {
    throw ApiError.badRequest("Unable to create the player");
  }
  return player;
};

const getAllPlayersService = async () => {
  const allPlayers = await Player.find().populate("teamId");
  if (!allPlayers) {
    throw ApiError.notFound("Players not found !");
  }
  return allPlayers;
};

const myTeamPlayersServises = async ({ userId }) => {
  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("owner not found");
  }
  const team = await Team.findOne({ ownerId: owner._id });
  if (!team) {
    throw ApiError.notFound("team not found");
  }
  const myteam = await Player.find({ teamId: team._id }).populate("teamId");
  return myteam;
};

const getAllPlayersByIdService = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.forbidden("Provide valid id ");
  }
  const player = await Player.findById(id);
  if (!player) {
    throw ApiError.notFound("Player by Id not Found");
  }
  return player;
};

const updatePlayerByIDService = async ({ id, name, role, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.forbidden("Provide valid id ");
  }

  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("Unable to find the owner !");
  }

  const player = await Player.findById(id).populate("teamId");
  if (!player) {
    throw ApiError.notFound("player check failed ");
  }

  if (player.teamId.ownerId.toString() !== owner._id.toString()) {
    throw ApiError.forbidden("U do not have acces to update this ");
  }

  const updatedPlayer = await Player.findByIdAndUpdate(id, { name, role });
  if (!updatedPlayer) {
    throw ApiError.forbidden("Unable to update player !");
  }

  return updatedPlayer;
};

const deletePlayerByIdService = async ({ id, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.forbidden("Provide valid id ");
  }

  const owner = await Owner.findOne({ userId });
  if (!owner) {
    throw ApiError.notFound("Unable to find the owner !");
  }

  const player = await Player.findById(id).populate("teamId");
  if (!player) {
    throw ApiError.notFound("player check failed ");
  }

  if (player.teamId.ownerId.toString() !== owner._id.toString()) {
    throw ApiError.forbidden("U do not have acces to delete this ");
  }
  const deletedPlayer = await Player.findByIdAndDelete(id);
  return deletedPlayer;
};

export {
  registerdPlayerService,
  getAllPlayersService,
  myTeamPlayersServises,
  getAllPlayersByIdService,
  updatePlayerByIDService,
  deletePlayerByIdService,
};
