'use strict';

const bcrypt = require('bcryptjs');

module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Smith',
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

    await queryInterface.bulkInsert('posts', [
      {
        title: '10 Tips for JavaScript Developers',
        body: 'This post shares useful tips for JS developers...', 
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My Favorite Books of 2022',
        body: 'This post lists my favorite books from the past year...',
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ]);

    await queryInterface.bulkInsert('comments', [
      {
        body: 'Great tips, thanks for sharing!',
        authorId: 2,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'I also loved that book, great list!',
        authorId: 1,
        postId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};