const joi = require('joi');

async function customerValidate(data) {
    const customerSchema = await joi.object({
        name: joi.string().max(50),
        email: joi.string().pattern(new RegExp('gmail.com$')).email(),
        password: joi.string().min(6).max(50),
        phoneNumber: joi.string().min(10).max(20),
        address: joi.string(),
        age: joi.number().integer()
    });
    return customerSchema.validate(data);
}

module.exports = { customerValidate };