const State = require("../models/state.model")
const {httpResponse} = require("../../helpers/httpReponse")
const {Op} = require("sequelize")

const getAllSatates = async (req,res)=>{
    try {
        let response
        let data
        let {countryId,name} = req.query
        let matchObj = {}
        if(!countryId){
            response = new httpResponse(404,false,"","Country id is required",{})
            return res.status(response.status).json(response);
        }
        if(name){
            matchObj["name"]  = {
                [Op.regexp]:name
            }
        }
        matchObj["countryId"] = countryId
        data = await State.findAll({where:matchObj,attributes:{exclude:["code","countryId"]}});
        if (!data.length) {
             response = new httpResponse(404,true,"","Data not found",data)
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Data  found successfully !",data)
            return res.status(response.status).json(response);
    } catch (error) {
        console.log("Error occured to get state:",error)
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, error.message, "Failed to get state"));
    }
}

module.exports = {
    getAllSatates
}