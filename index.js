import "dotenv/config"
import express from "express"
import getConnection from "./src/helper/dbconnections.js";
import routes from "./routes.js";

const app=express();
const PORT =process.env.PORT||3000
app.use(express.urlencoded({ extended: true }));

routes(app);
app.listen(PORT,()=>{
console.log("Server Running on Port ",PORT);
getConnection();
})