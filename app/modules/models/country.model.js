const sequelize = require("../../db/connection");
const {Sequelize,DataTypes,} = require("sequelize");
const User = require("./user.model");
console.log("User...................................",User)

const Country = sequelize.define("Country",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    code:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
},{
    timestamps:false
}
)
// Country.hasMany(User);
// Country.sync({alter:true})

module.exports = Country