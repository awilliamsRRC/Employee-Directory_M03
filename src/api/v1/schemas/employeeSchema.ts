import Joi, { ObjectSchema } from "joi";

const employeeSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name should be a type string',
        'string.min': 'Name should have at least 3 charcters',
        'string.max': 'Name should at most 50 characters',
        'any.required': 'Name is required'
    }),
    position: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Position should be a type string',
        'string.min': 'Position should have at least 3 charcters',
        'string.max': 'Position should at most 50 characters',
        'any.required': 'Position is required'
    }),
    email: Joi.string().min(3).max(50).required().messages({
        'string.base': 'E-mail should be a type string',
        'string.min': 'E-mail should have at least 3 charcters',
        'string.max': 'E-mail should at most 50 characters',
        'any.required': 'E-mail is required'
    }),
    branchId: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Branch ID should be a type string',
        'string.min': 'Branch ID should have at least 3 charcters',
        'string.max': 'Branch ID should at most 50 characters',
        'any.required': 'Branch ID is required'
    })
});