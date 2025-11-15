import Joi from "joi";

export const createEmployeeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    position: Joi.string().min(2).required(),
    department: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    branchId: Joi.number().required(),
});

export const updateEmployeeSchema = Joi.object({
    name: Joi.string().min(2),
    position: Joi.string().min(2),
    department: Joi.string().min(2),
    email: Joi.string().email(),
    phone: Joi.string().min(10),
    branchId: Joi.number(),
}).min(1);
