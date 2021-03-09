const Joi = require('@hapi/joi');

module.exports = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
}).label('UserCreate')