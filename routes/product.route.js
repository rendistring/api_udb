const express = require('express');
const Controller = require('../controllers/product.controller.js');
const {Router} = express;
const router = Router();

router.get('/products', Controller.getAllProducts);
router.get('/products/category/:category', Controller.getProductByCategory);
router.get('/products/:id', Controller.getProductByid);
router.post('/products', Controller.createProduct);
router.put('/products/:id', Controller.updateProduct);
router.delete('/products/:id', Controller.deleteProduct);

module.exports = router