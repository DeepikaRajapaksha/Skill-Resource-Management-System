'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        email: "admin@example.com",
        password: "$2b$10$4C4pvyp1t606J7bxG8dI5O98TvS6aKqsXE3Cm7aHZXA8Rg/fyxlIS", // hashed 12345
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", { email: "admin@example.com" });
  }
};
