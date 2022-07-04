import { ProfessionalType } from '../models';
import {
  createSchema,
  updateSchema,
  validId
} from '../validators/schemas/professional-type';

/**
 * @type {function():Promise<ProfessionalType[]>} gets all professionalTypes
 */
export const getAllProfessionalTypes = async () => {
  /**
   * @type {Promise<ProfessionalType[]>}
   */
  const professionalTypes = await ProfessionalType.findAll({
    order: [
      ['updatedAt', 'DESC'],
      ['description', 'ASC']
    ]
  });
  return professionalTypes;
};

/**
 * @type {function({description: string})
 * :Promise<Professional>} creates new professionalType
 *
 * @throws {Joi.ValidationError} Validation error
 * @throws {Error} Not found error
 */
export const newProfessionalType = async (data = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = createSchema.validate(data);
  if (error) {
    throw new Error(error.message);
  }

  /**
   * @type {{dataValues: ProfessionalType}}
   */
  const { dataValues: professionalType } = await ProfessionalType.create(data);
  return professionalType;
};

/**
 * @type {function(
 *  number,
 *  {
 *    description: string,
 *      situation: boolean
 *  }
 * )
 * :Promise<Professional>} updates existing professionalType
 *
 *  @throws {Joi.ValidationError} Validation error
 *  @throws {Error} Not found error
 */
export const updateProfessionalType = async (id = 0, data = {}) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = {
    ...updateSchema.validate(data),
    ...validId.validate(id)
  };
  if (error) {
    throw new Error(error.message);
  }

  /**
   * @type {{dataValues:ProfessionalType}}
   */
  const professionalType = await ProfessionalType.findByPk(id);
  if (professionalType === null) throw new Error('professionalType not found');

  data = { ...professionalType.dataValues, ...data, id };

  await ProfessionalType.update(
    { ...data },
    {
      where: { id: id }
    }
  );
  return data;
};

/**
 * @type {function(number): ''} destroys professionalType by id
 *
 * @throws {Error} Not found error
 */
export const deleteProfessionalType = async (id = 0) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = validId.validate(id);
  if (error) {
    throw error;
  }
  /**
   * @type {Promise<{dataValues:ProfessionalType}>}
   */
  const professionalType = await ProfessionalType.findByPk(id);
  if (professionalType === null) throw new Error('professionalType not found');

  await ProfessionalType.destroy({ where: { id: id } });
  return '';
};

/**
 * @type {function(number):Promise<ProfessionalType>} get professionalType by id
 *
 * @throws {Error} Not found error
 */
export const getProfessionalType = async (id = 0) => {
  // eslint-disable-next-line no-unused-vars
  const { error, _ } = validId.validate(id);
  if (error) {
    throw error;
  }
  /**
   * @type {{dataValues:ProfessionalType}}
   */
  const professionalType = await ProfessionalType.findByPk(id);
  if (professionalType === null) throw new Error('professionalType not found');
  return professionalType.dataValues;
};
