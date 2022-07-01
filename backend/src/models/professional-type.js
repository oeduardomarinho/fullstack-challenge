'use strict';
import { Model } from 'sequelize';

/**
 * @type {function(Sequelize, DataTypes):ProfessionalType}
 */
export default (sequelize, DataTypes) => {
  class ProfessionalType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ProfessionalType.hasMany(models.Professional, {
        as: 'professionals',
        foreignKey: 'professionalTypeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  ProfessionalType.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      situation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      sequelize,
      underscored: true
    }
  );

  return ProfessionalType;
};
