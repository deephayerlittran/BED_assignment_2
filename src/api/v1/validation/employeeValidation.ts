import Joi from "joi";

export const createEmployeeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    position: Joi.string().min(2).required(),
    branchId: Joi.string().required(),
});

export const updateEmployeeSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    position: Joi.string().min(2),
    branchId: Joi.string(),
});
