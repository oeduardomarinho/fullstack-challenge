import HttpStatus from 'http-status-codes';
import Joi from '@hapi/joi';

export const newProfessionalTypeValidator = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(1).required().not(null)
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

export const changeProfessionalTypeValidator = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(1).required().not(null),
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
