import { DataTypes } from "sequelize";
import sequelize from "../createDbConnection";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    address: DataTypes.TEXT,
    age: DataTypes.INTEGER
});


export default User;