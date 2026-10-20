import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import { STATUS } from "../../config/constants.js";

let router = Router();

export default router.get("/", async (req, res) => {
  try {
    let where = {
      isActive: STATUS.ACTIVE,
    };
    let { user_id } = req.query;
    if (user_id) {
      where = { user_id: user_id, isActive: STATUS.ACTIVE };
    }
    let usermodel = await initUserModel();

    let data = await usermodel.findAll({
      attributes: ["user_id", "name", "email", "age", "role"],
      where: where,
    });
    return send(res, RESPONSE.SUCCESS, data);
  } catch (error) {
    console.log("List Users Error", error);
    return send(res, RESPONSE.UNKNOWN);
  }
});
