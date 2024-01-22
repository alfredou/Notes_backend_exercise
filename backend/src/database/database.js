import Sequelize from "sequelize";
import {config} from "dotenv"

config()

//process.env.DBNAME, // db name,
//process.env.POSTGRES, // username
//process.env.PASSWORD, // password
export const sequelize = new Sequelize(process.env.CONNECTION_STRING,  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Puedes ajustar esto dependiendo de tu configuración de Render.com
      },
    },
    logging: false,
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);