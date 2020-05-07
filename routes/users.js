const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');

const _ = require('lodash');
const {
    User,
    validate
} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};


router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    
    function validateUser(user) {
        const schema = Joi.object({
            name: Joi.string().min(1).max(55).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: passwordComplexity(complexityOptions)
        });

        return schema.validate(user);
    }

    validateUser();
    await user.save();


    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;