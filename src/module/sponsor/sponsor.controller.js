import * as sponserService from "./sponsor.service.js";
import { validateRegisterSponser } from "./dto/registerSponsor.dto.js";
import { validateUpdate } from "./dto/update.sposor.dto.js";
import ApiResponse from "../../common/utils/ApiResponse.js";

const register = async (req, res) => {
  try {
    const validateReqBody = await validateRegisterSponser.parseAsync(req.body);
    const registerdSponsor =
      await sponserService.registerSponsorServices(validateReqBody);
    return ApiResponse.ok(
      res,
      "Register sponsor succesfull !",
      registerdSponsor,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllSponsors = async (req, res) => {
  try {
    const allSponsor = await sponserService.getAllSponsersService();
    return ApiResponse.ok(res, "All Sponsors Featched succefully ", allSponsor);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};
const getSponsor = async (req, res) => {
  try {
    const sponser = await sponserService.getSponsorsService(req.params);

    return ApiResponse.ok(res, " Sponsors Featched succefully ", sponser);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const updateSponsor = async (req, res) => {
  try {
    const validateReqBody = await validateUpdate.parseAsync(req.body);
    const updatedSponser = await sponserService.updateSponsorService({
      id: req.params.id,
      name: validateReqBody.name,
    });
    console.log("Controller =", updatedSponser);
    return ApiResponse.ok(res, "Sponser updated succefully !", updatedSponser);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const deleteSponsor = async (req, res) => {
  try {
    const deletedSponsor = await sponserService.deleteSponsorService(
      req.params,
    );
    return ApiResponse.ok(res, "Sponsor deleted Succefully !", deletedSponsor);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export { register, getAllSponsors, getSponsor, updateSponsor, deleteSponsor };
