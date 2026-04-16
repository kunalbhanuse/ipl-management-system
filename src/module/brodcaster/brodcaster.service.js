import ApiError from "../../common/utils/ApiError.js";
import Broadcaster from "./brodcaster.model.js";

const registerService = async ({ name }) => {
  const broadcaster = await Broadcaster.create({
    name,
  });
  if (!broadcaster) {
    throw ApiError.badRequest("Unable to create Brodcaster");
  }
  return broadcaster;
};
