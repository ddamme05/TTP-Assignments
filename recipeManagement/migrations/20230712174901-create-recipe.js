'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'Title must have a minimum length of 3 characters.'
          }
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [1, 500],
            msg: 'Description must have a maximum length of 500 characters.'
          }
        }
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [1, 1000],
            msg: 'Ingredients must have a maximum length of 1000 characters.'
          }
        }
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [1, 5000],
            msg: 'Instructions must have a maximum length of 5000 characters.'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes');
  }
};
