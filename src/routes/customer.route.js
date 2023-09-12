
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('./../app/middlewares/jwt_verify.middleware');

const customerController = require('./../app/controllers/customer.controller');

router.get('/signin', customerController.signin);
router.post('/signin', customerController.signinPost);
router.get('/signup', customerController.signup);
router.get('/productList', verifyAccessToken, customerController.getProductList);
router.post('/signup/:id', customerController.regiter);
router.post('/logout', customerController.logout);

module.exports = router;