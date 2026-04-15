import * as playerService from "./player.service.js";
import { validateRegister } from "./dto/register.player.dto.js";
import { validateUpdate } from "./dto/update.player.dto.js";
import ApiResponse from "../../common/utils/ApiResponse.js";

const register = async (req, res) => {
  try {
    const validateReqBody = await validateRegister.parseAsync(req.body);
    const registerdPlayer = await playerService.registerdPlayerService({
      userId: req.user.id,
      ...validateReqBody,
    });

    return ApiResponse.ok(res, "Player Created Succefully !", registerdPlayer);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await playerService.getAllPlayersService();
    return ApiResponse.ok(res, "All Player featched succesfully !", allPlayers);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const myTeamPlayers = async (req, res) => {
  try {
    const myTeam = await playerService.myTeamPlayersServises({
      userId: req.user.id,
    });
    return ApiResponse.ok(res, "My Team Featched succefully !", myTeam);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllPlayersById = async (req, res) => {
  try {
    const player = await playerService.getAllPlayersByIdService(req.params);
    return ApiResponse.ok(res, "Player featched Succesfully ", player);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePlayerByID = async (req, res) => {
  try {
    const validateReqBody = await validateUpdate.parseAsync(req.body);
    const updatedPlayer = await playerService.updatePlayerByIDService({
      ...validateReqBody,
      id: req.params.id,
      userId: req.user.id,
    });
    return ApiResponse.ok(res, "Player Updated Succesfully ! ", updatedPlayer);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const deletePlayerById = async (req, res) => {
  try {
    const deletedPlayer = await playerService.deletePlayerByIdService({
      id: req.params.id,
      userId: req.user.id,
    });
    return ApiResponse.ok(res, "Player Deleted Succesfully !", deletedPlayer);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  register,
  getAllPlayers,
  myTeamPlayers,
  getAllPlayersById,
  updatePlayerByID,
  deletePlayerById,
};
