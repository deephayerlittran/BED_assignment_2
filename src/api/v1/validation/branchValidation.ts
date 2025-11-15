import Joi from "joi";

export const createBranchSchema = Joi.object({
    name: Joi.string().min(2).required(),
    address: Joi.string().min(5).required(),
    phone: Joi.string().min(7).required(),
});

export const updateBranchSchema = Joi.object({
    name: Joi.string().min(2),
    address: Joi.string().min(5),
    phone: Joi.string().min(7),
});
