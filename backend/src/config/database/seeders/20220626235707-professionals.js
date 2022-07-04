'use strict';

/**
 * Function to update database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function up({ context: queryInterface }) {
  const created_at = new Date();
  const updated_at = new Date();

  /**
   * @type {Number[]} number - array of ids of professionalTypes
   */
  const professionalTypeIds = (
    await queryInterface.select(null, 'professional_types')
  ).map(
    /**
     * @param {number} id - id of professionalType
     * @return {number} id of professionalType
     */
    ({ id }) => id
  );

  /**
   * @type {Function} Gets random item from array professionalTypeIds
   * @return {number} id of professionalType
   */
  professionalTypeIds.random = () =>
    professionalTypeIds[Math.floor(Math.random() * professionalTypeIds.length)];

  await queryInterface.bulkInsert(
    'professionals',
    [
      'Felipe Monte do Nascimento',
      'Bruna Rodrigues dos Santos Fontes',
      'Arthur Mota Creston de Vasconcellos',
      'Alair Rodrigues da Silva',
      'Rafael Ramon Ferreira',
      'Thais Rodrigues Barbosa',
      'Andre da Conceicao',
      'Eric de Oliveira Alves',
      'Marciela Lima Monteiro',
      'Any Carolina Quintana Xavier',
      'Robert Costa do Nascimento',
      'Jorge Luis Ferreira dos Santos',
      'Diego da Paixao Santos',
      'Igor do Amaral',
      'Blaunielle de Assis Vieira'
    ].map((name) => ({
      name,
      mail_address: `${(([firstName, ...lastName]) =>
        `${firstName}.${lastName.pop()}@mail.com`)(
        name.toLowerCase().split(' ')
      )}`,
      professional_type_id: professionalTypeIds.random(),
      created_at,
      updated_at
    }))
  );
}

/**
 * Function to undo updates in database
 *
 * @param {{context: QueryInterface}} context
 *
 */
async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('professionals', null, {});
}

module.exports = { up, down };
