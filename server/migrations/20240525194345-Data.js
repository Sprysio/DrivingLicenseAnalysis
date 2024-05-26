'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Data" (
        id SERIAL PRIMARY KEY,
        "DATA_MC" VARCHAR(255) NOT NULL,
        "KOD_WOJ" VARCHAR(255) NOT NULL,
        "WOJEWODZTWO" VARCHAR(255) COLLATE "C" NOT NULL,
        "PLEC" VARCHAR(255) NOT NULL,
        "WIEK" INTEGER NOT NULL,
        "LICZBA" INTEGER NOT NULL
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Data');
  }
};
