import ApiResponse from "../../common/utils/ApiResponse.js";
import { validateRegister } from "./dto/register.dto.js";
import { validateUpdate } from "./dto/update.dto.js";
import * as teamBrodcasterService from "./teamBrodcaster.service.js";

const register = async (req, res) => {
  try {
    const validateReqBody = await validateRegister.parseAsync(req.body);

    const registerTeamBrodcaster = await teamBrodcasterService.registerService({
      ...validateReqBody,
      userId: req.user.id,
    });
    return ApiResponse.ok(
      res,
      "TeamBrodcaster registerd succefully ",
      registerTeamBrodcaster,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getallteamBrodcaster = async (req, res) => {
  try {
    const getAll = await teamBrodcasterService.getallteamBrodcasterService();
    return ApiResponse.ok(res, "team-Brodcasters feached succfully !", getAll);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const teamBrodcasterById = async (req, res) => {
  try {
    const getbyId = await teamBrodcasterService.teamBrodcasterByIdService(
      req.params,
    );
    return ApiResponse.ok(
      res,
      "team - brodcater featched succefully by id",
      getbyId,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTeamBrodcaster = async (req, res) => {
  try {
    const validateReqBody = await validateUpdate.parseAsync(req.body);
    const updatedTeamBrodcaster =
      await teamBrodcasterService.updateTeamBrodcasterService({
        id: req.params.id,
        ...validateReqBody,
        userId: req.user.id,
      });

    return ApiResponse.ok(
      res,
      "teamBrodcaster Updated Succesfully !",
      updatedTeamBrodcaster,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTeamBrodcaster = async (req, res) => {
  try {
    const deleted = await teamBrodcasterService.deleteTeamBrodcasterService({
      id: req.params.id,
      userId: req.user.id,
    });
    return ApiResponse.ok(res, "TeamBrodcaster Deleted Succefully ", deleted);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};
export {
  register,
  getallteamBrodcaster,
  teamBrodcasterById,
  updateTeamBrodcaster,
  deleteTeamBrodcaster,
};
