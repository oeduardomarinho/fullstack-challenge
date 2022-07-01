import HttpStatus from 'http-status-codes';
// eslint-disable-next-line max-len
import * as ProfessionalTypeService from '../services/professional-type.service';

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to get all professionalTypes available
 */
export const getAllProfessionalTypes = async (req, res, next) => {
  try {
    const data = await ProfessionalTypeService.getAllProfessionalTypes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All professionalTypes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to get a single professionalType
 */
export const getProfessionalType = async (req, res, next) => {
  try {
    const data = await ProfessionalTypeService.getProfessionalType(
      req.params.id
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'ProfessionalType fetched successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = 404;
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to create a new professionalType
 */
export const newProfessionalType = async (req, res, next) => {
  try {
    const data = await ProfessionalTypeService.newProfessionalType(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'ProfessionalType created successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = 404;
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to update a professionalType
 */
export const updateProfessionalType = async (req, res, next) => {
  try {
    const data = await ProfessionalTypeService.updateProfessionalType(
      req.params.id,
      req.body
    );
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'ProfessionalType updated successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = 404;
    next(error);
  }
};

/**
 * @type {function(Request, Response, NextFunction):Response}
 * Controller to delete a single professionalType
 */
export const deleteProfessionalType = async (req, res, next) => {
  try {
    await ProfessionalTypeService.deleteProfessionalType(req.params.id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'ProfessionalType deleted successfully'
    });
  } catch (error) {
    if (/not found/.test(error.message)) error.code = 404;
    next(error);
  }
};
