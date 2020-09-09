const server = require("express").Router();
const { User, Order, OrderProduct} = require("../db.js");

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


// S35 : Crear Ruta para modificar Usuario

server.put("/:id",(req,res)=>{
  User.update({
      name: req.body.name,
      lastName: req.body.lastName,
      DNI: req.body.DNI,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }, {where: { id: req.params.id }})
    .then( () => res.status(201)
    .send("Usuario id: " + req.params.id + " actualizado satisfactoriamente"))
    .catch(err => res.send(err))
});

/**S44 S44 : Crear ruta que retorne todas las ordenes
Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. */
server.get("/orders",(req,res)=>{
  const status = req.query.status;
  Order.findAll({where:{state:status}})
  .then(orders=>{res.send(orders)})
  .catch(error=>res.send(error))
})

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios GET /users/:id/orders
server.get("/:id/orders", (req,res) => {
  const id = req.params.id;
  Order.findAll({
    where: {     
      userId: id //Condición de Busqueda
    },
    include: {
      model: OrderProduct,
    },
  }) 
  .then((orders) => res.send(orders))
  .catch((e) => res.status(400).json(e))
})

module.exports = server;