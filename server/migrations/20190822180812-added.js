'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const promise1 =  queryInterface.addColumn('Pages', 'elevGain', {type:Sequelize.STRING,allowNull: false}, { after: 'blog' });
   const promise2 = queryInterface.addColumn('Pages', 'elevLoss', {type:Sequelize.STRING,allowNull: false}, {after: 'elevGain'});
   return Promise.all([promise1, promise2]);

  },
  down: (queryInterface, Sequelize) => {
    const promise1 = queryInterface.removeColumn('Pages', 'elevGain');
   const promise2 = queryInterface.removeColumn('Pages', 'elevLoss');
   return Promise.all([promise1, promise2]);
  }
};
