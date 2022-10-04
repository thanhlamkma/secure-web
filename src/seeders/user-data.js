'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "thanhlam@gmail.com",
        password: "123456",
        firstName: "Thanh",
        lastName: "Lâm",
        address: "Hà Nội",
        phone: "0987654321",
        gender: true,
        roleId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin@gmail.com",
        password: "admin",
        firstName: "",
        lastName: "Admin",
        address: "Hà Nội",
        phone: "0123456789",
        gender: false,
        roleId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
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
