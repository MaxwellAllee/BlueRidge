'use strict';
module.exports = (sequelize, DataTypes) => {
  const boolean = sequelize.define('boolean', {
    firstName: DataTypes.STRING
  }, {});
  boolean.associate = function(models) {
    // associations can be defined here
  };
  return boolean;
};