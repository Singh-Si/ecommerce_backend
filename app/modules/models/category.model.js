const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db/connection");
const User= require("../models/user.model")

const Category = sequelize.define("Category", {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false,
        unique:true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true
    },
    createdBy:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }},
    
})

// Category.sync({ force: true });

module.exports = Category
