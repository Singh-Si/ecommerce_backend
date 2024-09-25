const express = require("express");
const router = express.Router();
const {getAllCountries} = require("../controllers/country.controller")
const verifyToken = require("../../helpers/auth")

//Country api's
router.get("/getAllCountries", getAllCountries);


module.exports = router

