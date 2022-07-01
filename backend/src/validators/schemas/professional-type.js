import Joi from '@hapi/joi';

export const createSchema = Joi.object({
  description: Joi.string().min(1).required().not(null)
});

export const updateSchema = Joi.object({
  description: Joi.string().min(1).not(null),
  situation: Joi.boolean()
}).not(null);

export const validId = Joi.number()
  .positive()
  .integer()
  .required()
  .not(null)
  .error(() => new Error('"id" must be a positive number'));
