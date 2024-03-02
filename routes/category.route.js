const express = require('express');
const Controller = require('../controllers/category.controller.js');
const {Router} = express;
const router = Router();

router.get('/categories', Controller.getAllCategories);
router.get('/categories/:id', Controller.getCategoryByid);
router.post('/categories', Controller.createCategory);
router.patch('/categories/:id', Controller.updateCategory);
router.delete('/categories/:id', Controller.deleteCategory);

module.exports = router