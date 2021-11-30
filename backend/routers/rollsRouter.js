const express = require('express');
const Roll = require("./../models/rollModel");
const rollsController = require('./../controllers/rollsController')
const router = express.Router();

router.route('/')
.get(rollsController.getAllRolls)
.post(rollsController.addRoll)


router.route('/:rollNumber')
.get(rollsController.getRoll)
.delete(rollsController.deleteRoll)


module.exports = router;