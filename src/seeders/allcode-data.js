'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Allcodes", [
      {
        key: "ad",
        type: "Admin",
        value: "admin",
      },
      {
        key: "st",
        type: "Student",
        value: "student",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
