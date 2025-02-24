import Joi, { ObjectSchema } from 'joi';
/**
 * Joi schema for validating branch data.
 * 
 * @constant {ObjectSchema} branchSchema - The Joi schema used to validate branch data.
 * @description
 * This schema validates the following fields for a branch:
 * - `id`: A required string that must represent the branch ID.
 * - `name`: A required string with a minimum length of 3 and a maximum length of 100 characters.
 * - `address`: A required string with a minimum length of 3 and a maximum length of 100 characters.
 * - `phone`: An optional string that must match a valid phone number format (e.g., +1234567890).
 * 
 * The schema also provides custom error messages for each validation.
 */
export const branchSchema: ObjectSchema =Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'ID should be a type of string',
        'any.required': 'ID is required',
    }),
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