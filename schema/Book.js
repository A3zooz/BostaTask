import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelfLocation: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Book;