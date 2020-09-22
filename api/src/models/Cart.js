const { DataTypes } = require("sequelize");

//S32: Crear modelo de Carrito
module.exports = (sequelize) => {
  sequelize.define("cart", {
    state: {
      type: DataTypes.ENUM({
        values: ["abierta", "procesando", "cancelada", "completa"],
      }),
    },
  });
};
