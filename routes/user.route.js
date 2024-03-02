const express = require('express');
const Controller = require('../controllers/user.controller.js');
const {Router} = express;

const router = Router();

router.post('/signin', Controller.SignIn);
router.get('/signout', Controller.SignOut);
router.get('/profile', Controller.getAllUser);

module.exports = router