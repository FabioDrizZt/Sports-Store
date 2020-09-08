const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderproduct', {
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
