import Joi from 'joi';

export const branchSchema =Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name should be type of string',
        'string.min': 'Name should have at least 3 charcters',
        'string.max': 'Name should have at most 100 charcters',
        'any.required': 'Name is required'
    }),
    address: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Address should be type of string',
        'string.min': 'Address should have at least 3 charcters',
        'string.max': 'Address should have at most 100 charcters',
        'any.required': 'Address is required'
    }),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional().messages({
        'string.base': 'Phone should be a type of string',
        'string.pattern.base': 'Phone number must be a valid format (e.g., +1234567890)'
    })
});