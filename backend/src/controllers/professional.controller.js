import HttpStatus from 'http-status-codes';
import * as ProfessionalService from '../services/professional.service';

// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';

/**
 * Controller to get all professionals available
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next
 *
 * @return {Promise<Professional[]>} Array of Professionals
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
 * Controller to get a single professional
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next
 *
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
 * Controller to create a new professional
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next
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
 * Controller to update a professional
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next
 */
export const updateProfessional = async (req, res, next) => {
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
};

/**
 * Controller to delete a single professional
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next
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
