// const User = require("@/models/account/users.model");
const jwt = require("jsonwebtoken");

const generateJwtToken = async (obj) => {
    console.log("obj..................................",obj)
    let token 
        token = jwt.sign(obj, process.env.JWT_SECRET);
        return token

}
module.exports = generateJwtToken;

