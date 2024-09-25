const express = require("express");
const router = express.Router();
const { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct,getProductList} = require("../controllers/product.controllers")
const verifyToken = require("../../helpers/auth")

//product api's getAllProducts
router.post("/add", verifyToken,createProduct);
router.get("/gets", verifyToken,getAllProducts);
router.get("/get", verifyToken,getProductById);
router.put("/update", verifyToken,updateProduct);
router.delete("/delete", verifyToken,deleteProduct);
router.get("/productList",getProductList);


module.exports = router

