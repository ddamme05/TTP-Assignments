'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('posts', 'updatedAt', {  
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('comments', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('comments', 'updatedAt', {
      type: Sequelize.DATE 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('posts', 'createdAt');
    await queryInterface.removeColumn('posts', 'updatedAt');

    await queryInterface.removeColumn('comments', 'createdAt'); 
    await queryInterface.removeColumn('comments', 'updatedAt');
  }
};