import { Router } from "express";

import loginUser from "./loginUser.js";

let route=Router();

route.use("/login",loginUser)


export default route;