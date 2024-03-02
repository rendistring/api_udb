const express = require('express');
const Controller = require('../controllers/transaction.controller.js');
const {Router} = express;

const router = Router();

router.get('/transactions', Controller.getAllTransaction);
router.get('/transactions/:id', Controller.getTransactionById);

module.exports = router