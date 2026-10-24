import { send, setErrMsg } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return send(res, RESPONSE.ACCESS_DENIED);
    }

    const [type, tokenValue] = token.split(" ");

    if (type !== "Bearer" || !tokenValue) {
      return send(res, RESPONSE.ACCESS_DENIED);
    }
    let decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Authentication", error);
    return send(res, setErrMsg(RESPONSE.INVALID, "token"));
  }
};

export default authenticate;
