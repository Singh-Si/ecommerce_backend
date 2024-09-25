const Category = require("../models/category.model");
const {httpResponse} = require("../../helpers/httpReponse");
const SubCategory = require("../models/subCategory.model")
const pagination = require("../../utils/pagination");
const sequelize = require("../../db/connection")
const { where ,QueryTypes} = require("sequelize");


// Create Product
const createCategory = async(req,res)=>{
    try {
        let response
        let payload = req.body
        let user = req.user
        payload["createdBy"] = user.id
        console.log("payload.......................",payload)

        let categoryData = await Category.create(payload)
        if (!categoryData) {
            response = new httpResponse(400, true, "", "Category not  create  ", categoryData)
            return res.status(response.status).json(response)
        }
        response = new httpResponse(200, true, "", "Category create successfully !", categoryData)
        return res.status(response.status).json(response)
    } catch (error) {
        console.error("Error create Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to create Category", { error: error.message }));
    }
};

const getCategoryById = async(req,res)=>{
    try {
        let response
        let categoryData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Category id is required",{})
            return res.status(response.status).json(response);
        }
        categoryData = await Category.findByPk(id)
        
        if(!categoryData){
            response = new httpResponse(404,false,"","Category not found",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Data  found successfully !",categoryData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error find category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to find Category", { error: error.message }));
    }
}

// //get all Product
const getAllCategorys = async(req,res)=>{
    try {
        let response
        let {limit,page} = req.query
        let {limitCount,skip} = await pagination(limit,page)
        const {count,rows} = await Category.findAndCountAll({where:{},limit:limitCount,offset:skip,attributes:["name","id","status"]});
        if (!rows.length) {
             response = new httpResponse(404,true,"","Data not found",rows)
            return res.status(response.status).json({...response,total:count});
        }
        response = new httpResponse(200,true,"","Data  found successfully !",rows)
            return res.status(response.status).json({...response,total:count});
    } catch (error) {
        console.error("Error get Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to get Category", { error: error.message }));
    }
};

// get active category

const getAllActiveCategorys = async(req,res)=>{
    try {
        let response
        let {limit,page} = req.query
        let {limitCount,skip} = await pagination(limit,page)
        const {count,rows} = await Category.findAndCountAll({where:{status:true},limit:limitCount,offset:skip,attributes:["name","id","status"]});
        if (!rows.length) {
             response = new httpResponse(404,true,"","Data not found",rows)
            return res.status(response.status).json({...response,total:count});
        }
        response = new httpResponse(200,true,"","Data  found successfully !",rows)
            return res.status(response.status).json({...response,total:count});
    } catch (error) {
        console.error("Error get Category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to get Category", { error: error.message }));
    }
};

//update Product
const updateCategory = async(req,res)=>{
    try {
        let response
        let productData
        let payload = req.body
        let {id} = req.query
        console.log("id.....................................",id)
        if (!id) {
             response = new httpResponse(400,false,"","Category id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await Category.findOne({where:{id:id}})
        console.log("productData....................................",productData)
        if(!productData){
            response = new httpResponse(404,false,"","Category not found",{})
            return res.status(response.status).json(response);
        }
        productData = await productData.update(payload)
        console.log("afterproductDatakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",productData)
        response = new httpResponse(200,true,"","Data  update successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error update category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to update category", { error: error.message }));
    }
}

// delete product
const deleteCategory = async(req,res)=>{
    try {
        let response
        let productData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Category id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await Category.findByPk(id);
        if(!productData){
            response = new httpResponse(404,false,"","Category not found",{})
            return res.status(response.status).json(response);
        }
        await SubCategory.destroy({where:{categoryId:id}})
        productData = await Category.destroy({where:{id:id}});
        if(!productData){
            response = new httpResponse(404,false,"","Category not delete successfully",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Category  delete successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error delete category:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to delete category", { error: error.message }));
    }
}

module.exports = {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAllActiveCategorys
}