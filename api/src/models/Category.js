const { DataTypes } = require("sequelize");

//S5: Crear modelo de categorias
module.exports = (sequelize) => {
  sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Este producto no tiene descripción.",
    },
  });
};
