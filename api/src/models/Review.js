const { DataTypes } = require("sequelize");

//S53: Crear Modelo de Reviews
module.exports = (sequelize) => {
  sequelize.define("review", {
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Este producto no tiene descripción.",
      set(value) {
        this.setDataValue("description", value.toLowerCase());
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
  });
};
