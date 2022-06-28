import HttpStatus from 'http-status-codes';
import Joi from '@hapi/joi';
import JoiPhoneValidator from 'joi-phone-number';
const JoiPhone = Joi.extend(JoiPhoneValidator);

export const newProfessionalValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    phoneNumber: JoiPhone.string()
      .phoneNumber({ defaultCountry: 'BR', strict: true })
      .allow(null),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .allow(null),
    professionalTypeId: Joi.number().positive().integer().not(null).required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    error.code = HttpStatus.BAD_REQUEST;
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

export const changeProfessionalValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1),
    phoneNumber: JoiPhone.string()
      .phoneNumber({ defaultCountry: 'BR', strict: true })
      .allow(null),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .allow(null),
    professionalTypeId: Joi.number().positive().integer().not(null),
    situation: Joi.boolean()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    error.code = HttpStatus.BAD_REQUEST;
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
