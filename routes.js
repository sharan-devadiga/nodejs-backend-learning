import userApiHelper from "./src/controller/manageuser/apiHandler.js"
import authApiHelper from "./src/controller/auth/apiHandler.js"

const routes=(app)=>{
    app.use("/api/user",userApiHelper)
    app.use("/api/auth",authApiHelper)
}
export default routes