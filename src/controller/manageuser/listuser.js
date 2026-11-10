import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import { ROLE, STATUS } from "../../config/constants.js";
import authenticate from "../../middlewear/authenticate.js";
import { Op } from "sequelize";

let router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    if (req.user.role != ROLE.ADMIN) {
      return send(res, RESPONSE.ACCESS_DENIED);
    }

    let { search } = req.query;

    let where = {
      isActive: STATUS.ACTIVE,
    };
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    let { user_id } = req.query;

    let page = req.query.page === undefined ? 1 : Number(req.query.page);
    let limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
    let sortBy = req.query.sortBy || "createdAt";
    let sortOrder = req.query.sortOrder || "DESC";

    if (
      !Number.isInteger(page) ||
      page <= 0 ||
      !Number.isInteger(limit) ||
      limit <= 0
    ) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Page Value"));
    }

    let offset = (page - 1) * limit;

    if (user_id) {
      where.user_id = user_id;
    }
    let usermodel = await initUserModel();

    let { count, rows } = await usermodel.findAndCountAll({
      attributes: ["user_id", "name", "email", "age", "role"],
      where: where,
      offset: offset,
      limit,
      order: [[sortBy, sortOrder]],
    });
    let total_pages = Math.ceil(count / limit);
    return send(res, RESPONSE.SUCCESS, {
      totalRecords: count,
      currentPage: page,
      totalPages: total_pages,
      limit: limit,
      users: rows,
    });
  } catch (error) {
    console.log("List Users Error", error);
    return send(res, RESPONSE.UNKNOWN);
  }
});
