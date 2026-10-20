import { Router } from "express";
import initUserModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
import bcrypt from "bcrypt";

const route = Router();

export default route.post("/", async (req, res) => {
  try {
    let usermodel = await initUserModel();

    let { name, email, password, age, role } = req.body;

    if (!name) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
    }
    if (!email) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }
    let isEmailExists = await usermodel.findOne({ where: { email: email } });

    if (isEmailExists) {
      return send(res, setErrMsg(RESPONSE.EXISTS, "email"));
    }

    if (!password) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let hashedpassword = await bcrypt.hash(password, 10);

   let data= await usermodel.create({
      name: name,
      email: email,
      password: hashedpassword,
      age: age,
      role: role,
    });
    return send(res, RESPONSE.SUCCESS,data);
  } catch (error) {
    console.log("Create error:", error);
    return send(res, RESPONSE.UNKNOWN);
  }
});
