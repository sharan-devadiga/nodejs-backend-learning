import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
let router = Router();

export default router.delete("/", async (req, res) => {
  try {
    let { user_id } = req.query;
    let userModel = await initUserModel();

    let nonExistingUserID = await userModel.findOne({
      where: { user_id: user_id },
    });
    if (!user_id) {
      return send(res, setErrMsg(RESPONSE.REQUIRED));
    }
     if (!nonExistingUserID) {
        return send(res,setErrMsg(RESPONSE.NOT_FOUND,"User"))
      }
    await userModel.destroy({ where: { user_id: user_id } });
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Delete User Error:", error);
    return send(res, RESPONSE.UNKNOWN);
  }
});
