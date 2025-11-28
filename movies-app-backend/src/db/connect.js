import { Sequelize } from "sequelize";
import { env } from "../env/index.js";

const sequelize = new Sequelize(env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    timezone: "+00:00",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

export const connectDB = async () => {
    console.log('Connecting to Database...')
    await sequelize.authenticate()
    console.log('Database connected')
    console.log('Sincronizing models...')
    await sequelize.sync({ force: false, alter: false})
    console.log('Models sincronized')
}

export default sequelize