import { DataTypes } from "sequelize";
import getConnection from "../helper/dbconnections.js";

let user = null;

let initUserModel = async () => {
  if (user) {
    return user;
  }

  let sequelize = await getConnection();

  user =  sequelize.define("users", {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0,
    },
  },
{
    freezeTableName:true,
    timestamps:true
});
await user.sync({alter:true})
return user
};
export default initUserModel;