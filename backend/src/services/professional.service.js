import * as ProfessionalTypeService from './professional-type.service';
// eslint-disable-next-line no-unused-vars
import { Professional, ProfessionalType } from '../models';

import {
  createSchema,
  updateSchema,
  validId
} from '../validators/schemas/professional';

/**
 * @type {function():Promise<Professional[]>} gets all professionals
 */
export const getAllProfessionals = async () => {
  /**
   * @type {Promise<Professional[]>}
   */
  const professionals = await Professional.findAll({
    include: [{ all: true }],
    order: [['id', 'ASC']]
  });
  return professionals;
};

/**
 * @type {function({
 *                name: string,
 *  professionalTypeId: number,
 *         phoneNumber: ?string,
 *         mailAddress: ?string
 *  }):Promise<Professional>
 * } creates new professional
 *
 * @throws {Joi.ValidationError} Validation error
 * @throws {Error} Not found error
 */
export const newProfessional = async (data = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = createSchema.validate(data);
  if (error) {
    throw new Error(error.message);
  }

  const { professionalTypeId } = data;
  /**
   * @type {Promise<ProfessionalType>}
   */
  const professionalType = await ProfessionalTypeService.getProfessionalType(
    professionalTypeId
  );
  if (professionalType === null) throw new Error('professionalType not found');

  /**
   * @type {Promise<Professional>}
   */
  const { dataValues: professional } = await Professional.create(data);
  return professional;
};

/**
 * @type {function(number, {
 * name: string,
 * professionalTypeId: number,
 * phoneNumber: ?string,
 * mailAddress: ?string
 * situation: boolean
 * }):Promise<Professional>} updates existing professional
 *
 *  @throws {Joi.ValidationError} Validation error
 *  @throws {Error} Not found error
 */
export const updateProfessional = async (id = 0, data = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = {
    ...updateSchema.validate(data),
    ...validId.validate(id)
  };
  if (error) {
    throw new Error(error.message);
  }

  /**
   * @type {Professional}
   */
  const professional = await Professional.findByPk(id);
  if (professional === null) throw new Error('professional not found');

  const { professionalTypeId } = data;
  if (professionalTypeId) {
    /**
     * @type {Promise<ProfessionalType>}
     */
    const professionalType = await ProfessionalTypeService.getProfessionalType(
      professionalTypeId
    );
    if (professionalType === null)
      throw new Error('professionalType not found');
  }

  data = { ...professional.dataValues, ...data };

  await Professional.update(
    { ...data, id },
    {
      where: { id: id }
    }
  );

  return data;
};

/**
 * @type {function(number): ''} destroys professional by id
 *
 * @throws {Error} Not found error
 */
export const deleteProfessional = async (id = 0) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = validId.validate(id);
  if (error) {
    throw new Error(error.message);
  }

  /**
   * @type {Promise<Professional>}
   */
  const professional = await Professional.findByPk(id);
  if (professional === null) throw new Error('professional not found');

  await Professional.destroy({ where: { id: id } });
  return '';
};

/**
 * @type {function(number): Promise<Professional>} get professional by id
 *
 * @throws {Error} Not found error
 */
export const getProfessional = async (id = 0) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = validId.validate(id);
  if (error) {
    throw new Error(error.message);
  }

  /**
   * @type {{dataValues: ProfessionalType}}
   */
  const professional = await Professional.findByPk(id, {
    include: [{ all: true }]
  });
  if (professional === null) throw new Error('professional not found');
  return professional.dataValues;
};
