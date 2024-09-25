const Country = require("../models/country.model");
const {httpResponse} = require("../../helpers/httpReponse");
const {Op} = require("sequelize")

const getAllCountries = async (req,res)=>{
    try {
        let response
        let data
        let {name} = req.query
        let matchObj = {}
        if(name){
            matchObj["name"]  = {
                [Op.regexp]:name
            }
        }
        data = await Country.findAll({where:matchObj,attributes:{exclude:["code"]}});
        if (!data.length) {
             response = new httpResponse(404,true,"","Data not found",data)
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Data  found successfully !",data)
            return res.status(response.status).json(response);
    } catch (error) {
        console.log("Error occured to get country:",error)
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, error.message, "Failed to get country"));
    }
}

module.exports = {
    getAllCountries
}