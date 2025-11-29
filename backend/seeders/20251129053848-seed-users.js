'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert("users", [
      {
        email: "admin@example.com",
        // bcrypt hash of 123456
        password: "$2b$10$8V8I1xwPq6e5uP0I/9zHPuyNcd5MNCNLsZNDSSSXqoQZnIcXtNCiG",
        created_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  }
};
