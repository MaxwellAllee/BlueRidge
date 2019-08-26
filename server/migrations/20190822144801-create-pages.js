'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pageName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startingMiles: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      finishMiles: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      section: {
        type: Sequelize.STRING,
        allowNull: false
      },
      blog: {
        type: Sequelize.TEXT,
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pages');
  }
};