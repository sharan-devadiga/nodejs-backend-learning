import { Router } from "express";
import listuser from "./listuser.js";
import createUser from "./createUser.js";
import editUser from "./editUser.js";
import deleteUser from "./deleteUser.js";

let route=Router();

route.use("/create",createUser)
route.use("/list",listuser)
route.use("/edit",editUser)
route.use("/delete",deleteUser)

export default route;