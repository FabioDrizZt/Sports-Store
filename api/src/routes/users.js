const server = require("express").Router();
const { User, Cart, Order, Product } = require("../db.js");

// -----> ***** GET ***** <-----
// S36 : Crear Ruta que retorne todos los Usuarios
// GET /users
server.get("/", (req, res) => {
  User.findAll({})
    .then((users) => { res.send(users); })
    .catch((err) => res.status(400).json({ err }));
});
//S39 : Crear Ruta que retorne todos los items del Carrito
// GET /users/:idUser/cart
server.get("/:idUser/cart", (req, res) => {
  const id = req.params.idUser;
  Cart.findOne({
    where: { userId: id, state: "open", },
  }).then((cart) => {
    Order.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }]
    }).then((orders) => res.send(orders))
      .catch((e) => res.status(400).json(e));
  })
});
// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios GET /users/:id/orders
server.get("/:id/orders", (req, res) => {
  const id = req.params.id;
  Cart.findAll({
    where: { userId: id },
    include: { model: Order },
  }).then((carts) => res.send(carts))
    .catch((e) => res.status(400).json(e));
});
// -----> ***** POST ***** <-----

// S38 : Crear Ruta para agregar Item al Carrito
// POST /users/:idUser/cart 
server.post("/:idUser/cart", (req, res) => {
  const id = req.params.idUser;
  Cart.findOrCreate({
    where: { userId: id, state: "open" },
    defaults: { userId: id, state: "open" },
  })
    .then((cart) => {
      Order.findOrCreate({
        where: {
          productId: req.body.productId,
          cartId: cart[0].id,
        },
        include: { model: Product },
        defaults: {
        productId: req.body.productId,
          cartId: cart[0].id,
          price: req.body.price,
          amount: req.body.amount,
        },
      }).then((resp) => { res.send(resp[0]); })
        .catch((error) => { res.send(error); });
    });
});
//S34 ruta para crear usuario
server.post("/", (req, res) => {
  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    DNI: req.body.DNI,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  }).then((user) => { res.status(200).send(user); })
    .catch((err) => res.send(err));
});

// -----> ***** PUT ***** <-----
// S35 : Crear Ruta para modificar Usuario
server.put("/:id", (req, res) => {
  User.update(
    {
      name: req.body.name,
      lastName: req.body.lastName,
      DNI: req.body.DNI,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    },
    { where: { id: req.params.id } }
  ).then(() => res.status(200).send("Usuario id: " + req.params.id + " actualizado satisfactoriamente")
  ).catch((err) => res.send(err));
});

// S41 : Crear Ruta para editar las cantidades del carrito
// PUT /users/:idUser/cart 
server.put("/:idUser/cart", (req, res) => {
  let cart = Cart.findOne({ where: { userId: req.params.idUser, state: "open" }, })
  let product = Product.findByPk(req.body.productId)
  Promise.all([cart, product])
    .then(values =>
      Order.update(
        { amount: req.body.amount, price: values[1].price * req.body.amount },
        { where: { cartId: values[0].id, productId: values[1].id } }
      )
    ).then(() => res.status(200).send("Cantidad modificada satisfactoriamente"))
    .catch((error) => { res.status(400).json(error); });
});
// -----> ***** DELETE ***** <-----
// S37 : Crear Ruta para eliminar Usuario DELETE /users/:id
server.delete("/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((deletedRecord) => {
    if (deletedRecord === 1)
      res.status(200).json({ message: "Se elimino el Usuario" });
    else res.status(400).json({ message: "Usuario no encontrado" });
  });
});

// S40 : Crear Ruta para vaciar el carrito
//
// DELETE /users/:idUser/cart/ 
//eliminar del carrito y de orders
server.delete("/:idUser/cart", (req, res) => {
  Cart.findOne({where: { userId: req.params.idUser, state: "open" }})     
      .then((cart)=>{
        Order.destroy({where:{cartId:cart.id}})
          .then((deletedRecord) => {
  if (deletedRecord > 0) res.status(200).json({ message: "Se eliminaron las orders asociada al carrito" });
          else res.status(400).json({ message: "orden no encontrada" });
        })
      })
      .catch(err=>res.send(err))
  });

module.exports = server;