'use strict';

const Sequelize = require('sequelize');

/**
 * Function to update database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function up({ context: queryInterface }) {
  await queryInterface.createTable('professionals', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    phoneNumber: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      field: 'phone_number',
      validate: {
        isNumeric: true
      }
    },
    mailAddress: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      field: 'mail_address',
      validate: { isEmail: true }
    },
    professionalTypeId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'professional_type_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: {
          tableName: 'professional_types',
          schema: 'public'
        },
        key: 'id'
      }
    },
    situation: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: Sequelize.DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: Sequelize.DataTypes.DATE
    }
  });
}

/**
 * Function to undo updates in database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function down({ context: queryInterface }) {
  await queryInterface.dropTable('professionals');
}

module.exports = { up, down };
