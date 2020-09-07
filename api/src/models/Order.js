const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // El modelo order
  sequelize.define('order', {
    state: {
      type: DataTypes.ENUM({
        values: ['open', 'closed', 'cancelled']
      })
    },
  })
};
