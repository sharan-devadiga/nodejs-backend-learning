import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import { ROLE, STATUS } from "../../config/constants.js";
import authenticate from '../../middlewear/authenticate.js'

let router = Router();

export default router.get("/", authenticate ,async (req, res) => {
  try {
    if (req.user.role!=ROLE.ADMIN) {
      return send(res,RESPONSE.ACCESS_DENIED)
    }

    
    let where = {
      isActive: STATUS.ACTIVE,
    };
    let { user_id } = req.query;

    let page=Number(req.query.page)||1;
    let limit=Number(req.query.limit)||10

    let offset=(page-1)*limit;

    if (user_id) {
      where = { user_id: user_id, isActive: STATUS.ACTIVE };
    }
    let usermodel = await initUserModel();

    let data = await usermodel.findAll({
      attributes: ["user_id", "name", "email", "age", "role"],
      where: where,
      offset:offset,
      limit,
    });
    return send(res, RESPONSE.SUCCESS, data);
  } catch (error) {
    console.log("List Users Error", error);
    return send(res, RESPONSE.UNKNOWN);
  }
});
