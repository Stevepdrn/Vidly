const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12
    }
});

const Customer = mongoose.model('Customer', customerSchema); // better: pass the new mongoose.Schema and eliminate the const above.


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        phone: Joi.string().min(3).max(12).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;