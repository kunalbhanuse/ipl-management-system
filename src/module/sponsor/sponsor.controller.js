import * as sponserService from "./sponsor.service.js";
import { validateRegisterSponser } from "./dto/registerSponsor.dto.js";
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

export { register };
