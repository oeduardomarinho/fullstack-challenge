'use strict';
import { Model } from 'sequelize';
/**
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - DataTypes interface
 */
export default (sequelize, DataTypes) => {
  class Professional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Professional.belongsTo(models.ProfessionalType, {
        as: 'type',
        foreignKey: 'professionalTypeId'
      });
    }
  }

  Professional.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: true
        }
      },
      mailAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true }
      },
      professionalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
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

  return Professional;
};
