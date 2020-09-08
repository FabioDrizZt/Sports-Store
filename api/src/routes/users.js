const server = require("express").Router();
const { User, Order} = require("../db.js");

//S34 ruta para crear usuario
server.post("/",(req,res)=>{
    User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        DNI: req.body.DNI,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }).then(user => {res.status(200).send(user); 
      }).catch(err => res.send(err))
});

/**S44 S44 : Crear ruta que retorne todas las ordenes
Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. */
server.get("/orders",(req,res)=>{
  const status = req.query.status;
  Order.findAll({where:{state:status}})
  .then(orders=>{res.send(orders)})
  .catch(error=>res.send(error))
})

module.exports = server;