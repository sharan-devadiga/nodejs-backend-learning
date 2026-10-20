import userApiHelper from "./src/controller/manageuser/apiHandler.js"

const routes=(app)=>{
    app.use("/api/user",userApiHelper)
}
export default routes