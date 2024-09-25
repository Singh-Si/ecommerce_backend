const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db/connection")

const Section = sequelize.define("Section", {
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

Section.sync({ alert: true });

module.exports = Section
