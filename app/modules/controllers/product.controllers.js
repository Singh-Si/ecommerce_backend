const Product = require("../models/product.model");
const {httpResponse} = require("../../helpers/httpReponse");
const pagination = require("../../utils/pagination");
const sequelize = require("../../db/connection")
const { where ,QueryTypes,Op} = require("sequelize");


// Create Product
const createProduct = async(req,res)=>{
    try {
        let response
        let payload = req.body
        let user = req.user
        payload["createdBy"] = user.id
        let productData = await Product.create(payload)
        if (!productData) {
            response = new httpResponse(400, true, "", "Product not  create  ", productData)
            return res.status(response.status).json(response)
        }
        response = new httpResponse(200, true, "", "Product create successfully !", productData)
        return res.status(response.status).json(response)
    } catch (error) {
        console.error("Error create product:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to create product", { error: error.message }));
    }
};

// //login
// const loginUser = async(req,res)=>{
//     try {
//         let response
//         const { email, password } = req.body;
//         if (!email || !password) {
//             response = new httpResponse(400,false,"","Email and password are required.",{})
//             return res.status(response.status).json(response);
//         }
//         // let query = `select * from Users where Users.email = ${email}`
//         // let user = await sequelize.query(query)
//         // user = user[0][0]
//         const user = await User.findOne({where:{ email }});

//         console.log("user................................",user)
//         if (!user) {
//              response = new httpResponse(400,false,"","Invalid email or password.",{})
//             return res.status(response.status).json(response);
//         }
//         console.log("password,user.password...............",password,user?.password)
//         if (! (await bcrypt.compare(password,user?.password)) ) {
//             response = new httpResponse(400,false,"","Invalid email or password.",{})
//             return res.status(response.status).json(response);
//         }
//         const token = await generateJwtToken({id:user.id});
//         user.password = undefined
//         response = new httpResponse(200,true,"","Login successfully!",user)
//        return res.status(response.status).json({...response,token});
        
//     } catch (error) {
//         console.error("Error login user:", error);
//     }
// };

// // get product by id
const getProductById = async(req,res)=>{
    try {
        let response
        let productData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Product id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await Product.findByPk(id)
        
        if(!productData){
            response = new httpResponse(404,false,"","Product not found",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Data  found successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error find product:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to find product", { error: error.message }));
    }
}

// //get all Product
const getAllProducts = async(req,res)=>{
    try {
        let response
        let {limit,page} = req.query
        let {limitCount,skip} = await pagination(limit,page)
        const {count,rows} = await Product.findAndCountAll({where:{},limit:limitCount,offset:skip,attributes:{exclude:["password"]}});
        if (!rows.length) {
             response = new httpResponse(404,true,"","Data not found",rows)
            return res.status(response.status).json({...response,total:count});
        }
        response = new httpResponse(200,true,"","Data  found successfully !",rows)
            return res.status(response.status).json({...response,total:count});
    } catch (error) {
        console.error("Error get product:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to get product", { error: error.message }));
    }
};

//update Product
const updateProduct = async(req,res)=>{
    try {
        let response
        let productData
        let payload = req.body
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Product id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await Product.findOne({where:{id:id}})
        if(!productData){
            response = new httpResponse(404,false,"","Product not found",{})
            return res.status(response.status).json(response);
        }
        productData = await productData.update(payload)
        response = new httpResponse(200,true,"","Data  update successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error update product:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to update product", { error: error.message }));
    }
}

// delete product
const deleteProduct = async(req,res)=>{
    try {
        let response
        let productData
        let {id} = req.query
        if (!id) {
             response = new httpResponse(400,false,"","Product id is required",{})
            return res.status(response.status).json(response);
        }
        productData = await Product.destroy({where:{id:id}})
        if(!productData){
            response = new httpResponse(404,false,"","Product not found",{})
            return res.status(response.status).json(response);
        }
        response = new httpResponse(200,true,"","Product  delete successfully !",productData)
            return res.status(response.status).json(response);

    } catch (error) {
        console.error("Error delete product:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to delete product", { error: error.message }));
    }
}

const getProductList = async(req,res)=>{
    try {
        let response
        let {name,categoryId} = req.query
        let query = `select * from Products `
        let matchObj = {}
        if(name){
            query = query + `where name REGEXP "${name}" and `
            matchObj["name"] = {
                [Op.regexp]:name
            }
        }
        if(categoryId){
            matchObj["categoryId"] = categoryId
            query = query + `categoryId = "${categoryId}" `
        }
        // query = query + `limit 1`
        const data = await Product.findAll({where:matchObj});
        // console.log('query.......................................',query)
        // const [data, metadata] = await sequelize.query(query);
        console.log("data...................................",data)

        if (!data.length) {
             response = new httpResponse(404,true,"","Data not found",data)
            return res.status(response.status).json({...response});
        }
        response = new httpResponse(200,true,"","Data  found successfully !",data)
            return res.status(response.status).json({...response});
    } catch (error) {
        console.error("Error get product:", error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json(new httpResponse(statusCode, false, "", "Failed to get product", { error: error.message }));
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductList
}