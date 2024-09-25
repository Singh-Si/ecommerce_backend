const sequelize = require("../../db/connection")
const {Sequelize,DataTypes, Model,} = require("sequelize")
const Country = require("../models/country.model")

const State = sequelize.define("State",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    countryId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Country,
            key:"id"
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    code:{
        type:DataTypes.STRING,
        allowNull: false,
        // unique: true,
    }
},{
    timestamps:false
}
)

// State.sync({alter:true})

module.exports = State