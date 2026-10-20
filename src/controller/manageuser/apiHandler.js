import { Router } from "express";
import listuser from "./listuser.js";
import createUser from "./createUser.js";
import editUser from "./editUser.js";

let route=Router();

route.use("/create",createUser)
route.use("/list",listuser)
route.use("/edit",editUser)

export default route;