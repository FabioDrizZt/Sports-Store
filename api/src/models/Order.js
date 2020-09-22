const { DataTypes } = require("sequelize");

//S32: Crear modelo de linea de orden
module.exports = (sequelize) => {
  sequelize.define("order", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
  });
};
