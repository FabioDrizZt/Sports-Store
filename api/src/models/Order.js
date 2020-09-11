const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo order
  sequelize.define('order', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },    
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 }
    }
  })
};
