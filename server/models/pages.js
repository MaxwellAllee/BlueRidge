'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pages = sequelize.define('Pages', {
    pageName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    startingMiles: {
      type:DataTypes.INTEGER,
      allowNull: false},
    finishMiles: {
      type:DataTypes.INTEGER,
      allowNull: false},
    section: {
      type:DataTypes.STRING,
      allowNull: false},
    blog: DataTypes.TEXT,

  }, {});
  Pages.associate = function(models) {
    // associations can be defined here
  };
  return Pages;
};