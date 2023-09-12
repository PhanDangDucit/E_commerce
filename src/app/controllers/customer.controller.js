const { Customer } = require('../models/customer.model');
const createError = require('http-errors');
const { customerValidate } = require('../../validators/customer.validate');
const { signAccessToken } = require('../../helpers/jwt_sign.helpers');

class CustomerController {
    // [Get] route: customer/signin
    signin(req, res, next) {
        return res.render('customer/signin');
    }
    // [post] route:  customer/signin/:id
    async signinPost(req, res, next) {
        try {
            const {email, password} = req.body ?? "error";
            const { error } = await customerValidate(req.body);
            if(error) {
                throw createError.BadRequest(error)
                // throw createError.BadRequest('This account is invalid!');
            }
            const user = await Customer.findOne({username: email});
            if(!user) {
                throw next(createError.Unauthorized('This account doesn\'t exists!'));
            }
            const isCheckPassword = await user.isCheckPassword(password);
            if(!isCheckPassword) {
                throw createError.Unauthorized('This account isn\'t incorrect!');
            }
            const accessToken = await signAccessToken(user._id.toString());
            if(!accessToken) {
                throw createError.Unauthorized('This account doesn\'t create access token!');
            };
            res.setHeader('Set-Cookie', [
                `accessToken=${accessToken}; HttpOnly; Max-Age=${1000};`,
            ])
            return res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
    // [Get] route: customer/sign up
    signup(req, res, next) {
        return res.render('customer/signup');
    }
    // [post] route: customer/signup
    async regiter(req, res, next) {
        try {
            const { email, name, address, password, age, phoneNumber } = req.body;
            const { error } = await customerValidate(req.body);
            if(error) {
                throw next(error);
            }
            const isExists = await Customer.findOne({username: email});
            if(isExists) {
                throw (createError.Conflict('This account is exist!'));
            }
            const customer = new Customer({
                name,
                address, 
                password, 
                phoneNumber,
                age,
                username: email,
            });
            const isCreate = await customer.save();
            if(!isCreate) {
                throw (createError.Conflict('You don\'t! sign up!'));
            }
            return res.render('customer/signin')
        } catch(err) {
            next(err)
        }
    }
    // [post] - route: customer/sign out
    async logout(req, res, next) {

    }
    // [Get] - route: customer/productlist
    getProductList(req, res, next) {
        const productList = [
            {
                title: 'VIC',
                price: 3
            },
            {
                title: 'SSI',
                price: 2
            }
        ];
        return res.json({productList});
    }
}

module.exports = new CustomerController;