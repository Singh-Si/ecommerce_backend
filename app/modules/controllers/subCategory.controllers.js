const SubCategory = require("../models/subCategory.model");
const {httpResponse} = require("../../helpers/httpReponse");
const pagination = require("../../utils/pagination");
const sequelize = require("../../db/connection")
const { where ,QueryTypes, json} = require("sequelize");


// Create Product
const createSubCategory = async(req,res)=>{
    try {
        let response
        let payload = req.body
        let user = req.user
        payload["createdBy"] = user.id
        let subCategoryDetails = await SubCategory.create(payload)
        if (!subCategoryDetails) {
            response = new httpResponse(400, true, "", "Sub Category not  create  ", subCategoryDetails)
            return res.status(response.status).json(response)
        }
        response = new httpResponse(200, true, "", "Sub Category create successfully !", subCategoryDetails)
        return res.status(response.status).json(response)
    } catch (error) {
        console.error("Error create Sub Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to create Sub Category", { error: error.message }));
    }
};

const getSubCategoryById = async(req,res)=>{
    try {
        let response
        let categoryData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Sub Category id is required",{})
            return res.status(response.status).json(response);
        }
        console.log("ifdd..................................",id)
        categoryData = await SubCategory.findByPk(id)
        
        if(!categoryData){
            response = new httpResponse(404,false,"","Sub Category not found",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Data  found successfully !",categoryData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error find Sub Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to find Sub Category", { error: error.message }));
    }
}

// //get all Product
const getAllSubCategorys = async(req,res)=>{
    try {
        let response
        let {limit,page} = req.query
        let query = `select * from test_data.SubCategories left join test_data.Categories on SubCategories.categoryId=Categories.id;`
        let {limitCount,skip} = await pagination(limit,page)
        const {count,rows} = await SubCategory.findAndCountAll({where:{},limit:limitCount,offset:skip,attributes:{exclude:["password"]}});
        // let data = await sequelize.query(query,{
        //     type: QueryTypes.SELECT
        // })
        // console.log("data..........................",data)
        // return res.status(200),json({data:data})
        if (!rows.length) {
             response = new httpResponse(404,true,"","Data not found",rows)
            return res.status(response.status).json({...response,total:count});
        }
        response = new httpResponse(200,true,"","Data  found successfully !",rows)
            return res.status(response.status).json({...response,total:count});
    } catch (error) {
        console.error("Error get Sub Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to get Sub Category", { error: error.message }));
    }
};

//update Product
const updateSubCategory = async(req,res)=>{
    try {
        let response
        let productData
        let payload = req.body
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Sub Category id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await SubCategory.findOne({where:{id:id}})
        if(!productData){
            response = new httpResponse(404,false,"","Sub Category not found",{})
            return res.status(response.status).json(response);
        }
        productData = await productData.update(payload)
        response = new httpResponse(200,true,"","Sub Category  update successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error update Sub Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to update Sub Category", { error: error.message }));
    }
}

// delete product
const deleteSubCategory = async(req,res)=>{
    try {
        let response
        let productData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Sub Category id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await SubCategory.destroy({where:{id:id}})
        if(!productData){
            response = new httpResponse(404,false,"","Sub Category not found",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Sub Category  delete successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error delete Sub Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to delete Sub Category", { error: error.message }));
    }
}

module.exports = {
    createSubCategory,
    getAllSubCategorys,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}