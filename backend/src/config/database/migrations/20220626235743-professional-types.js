'use strict';

const { DataTypes } = require('sequelize');

/**
 * Function to update database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function up({ context: queryInterface }) {
  await queryInterface.createTable('professional_types', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    situation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: DataTypes.DATE
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
  await queryInterface.dropTable('professional_types');
}

module.exports = { up, down };
