import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import { STATUS } from "../../config/constants.js";
import { Op } from "sequelize";

let router = Router();

export default router.patch("/", async (req, res) => {
  try {
    let { user_id } = req.query;
    let { name, email, role, age } = req.body;

    let usermodel = await initUserModel();

    if (!user_id) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "user_id"));
    }
    let where = {
      isActive: STATUS.ACTIVE,
      user_id: user_id,
    };

    let existingUser = await usermodel.findOne({ where });

    if (!existingUser) {
    return send(res, RESPONSE.INVALID);
    }
    if (email) {
      let isEmailExists = await usermodel.findOne({ where: { email: email ,user_id:{[Op.ne]:user_id}} });
      if (isEmailExists) {
        return send(res, setErrMsg(RESPONSE.EXISTS, "Email"));
      }
    }

  await usermodel.update(
  { name, email, age, role },
  { where }
);
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Edit Users", error);

    return send(res, RESPONSE.UNKNOWN);
  }
});
