
const User = require("../models/user.model");
const {httpResponse} = require("../../helpers/httpReponse");
const generateJwtToken = require("../../helpers/generateToke");
const pagination = require("../../utils/pagination");
const generateOtp = require("../../utils/generateOtp");
const bcrypt = require('bcrypt');
const sequelize = require("../../db/connection")
const Otp = require("../models/otp.model");
const sendEmail = require("../../utils/sendEmail");
const Country = require("..//models/country.model");

const { where ,QueryTypes} = require("sequelize");

// Sign Up
const createUser = async(req,res)=>{
    try {
        let response
        let payload = req.body
        console.log("payload.........................",payload)
        let UserData = await User.create(payload) 
        let id = UserData.id
        let token = await generateJwtToken({id:id})
        response = new httpResponse(200,true,"","User create successfully !",UserData)
        return res.status(response.status).json({...response,token})
    } catch (error) {
        console.error("Error sign up user:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to sign up user", { error: error.message }));
    }
};

//login
const loginUser = async(req,res)=>{
    try {
        console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKk",req)
        let response
        const { email, password } = req.body;
        if (!email || !password) {
            response = new httpResponse(400,false,"","Email and password are required.",{})
            return res.status(response.status).json(response);
        }
        // let query = `select * from Users where Users.email = ${email}`
        // let user = await sequelize.query(query)
        // user = user[0][0]
        const user = await User.findOne({where:{ email }});

        console.log("user................................",user)
        if (!user) {
             response = new httpResponse(400,false,"","Invalid email or password.",{})
            return res.status(response.status).json(response);
        }
        console.log("password,user.password...............",password,user?.password)
        if (! (await bcrypt.compare(password,user?.password)) ) {
            response = new httpResponse(400,false,"","Invalid email or password.",{})
            return res.status(response.status).json(response);
        }
        const token = await generateJwtToken({id:user.id});
        user.password = undefined
        response = new httpResponse(200,true,"","Login successfully!",user)
       return res.status(response.status).json({...response,token});
        
    } catch (error) {
        console.error("Error login user:", error);
    }
};

// get user by id
const getUserById = async(req,res)=>{
    try {
        let response
        let userData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","User id is required",{})
            return res.status(response.status).json(response);
        }
        
        let query = `
        SELECT 
         Users.id as userId, 
        States.id as stateId, 
        States.name as stateName, 
        Users.firstName as firstName, 
        Users.lastName as lastName, 
        Users.email as email,
        Countries.id as countryId, 
        Countries.name as countryName, 
        Countries.code as countryCode   
        FROM 
            Users 
        LEFT JOIN 
            States 
        ON 
            Users.stateId = States.id
         LEFT JOIN 
        Countries 
        ON 
        Users.countryId = Countries.id
            where Users.id='${id}'

    `;
        userData = await sequelize.query(query,{
            type: QueryTypes.SELECT
        })
        if(!userData){
            response = new httpResponse(404,false,"","User not found",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Data  found successfully !",userData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error find user:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to find user", { error: error.message }));
    }
}

//get all users
const getAllUsers = async(req,res)=>{
    try {
        let response
        let {limit,page,role} = req.query
        let {limitCount,skip} = await pagination(limit,page)
        let matchObj = {}
        // if(role){
        //     matchObj["role"] = role
        // }
        const {count,rows} = await User.findAndCountAll(
            {
                where: matchObj,
                limit: limitCount,
                offset: skip,
                attributes: { exclude: ["password"] },
                order: [
                  ['createdAt', 'DESC'], // Corrected order syntax
                ],
              }
        );
        if (!rows.length) {
             response = new httpResponse(404,true,"","Data not found",rows)
            return res.status(response.status).json({...response,total:count});
        }
        response = new httpResponse(200,true,"","Data  found successfully !",rows)
            return res.status(response.status).json({...response,total:count});
    } catch (error) {
        console.error("Error finding user:", error);
    }
};

//update user
const updateUser = async(req,res)=>{
    try {
        let response
        let userData
        let payload = req.body
        let user = req.user
        // let {id} = req.query
        // if (!id) {
        //      response = new httpResponse(400,false,"","User id is required",{})
        //     return res.status(response.status).json(response);
        // }
        userData = await User.findOne({where:{id:user.id}})
        if(!userData){
            response = new httpResponse(404,false,"","User not found",{})
            return res.status(response.status).json(response);
        }
        userData = await userData.update(payload)
        response = new httpResponse(200,true,"","Data  update successfully !",userData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error update user:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to update user", { error: error.message }));
    }
}

// delete user
const deleteUser = async(req,res)=>{
    try {
        let response
        let userData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","User id is required",{})
            return res.status(response.status).json(response);
        }
        userData = await User.destroy({where:{id:id}})
        if(!userData){
            response = new httpResponse(404,false,"","User not found",{})
            return res.status(response.status).json(response);
        }
        // userData = await userData.update(payload)
        response = new httpResponse(200,true,"","Data  delete successfully !",userData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error delete user:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to delete user", { error: error.message }));
    }
}

// send otp
const sendOtp = async(req,res)=>{
    try {
        let response
        let userData
        let otp
        let {email} = req.query
        if (!email) {
             response = new httpResponse(400,false,"","Email  is required",{})
            return res.status(response.status).json(response);
        }
        userData = await User.findAll({where:{email:email}})
        if(!userData){
            response = new httpResponse(404,false,"","email not exits",{})
            return res.status(response.status).json(response);
        }
        await Otp.destroy({where:{email:email}})
        otp = await generateOtp()
        otp = otp.data
        let otpDetails = await Otp.create({
            email:email,
            otp:otp,

        })
        let emailOption = {
           email:email,
            otp:otp,
            subject:"Otp Veryfication",
        }
        // userData = await userData.update(payload)
        let data = await sendEmail(emailOption)
        console.log("data.........................",data)
        response = new httpResponse(200,true,"","Otp send  successfully !",)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error send otp:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to  send otp", { error: error.message }));
    }
}
// verify email
const verifyOtp = async(req,res)=>{
    try {
        let response
        let otpDetails
        let {email,otp} = req.body
        if (!email ) {
             response = new httpResponse(400,false,"","Email  is required",{})
            return res.status(response.status).json(response);
        }
        if(!otp){
            response = new httpResponse(400,false,"","Otp  is required",{})
            return res.status(response.status).json(response);
        }
        otpDetails = await Otp.findAll({where:{email:email}})
        if(!otpDetails){
            response = new httpResponse(404,false,"","email not exist",{})
            return res.status(response.status).json(response);
        }
        console.log(otp,otpDetails[0].otp)
        if(otp != otpDetails[0] ?.otp){
            response = new httpResponse(400,false,"","Incorrect otp",)
            return res.status(response.status).json(response);
        }
       
        response = new httpResponse(200,true,"","Otp match successfully!",)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error verify otp:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to  send otp", { error: error.message }));
    }
};

// forgot password
const forgotPassword = async(req,res)=>{
    try {
        let response
        let userDetails
        let {email,password} = req.body
        if (!email ) {
             response = new httpResponse(400,false,"","Email  is required",{})
            return res.status(response.status).json(response);
        }
        if(!password){
            response = new httpResponse(400,false,"","password  is required",{})
            return res.status(response.status).json(response);
        }
        userDetails = await User.findOne({where:{email:email}})
        if(!userDetails){
            response = new httpResponse(404,false,"","email not exist",{})
            return res.status(response.status).json(response);
        }
        userDetails.password = password
        await userDetails.save()
        response = new httpResponse(200,true,"","password update successfully!",)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error forgot password:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to  forgot password", { error: error.message }));
    }
};

// log out
const logOut = async(req,res)=>{
    try {
       return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error("Error forgot password:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to  forgot password", { error: error.message }));
    }
};


module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    sendOtp,
    verifyOtp,
    forgotPassword,
    logOut
}

