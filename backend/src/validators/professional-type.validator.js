import HttpStatus from 'http-status-codes';
import {
  createSchema,
  updateSchema,
  validId
} from './schemas/professional-type';

export const newProfessionalTypeValidator = (req, res, next) => {
  const { error, value } = createSchema.validate(req.body);
  if (error) {
    const { message } = error;
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ code: HttpStatus.BAD_REQUEST, message });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const changeProfessionalTypeValidator = (req, res, next) => {
  const { error, value } = updateSchema.validate(req.body);
  if (error) {
    const { message } = error;
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ code: HttpStatus.BAD_REQUEST, message });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const professionalTypeIdValidator = (req, res, next) => {
  const { error, value } = validId.validate(req.params.id);
  if (error) {
    const { message } = error;
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ code: HttpStatus.BAD_REQUEST, message });
  } else {
    req.validatedBody = value;
    next();
  }
};
