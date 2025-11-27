import db from "../db/connect.js"
import { DataTypes } from "sequelize"

export const Genre = db.define("genre", {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})