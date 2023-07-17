'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { as: 'author', foreignKey: 'authorId'} );
    }
  }

  Post.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false 
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  });
  return Post;
};