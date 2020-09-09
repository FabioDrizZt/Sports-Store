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

// S36 : Crear Ruta que retorne todos los Usuarios
// GET /users
server.get("/", (req, res) => {
  User.findAll({
  }).then(users => { res.send(users)
  }).catch(err => res.status(400).json({ err })) 
});

// S37 : Crear Ruta para eliminar Usuario DELETE /users/:id
server.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(deletedRecord => {
      if (deletedRecord === 1) res.status(200).json({ message: "Se elimino el Usuario" });
      else res.status(404).json({ message: "Usuario no encontrado" });
    })
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

/*S38 : Crear Ruta para agregar Item al Carrito
POST /users/:idUser/cart */
server.post("/:idUser/cart", (req, res) => {
  const id = req.params.idUser;
  Order.findOrCreate({
    where: { userId: id, state: "open" },
    defaults: { userId: id, state: "open" },
  }).then((order) => {
    Orderproduct.findOrCreate({
      where: {
        productId: req.body.id,
        orderId: order.id,
        price: req.body.price,
        amount: req.body.amount,
      },
      defaults: {
        productId: req.body.id,
        orderId: order.id,
        price: req.body.price,
        amount: req.body.amount,
      },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((error) => {
        res.send(error);
      });
  });
});


module.exports = server;