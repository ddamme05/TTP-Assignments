'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Posts', 'updatedAt', {  
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Comments', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Comments', 'updatedAt', {
      type: Sequelize.DATE 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'createdAt');
    await queryInterface.removeColumn('Posts', 'updatedAt');

    await queryInterface.removeColumn('Comments', 'createdAt'); 
    await queryInterface.removeColumn('Comments', 'updatedAt');
  }
};