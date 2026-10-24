import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { STATUS } from "../../config/constants.js";

let router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    let userModel = await initUserModel();

    if (!email) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }
    if (!password) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }
    let userData = await userModel.findOne({ where: { email: email } });

    if (!userData) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "User"));
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Password"));
    }

    let token=jwt.sign({
      user_id:userData.user_id,
      role:userData.role,
      name:userData.name
    },process.env.SECRET_KEY)
    
    return send(res,RESPONSE.SUCCESS,token)
  } catch (error) {
    console.log("Login Error:",error);
    
    return send(res,RESPONSE.UNKNOWN)
  }
});
