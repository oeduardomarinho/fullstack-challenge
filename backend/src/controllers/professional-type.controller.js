import HttpStatus from 'http-status-codes';
import * as ProfessionalTypeService from '../services/professional-type.service';

/**
 * Controller to get all professionalTypes available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
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
 * Controller to get a single professionalType
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
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
 * Controller to create a new professionalType
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
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
 * Controller to update a professionalType
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
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
 * Controller to delete a single professionalType
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
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
