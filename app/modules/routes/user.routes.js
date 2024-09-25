const express = require("express");
const router = express.Router();
const { createUser, loginUser, getAllUsers, updateUser, deleteUser, getUserById ,sendOtp,verifyOtp,forgotPassword,logOut} = require("../controllers/user.controller")
const verifyToken = require("../../helpers/auth")

//user api's
router.post("/user", createUser);
router.post("/login", loginUser);
router.get("/getUserById", verifyToken, getUserById);
router.get("/getAllUsers", verifyToken, getAllUsers);
router.put("/updateUser", verifyToken, updateUser);
router.delete("/deleteUserById", verifyToken, deleteUser);
router.put("/forgotPassword", forgotPassword);
router.post("/logOut",logOut);



// otp api's
router.get("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);




module.exports = router

