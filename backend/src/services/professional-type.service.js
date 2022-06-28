import { ProfessionalType } from '../models';

//get all professionalTypes
export const getAllProfessionalTypes = async () => {
  const data = await ProfessionalType.findAll();
  return data;
};

//create new professionalType
export const newProfessionalType = async (body) => {
  const data = await ProfessionalType.create(body);
  return data;
};

//update single professionalType
export const updateProfessionalType = async (id, body) => {
  const professionalType = await ProfessionalType.findByPk(id);
  if (professionalType === null) throw new Error('professionalType not found');

  await ProfessionalType.update(
    { ...body, id },
    {
      where: { id: id }
    }
  );
  return body;
};

//delete single professionalType
export const deleteProfessionalType = async (id) => {
  const professionalType = await ProfessionalType.findByPk(id);
  if (professionalType === null) throw new Error('professionalType not found');

  await ProfessionalType.destroy({ where: { id: id } });
  return '';
};

//get single professionalType
export const getProfessionalType = async (id) => {
  const data = await ProfessionalType.findByPk(id);
  if (data === null) throw new Error('professionalType not found');
  return data;
};
