const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    DNI: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
        
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail : true
        }
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    role: {
        type: DataTypes.ENUM({
            values: ['admin', 'user']
        })
      },
  })
};
