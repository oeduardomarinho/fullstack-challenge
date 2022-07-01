import HttpStatus from 'http-status-codes';
import * as ProfessionalService from '../services/professional.service';

// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to get all professionals available
 */
export const getAllProfessionals = async (req, res, next) => {
  try {
    const data = await ProfessionalService.getAllProfessionals();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All professionals fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to get a single professional
 */
export const getProfessional = async (req, res, next) => {
  try {
    const data = await ProfessionalService.getProfessional(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Professional fetched successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = HttpStatus.NOT_FOUND;
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to create a new professional
 */
export const newProfessional = async (req, res, next) => {
  try {
    const data = await ProfessionalService.newProfessional(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Professional created successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = HttpStatus.NOT_FOUND;
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to update a professional
 */
export const updateProfessional = async (err, req, res, next) => {
  if (!err) {
    try {
      const data = await ProfessionalService.updateProfessional(
        req.params.id,
        req.body
      );
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Professional updated successfully'
      });
    } catch (error) {
      if (/not found/.test(error.message)) error.code = HttpStatus.NOT_FOUND;

      next(error);
    }
  }
  next(err);
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to delete a single professional
 */
export const deleteProfessional = async (req, res, next) => {
  try {
    await ProfessionalService.deleteProfessional(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Professional deleted successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = HttpStatus.NOT_FOUND;
    next(error);
  }
};
