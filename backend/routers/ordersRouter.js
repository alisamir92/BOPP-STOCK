const express = require('express');
const Roll = require("./../models/rollModel");
const ordersController = require('./../controllers/ordersController')
const router = express.Router();

router.route('/')
.get(ordersController.getAllOrders)


router.route('/:orderNumber')
.get(ordersController.getOrder)
.delete(ordersController.deleteOrder)

module.exports = router;