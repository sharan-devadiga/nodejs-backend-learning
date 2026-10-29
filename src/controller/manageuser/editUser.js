import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import { ROLE, STATUS } from "../../config/constants.js";
import authenticate from "../../middlewear/authenticate.js";
import { Op } from "sequelize";

let router = Router();

export default router.patch("/", authenticate, async (req, res) => {
  try {
    let { user_id } = req.query;
    if (req.user.role == ROLE.STAFF) {
      user_id = req.user.user_id;
    } 
    if (req.user.role!==ROLE.STAFF&&req.user.role!==ROLE.ADMIN) {
      return send(res,setErrMsg(RESPONSE.INVALID,"Role"))
    }
    let { name, email, age } = req.body;

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
      let isEmailExists = await usermodel.findOne({
        where: { email: email, user_id: { [Op.ne]: user_id } },
      });
      if (isEmailExists) {
        return send(res, setErrMsg(RESPONSE.EXISTS, "Email"));
      }
    }

    await usermodel.update({ name:name, email:email, age:age }, { where });
    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Edit Users", error);

    return send(res, RESPONSE.UNKNOWN);
  }
});
