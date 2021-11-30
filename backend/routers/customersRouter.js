const express = require('express');
const Roll = require("./../models/rollModel");
const customersController = require('./../controllers/customersController')
const router = express.Router();

router.route('/')
.get(customersController.getAllCustomers)


router.route('/:customerName')
.get(customersController.getCustomer)


module.exports = router;