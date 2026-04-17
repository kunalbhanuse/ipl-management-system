import * as brodcasterService from "./brodcaster.service.js";

import ApiResponse from "../../common/utils/ApiResponse.js";
import { validateRegisterBrodcaster } from "./dto/register.brodcaster.dto.js";
import { validateUpdateBrodcaster } from "./dto/update.brodcaster.dto.js";

const register = async (req, res) => {
  try {
    const validateReqBody = await validateRegisterBrodcaster.parseAsync(
      req.body,
    );

    const registerdBrodcaster =
      await brodcasterService.registerService(validateReqBody);

    return ApiResponse.ok(
      res,
      "Bordcaster created succesfully !",
      registerdBrodcaster,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllBrodcaster = async (req, res) => {
  try {
    const allBrodcasters = await brodcasterService.getAllBrodcasterService();
    return ApiResponse.ok(
      res,
      "ALl Brodcasters Featched succefully !",
      allBrodcasters,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const getBrodcasterById = async (req, res) => {
  try {
    const brodcaster = await brodcasterService.getBrodcasterByIdService(
      req.params,
    );
    return ApiResponse.ok(
      res,
      "Featched the Brodcaster succefully !",
      brodcaster,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateBrodcaster = async (req, res) => {
  try {
    const validateReqBody = await validateUpdateBrodcaster.parseAsync(req.body);
    const updatedbrodcaster = await brodcasterService.updateBrodcasterService({
      id: req.params.id,
      name: validateReqBody.name,
    });
    return ApiResponse.ok(
      res,
      "Broadcaster updated successfully!",
      updatedbrodcaster,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteBrodcaster = async (req, res) => {
  try {
    const deletedBrodcaster = await brodcasterService.deleteBrodcasterService(
      req.params,
    );
    return ApiResponse.ok(
      res,
      "Brodcaster deleted succefully !",
      deletedBrodcaster,
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};
export {
  register,
  getAllBrodcaster,
  getBrodcasterById,
  updateBrodcaster,
  deleteBrodcaster,
};
