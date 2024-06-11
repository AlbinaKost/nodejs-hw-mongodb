import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email(),
    phoneNumber: Joi.number().required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phoneNumber: Joi.number(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
});
