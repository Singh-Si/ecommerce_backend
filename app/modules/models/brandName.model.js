const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db/connection")

const BrandName = sequelize.define("BrandName", {
    otp: {
        type: DataTypes.INTEGER,
        trim: true,
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        // unique: true,
    },
    
})

BrandName.sync({ alert: true });

module.exports = BrandName
