import Joi from '@hapi/joi';
import JoiPhoneValidator from 'joi-phone-number';
const JoiPhone = Joi.extend(JoiPhoneValidator);

export const createSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phoneNumber: JoiPhone.string()
    .phoneNumber({ defaultCountry: 'BR', strict: true })
    .allow(null),
  mailAddress: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null),
  professionalTypeId: Joi.number().positive().integer().not(null).required()
});

export const updateSchema = Joi.object({
  name: Joi.string().min(1),
  phoneNumber: JoiPhone.string()
    .phoneNumber({ defaultCountry: 'BR', strict: true })
    .allow(null),
  mailAddress: Joi.string()
    .email({ tlds: { allow: false } })
    .allow(null),
  professionalTypeId: Joi.number().positive().integer().not(null),
  situation: Joi.boolean()
});

export const validId = Joi.number()
  .positive()
  .integer()
  .required()
  .not(null)
  .error(() => new Error('"id" must be a positive number'));
