import * as teamService from "./team.service.js";
import { validateRegister } from "./dto/teamRegister.dto.js";
import { validateUpdateTeam } from "./dto/updateTeam.dto.js";
import ApiResponce from "../../common/utils/ApiResponse.js";

const register = async (req, res) => {
  try {
    const validateReqBody = await validateRegister.parseAsync(req.body);
    const registerdTeam = await teamService.registerService({
      name: validateReqBody.name,
      userId: req.user.id,
    });
    return ApiResponce.ok(res, "Team registerd Succefully", registerdTeam);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
const getAllTeams = async (req, res) => {
  try {
    const allTeams = await teamService.getAllTeamsService();
    return ApiResponce.ok(
      res,
      "All teams Data Featched Succesfully !",
      allTeams,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const getTeamById = async (req, res) => {
  try {
    const myteam = await teamService.getTeamByIdService(req.params);
    return ApiResponce.ok(res, "Team data Featched Successfully !", myteam);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    const validateReqBody = await validateUpdateTeam.parseAsync(req.body);
    const updatedTeam = await teamService.updateTeamService({
      id: req.params.id,
      name: validateReqBody.name,
      userId: req.user.id,
    });

    return ApiResponce.ok(res, "Team data Updated successfully !", updatedTeam);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await teamService.deleteTeamService({
      id: req.params.id,
      userId: req.user.id,
    });
    return ApiResponce.ok(res, "Team deleted Succesfully !", deletedTeam);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

export { register, getAllTeams, getTeamById, updateTeam, deleteTeam };
