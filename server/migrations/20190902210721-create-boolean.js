'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const promise1 =  queryInterface.addColumn('Pages', 'public', {type:Sequelize.Sequelize.BOOLEAN, allowNull: false, defaultValue: false}, { after: 'blog' });
   return Promise.all([promise1]);

  },
  down: (queryInterface, Sequelize) => {
    const promise1 = queryInterface.removeColumn('Pages', 'public');
   return Promise.all([promise1]);
  }
};