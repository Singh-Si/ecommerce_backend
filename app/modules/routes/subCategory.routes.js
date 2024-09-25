const express = require("express");
const router = express.Router();
const {    createSubCategory,
    getAllSubCategorys,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory} = require("../controllers/subCategory.controllers")
const verifyToken = require("../../helpers/auth")

//product api's getAllProducts
router.post("/add", verifyToken,createSubCategory);
router.get("/gets", verifyToken,getAllSubCategorys);
router.get("/get", verifyToken,getSubCategoryById);
router.put("/update", verifyToken,updateSubCategory);
router.delete("/delete", verifyToken,deleteSubCategory);

module.exports = router

