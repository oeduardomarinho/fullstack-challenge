import sequelize, { DataTypes } from '../config/database';

import Professional from '../models/professional';
import ProfessionalType from '../models/professional-type';

const models = {
  Professional: Professional(sequelize, DataTypes),
  ProfessionalType: ProfessionalType(sequelize, DataTypes)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

module.exports = models;
