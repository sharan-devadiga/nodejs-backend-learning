import { Sequelize } from "sequelize";

let connection=null;

const getConnection=async()=>{
    // console.log(process.env.PGDATABASE);
    if (!connection) {
        connection = new Sequelize({
            database:process.env.PGDATABASE,
            username:process.env.PGUSERNAME,
            host:process.env.PGHOST,
            password:process.env.PGPASSWORD,
            port:5432,
            dialect:"postgres",
            pool:{
                max:5,
                min:0,
                idle:2000,
                acquire:200000
            },
            logging:false
        })
        connection
        .authenticate().then(()=>console.log("Database Connected Successfully")
        ).catch((err)=>{console.log("Failed To connect Database",err);
        })
    }
    return connection
}
export default getConnection