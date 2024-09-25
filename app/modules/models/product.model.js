const sequelize = require("../../db/connection");
const { Sequelize, DataTypes, } = require("sequelize");
const Category = require("./category.model")
const User = require("./user.model")

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // slug: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    SKU: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    MRP: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    discount: {
        type: DataTypes.STRING,
    },
    weight: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    imgage: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }   
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },
    video: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
},
)
// Product.sync({ alter: true });

module.exports = Product