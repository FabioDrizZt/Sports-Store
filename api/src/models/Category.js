const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },    
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Este producto no tiene descripción."
    }
  })
};
