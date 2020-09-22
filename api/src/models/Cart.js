const { DataTypes } = require("sequelize");

//Modelo de Carrito
module.exports = (sequelize) => {
  sequelize.define("cart", {
    state: {
      type: DataTypes.ENUM({
        values: ["abierta", "procesando", "cancelada", "completa"],
      }),
    },
  });
};
