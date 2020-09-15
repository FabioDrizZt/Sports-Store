require('dotenv').config();
const { Sequelize } = require('sequelize');
const crypto = require('crypto')
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, Cart, User, Order, Review } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
 Product.belongsToMany(Category, { through: "productcategory" });
 Category.belongsToMany(Product, { through: "productcategory" });

// Relacion User <--> Cart
User.hasMany(Cart);
Cart.belongsTo(User);

//S32 : Crear Modelo de Línea de Orden
// Cart.belongsToMany(Product, { through: Order });
// Product.belongsToMany(Cart, { through: Order });

Cart.hasMany(Order);
Order.belongsTo(Cart);
Product.hasMany(Order);
Order.belongsTo(Product);

//Relaciones del modelo Review
User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);

//-------------------------------funciones de encriptacion de User

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}
User.encryptPassword = function(plainText, salt) {
  return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
}
//salt es una clave unica de autenticacion
const setSaltAndPassword = user => {
  if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
  }
}
//cada vez que el usuario se crea o cambia su contraseña se genera un nuevo salt y automaticamente se encripta la contraseña
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

//chequear si la contraseña ingresada es la correcta, retorna true o false
User.prototype.correctPassword = function(enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}
//----------------------------------------------


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
