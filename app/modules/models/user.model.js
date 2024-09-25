const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db/connection");
const bcrypt = require('bcrypt');
const { Hooks } = require('sequelize/lib/hooks');
const Country = require("./country.model");
const State = require("./state.model");
// console.log('Country..................................',Country)
const User = sequelize.define("User", {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    firstName: {
        type: DataTypes.STRING,
        trim: true,
    },
    lastName: {
        type: DataTypes.STRING,
        trim: true,
    },
    addressLine1: {
        type: DataTypes.STRING,
        trim: true,
    },
    addressLine2: {
        type: DataTypes.STRING,
        trim: true,
    },
    password: {
        type: DataTypes.STRING,
        trim: true,
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
    },
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true,
    //         },
    //     },
    // ],
    countryId:{
        type:DataTypes.UUID,
        // allowNull:false,
        references:{
            model:Country,
            key:"id"
        }
    },
    // stateId:{
    //     type:DataTypes.UUID,
    //     // allowNull:false,
    //     references:{
    //         model:State,
    //         key:"id"
    //     }
    // },
    role: {
        type: DataTypes.STRING,
        required: true,
        default: "user",
    },
    mobileNumber:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN
        
    }
    // memberShip: {
    //     type: String,
    //     default: "member",
    //     required: true,
    // },
    // language: {
    //     type: String,
    //     required: true,
    //     default: "en",
    // },
    // location: {
    //     type: Array,
    // },
    // address1: {
    //     type: String,
    //     trim: true,
    // },
    // address2: {
    //     type: String,
    //     trim: true,
    // },
    // city: {
    //     type: String,
    //     trim: true,
    // },
    // country: {
    //     type: String,
    //     trim: true,
    // },
    // billingAddress: {
    //     type: String,
    //     trim: true,
    // },
    // contactNum: {
    //     type: String,
    //     trim: true,
    // },
    // cart: [
    //     {
    //         productId: { type: Schema.Types.ObjectId },
    //         name: { type: String },
    //         description: { type: String },
    //         image: [{ type: String }],
    //         price: { type: String },
    //         discount: { type: String },
    //         size: { type: String },
    //         qty: { type: Number },
    //         color: { type: String },
    //         totalSize: { type: Number },
    //     },
    // ],
    // orders: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "orders",
    //     },
    // ],
    // firstName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   lastName: {
    //     type: DataTypes.STRING,
    //     // allowNull defaults to true
    //   },
},{
    hooks:{
        beforeCreate:async (user, options) => {
            if(user.password){
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword
            }
          },
          beforeUpdate:async (user, options) => {
            if(user.password){
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword
            }
          },

    }
}
)
//assosiation model

// User.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });
// User.belongsTo(State, { foreignKey: 'stateId', as: 'state' });
 User.sync({ alter: true });
console.log('The table for the User model was just (re)created!');

module.exports = User
