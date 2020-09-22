const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // El modelo cart
  sequelize.define('cart', {
    state: {
      type: DataTypes.ENUM({
        values: ['abierta', 'procesando', 'cancelada','completa']
      })
    },
  })
};
