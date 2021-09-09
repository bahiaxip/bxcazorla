"use strict"

const express = require("express");
const CardRentController = require("../controllers/cardrent");
const router = express.Router();

router.get("/",CardRentController.hola);
router.post("/cardrent",CardRentController.saveCardRent);
module.exports = router;
