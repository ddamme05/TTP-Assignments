'use strict';

const bcrypt = require('bcryptjs');

module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe', 
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: await bcrypt.hash('password456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Post 1',
        body: 'Content 1',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {  
        title: 'Post 2',
        body: 'Content 2',
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('Comments', [
      {
        body: 'Comment 1',
        postId: 1, 
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Comment 2',
        postId: 2,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};