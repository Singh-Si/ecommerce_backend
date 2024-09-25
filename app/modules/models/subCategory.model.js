const { Sequelize, DataTypes } = require('sequelize');
const User = require("../models/user.model")
const sequelize = require("../../db/connection");
const Category = require("../models/category.model")

const SubCategory = sequelize.define("SubCategory", {
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
    categoryId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Category,
            key:"id"
        }},
    createdBy:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }},
    
})

// SubCategory.sync({ alert: true });

module.exports = SubCategory
