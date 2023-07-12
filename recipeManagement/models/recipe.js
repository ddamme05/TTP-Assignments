'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // define association here
    }
  }

  Recipe.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [0, 500]
        }
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [0, 1000]
        }
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [0, 5000]
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Recipe',
      tableName: 'recipes',
    }
  );
``
  return Recipe;
};
