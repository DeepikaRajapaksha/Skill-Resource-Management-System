'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('personnel_skills', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      personnel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'personnel', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      skill_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skills', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      proficiency: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert'),
        allowNull: false,
        defaultValue: 'Beginner',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('personnel_skills');
  }
};
