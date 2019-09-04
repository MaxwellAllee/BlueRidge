'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const promise1 =  queryInterface.addColumn('Pages', 'total', {type: Sequelize.INTEGER,allowNull: false});
   const promise2 = queryInterface.addColumn('Pages', 'grtotal', {type: Sequelize.INTEGER,allowNull: false});
   return Promise.all([promise1, promise2]);
    
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('totals');
  }
};