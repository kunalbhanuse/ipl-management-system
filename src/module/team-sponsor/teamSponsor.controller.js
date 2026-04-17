import * as teamSponsorService from "./teamSponsor.service.js";
import { validateRegisterTeamSponsor } from "./dto/validateTeamSposor.dto.js";
import { validateupdateTeamSponsor } from "./dto/updateTeamSponsor.dto.js";
import ApiResponse from "../../common/utils/ApiResponse.js";

const registerTeamSponsor = async (req, res) => {
  try {
    const validateReqBody = await validateRegisterTeamSponsor.parseAsync(
      req.body,
    );
    const registeredTeamSponsor =
      await teamSponsorService.registerTeamSponsorService({
        ...validateReqBody,
        userId: req.user.id,
      });
    return ApiResponse.ok(
      res,
      "Team-sposor register succefully !",
      registeredTeamSponsor,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllteamSponsor = async (req, res) => {
  try {
    const allTeamSponsor = await teamSponsorService.getAllteamSponsorService();
    return ApiResponse.ok(
      res,
      "All Sponsors featched succefully !",
      allTeamSponsor,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllteamSponsorById = async (req, res) => {
  try {
    const teamSponsor = await teamSponsorService.getAllteamSponsorByIdService(
      req.params,
    );
    return ApiResponse.ok(res, "teamSponser featched succefully ", teamSponsor);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTeamSponsor = async (req, res) => {
  try {
    const validateReqBody = await validateupdateTeamSponsor.parseAsync(
      req.body,
    );
    const updated = await teamSponsorService.updateTeamSponsorService({
      id: req.params.id,
      userId: req.user.id,
      sponsorId: validateReqBody.sponsorId,
    });
    return ApiResponse.ok(res, "teamSponsor Updated Succefully ", updated);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTeamSposor = async (req, res) => {
  try {
    const deletetedTeamSponsor =
      await teamSponsorService.deleteTeamSposorService({
        id: req.params.id,
        userId: req.user.id,
      });
    return ApiResponse.ok(
      res,
      "succefully deleted teamSponsor",
      deletetedTeamSponsor,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  registerTeamSponsor,
  getAllteamSponsor,
  getAllteamSponsorById,
  updateTeamSponsor,
  deleteTeamSposor,
};
