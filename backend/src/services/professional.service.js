import * as ProfessionalTypeService from './professional-type.service';
import { Professional } from '../models';

//get all professionals
export const getAllProfessionals = async () => {
  const data = await Professional.findAll({
    include: [{ all: true }],
    order: [['id', 'ASC']]
  });
  return data;
};

/**
 * @type {Function} creates new professional
 *
 * @param {Object} body
 *
 * @return {Promise<Professional>} A new Professional Entity
 */
export const newProfessional = async (body) => {
  const { professionalTypeId } = body;
  const professionalType = await ProfessionalTypeService.getProfessionalType(
    professionalTypeId
  );
  if (professionalType === null) throw new Error('professionalType not found');

  const data = await Professional.create(body);
  return data;
};

//update single professional
export const updateProfessional = async (id, body) => {
  const professional = await Professional.findByPk(id);
  if (professional === null) throw new Error('professional not found');

  const { professionalTypeId } = body;
  const professionalType = await ProfessionalTypeService.getProfessionalType(
    professionalTypeId
  );
  if (professionalType === null) throw new Error('professionalType not found');

  await Professional.update(
    { ...body, id },
    {
      where: { id: id }
    }
  );
  return body;
};

//delete single professional
export const deleteProfessional = async (id) => {
  const professional = await Professional.findByPk(id);
  if (professional === null) throw new Error('professional not found');

  await Professional.destroy({ where: { id: id } });
  return '';
};

//get single professional
export const getProfessional = async (id) => {
  const data = await Professional.findByPk(id, {
    include: [{ all: true }]
  });
  if (data === null) throw new Error('professional not found');
  return data;
};
