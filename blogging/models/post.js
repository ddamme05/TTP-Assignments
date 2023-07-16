'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { as: 'author'} );
      User.hasMany(models.Post);
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

    author: {
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