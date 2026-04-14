import * as ownerService from "./owner.service.js";
import { validateRegister } from "./dto/registerOwner.dto.js";
import { validateUpdateOwner } from "./dto/updateOwner.dto.js";
import ApiResponse from "../../common/utils/ApiResponse.js";

const register = async (req, res) => {
  try {
    const validateReqBody = await validateRegister.parseAsync(req.body);
    const owner = await ownerService.registerService({
      ...validateReqBody,
      userId: req.user.id,
      name: req.user.name,
    });
    return ApiResponse.created(res, "Owner register Succefully !", owner);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "internal server Error !",
    });
  }
};
const getAllOwners = async (req, res) => {
  try {
    const owners = await ownerService.getAllOwnersService();
    return ApiResponse.ok(res, "All Owners Featched Sussfully !", owners);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
const getOwnerById = async (req, res) => {
  try {
    const owner = await ownerService.getOwnerByIdService(req.params);
    return ApiResponse.ok(res, "Owner feached succefull !", owner);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const updateOwner = async (req, res) => {
  try {
    const validateReqBody = await validateUpdateOwner.parseAsync(req.body);
    const updatedOwner = await ownerService.UpdateOwnerService({
      id: req.params.id,
      userId: req.user.id,
      ...validateReqBody,
    });

    return ApiResponse.ok(res, "Owner Update Successfully !", updatedOwner);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
const deleteOwner = async (req, res) => {
  try {
    const deletedOwner = await ownerService.deleteOwnerService({
      id: req.params.id,
      userId: req.user.id,
    });
    return ApiResponse.ok(res, "Owner deleted Succefully !", deletedOwner);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
export { register, getAllOwners, getOwnerById, updateOwner, deleteOwner };
