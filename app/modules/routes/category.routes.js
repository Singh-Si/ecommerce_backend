const express = require("express");
const router = express.Router();
const {  createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,getAllActiveCategorys} = require("../controllers/category.controllers")
const verifyToken = require("../../helpers/auth")

//product api's getAllProducts
router.post("/add", verifyToken,createCategory);
router.get("/gets", verifyToken,getAllCategorys);
router.get("/get", verifyToken,getCategoryById);
router.put("/update", verifyToken,updateCategory);
router.delete("/delete", verifyToken,deleteCategory);
router.get("/activeCategory",getAllActiveCategorys);


module.exports = router

