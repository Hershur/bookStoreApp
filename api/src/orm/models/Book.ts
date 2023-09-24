import { DataTypes } from "sequelize";
import sequelize from "../createDbConnection";

const Book = sequelize.define("book", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    author: DataTypes.TEXT,
    category: DataTypes.TEXT,
});


export default Book;