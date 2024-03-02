const express = require('express');
const Controller = require('../controllers/order.controller.js');
const {Router} = express;
const router = Router();

router.get('/orders', Controller.getAllOrder);
router.get('/orders/:id', Controller.getOrderById);
router.post('/orders', Controller.createOrder);
router.delete('/orders/:id', Controller.deleteOrder);

module.exports = router