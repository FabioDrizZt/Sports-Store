const { DataTypes } = require("sequelize");

//Modelo de productos
module.exports = (sequelize) => {
  sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toLowerCase());
      },
    },
    size: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Este producto no tiene descripción.",
      set(value) {
        this.setDataValue("description", value.toLowerCase());
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://bagwellpromotions.com/wp-content/uploads/2014/03/sports.jpg",
    },
  });
};
