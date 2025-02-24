import Joi, { ObjectSchema } from 'joi';
/**
 * Joi schema for validating employee data.
 * 
 * @constant {ObjectSchema} employeeSchema - The Joi schema used to validate employee data.
 * @description
 * This schema validates the following fields for an employee:
 * - `id`: A required string with a minimum length of 1 and a maximum length of 50 characters.
 * - `name`: A required string with a minimum length of 3 and a maximum length of 50 characters.
 * - `position`: A required string with a minimum length of 3 and a maximum length of 50 characters.
 * - `department`: A required string with a minimum length of 3 and a maximum length of 50 characters.
 * - `email`: A required string with a minimum length of 3 and a maximum length of 50 characters.
 * - `phone`: An optional string that must match a valid phone number format (e.g., +1234567890).
 * - `branchId`: A required string with a minimum length of 1 and a maximum length of 50 characters.
 * 
 * The schema also provides custom error messages for each validation rule.
 */
export const employeeSchema: ObjectSchema = Joi.object({
    id:Joi.string().min(1).max(50).required().messages({
        'string.base': 'id should be a type string',
        'string.min': 'id should have at least 3 charcters',
        'string.max': 'id should at most 50 characters',
        'any.required': 'id is required'
    }),

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
    department:Joi.string().min(3).max(50).required().messages({
        'string.base': 'department should be a type string',
        'string.min': 'department should have at least 3 charcters',
        'string.max': 'department should at most 50 characters',
        'any.required': 'department is required'
    }),
    email: Joi.string().min(3).max(50).required().messages({
        'string.base': 'E-mail should be a type string',
        'string.min': 'E-mail should have at least 3 charcters',
        'string.max': 'E-mail should at most 50 characters',
        'any.required': 'E-mail is required'
    }),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional().messages({
        'string.base': 'Phone should be a type of string',
        'string.pattern.base': 'Phone number must be a valid format (e.g., +1234567890)'
        }),
    branchId: Joi.string().min(1).max(50).required().messages({
        'string.base': 'Branch ID should be a type string',
        'string.min': 'Branch ID should have at least 3 charcters',
        'string.max': 'Branch ID should at most 50 characters',
        'any.required': 'Branch ID is required'
    })
});