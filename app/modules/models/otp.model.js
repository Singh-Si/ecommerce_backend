const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db/connection")

const Otp = sequelize.define("Otp", {
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

Otp.sync({ alert: true });

module.exports = Otp
