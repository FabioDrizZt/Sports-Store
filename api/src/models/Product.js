const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, size: {
      type: DataTypes.STRING,
    }, description: {
      type: DataTypes.TEXT,
      defaultValue: "Este producto no tiene descripción."
    }, price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 }
    }, stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    }, image: {
      type: DataTypes.STRING,
      defaultValue: "https://bagwellpromotions.com/wp-content/uploads/2014/03/sports.jpg",
    }
  });
};
