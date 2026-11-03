import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
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

  let page = req.query.page === undefined ? 1 : Number(req.query.page);
let limit = req.query.limit === undefined ? 10 : Number(req.query.limit);

if (
  !Number.isInteger(page) || page <= 0 ||
  !Number.isInteger(limit) || limit <= 0
) {
  return send(res, setErrMsg(RESPONSE.INVALID, "Page Value"));
}

    let offset=(page-1)*limit;

    if (user_id) {
      where = { user_id: user_id, isActive: STATUS.ACTIVE };
    }
    let usermodel = await initUserModel();

    let {count,rows} = await usermodel.findAndCountAll({
      attributes: ["user_id", "name", "email", "age", "role"],
      where: where,
      offset:offset,
      limit,
    });
    return send(res, RESPONSE.SUCCESS, {count,rows});
  } catch (error) {
    console.log("List Users Error", error);
    return send(res, RESPONSE.UNKNOWN);
  }
});
