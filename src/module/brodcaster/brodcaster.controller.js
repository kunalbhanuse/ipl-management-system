import * as brodcasterService from "./brodcaster.service.js";

import ApiResponse from "../../common/utils/ApiResponse.js";
import { validateRegisterBrodcaster } from "./dto/register.brodcaster.dto.js";

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

export { register };
