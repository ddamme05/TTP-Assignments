'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Posts', 'author', 'authorId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Posts', 'authorId', 'author');
  }
};