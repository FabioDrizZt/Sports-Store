const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const usuario = sequelize.define('user', {
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
    },    
    {
      hooks: {
          beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          },
          beforeUpdate: (user) => {
            if(user.password.length < 10){
              user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
            }
          }
        },
  
      });
          usuario.prototype.validPassword = function (password) {
            return bcrypt.compareSync(password, this.password);          
          }
          return usuario;
        }
  

