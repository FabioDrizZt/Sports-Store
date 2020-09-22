const { DataTypes } = require("sequelize");

//S31: Crear modelo de Carrito
module.exports = (sequelize) => {
  sequelize.define("cart", {
    state: {
      type: DataTypes.ENUM({
        values: ["abierta", "procesando", "cancelada", "completa"],
      }),
    },
  });
};
