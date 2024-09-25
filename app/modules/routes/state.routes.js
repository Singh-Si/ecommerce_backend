const express = require("express");
const router = express.Router();
const {getAllSatates} = require("../controllers/state.controllers")
const verifyToken = require("../../helpers/auth")

//Country api's
router.get("/getAllSatates", getAllSatates);


module.exports = router

