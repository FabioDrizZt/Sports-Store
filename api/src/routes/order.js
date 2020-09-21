const server = require("express").Router();
const { Cart, Order } = require("../db");
const check = require("./check.js");

// S44 : Crear ruta que retorne todas las ordenes
// Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. 
server.get("/", check.isAuth, check.isAdmin, (req, res) => {
    const status = req.query.status;
    Cart.findAll({
        where: { state: status },
        include: [{ model: Order }]
    }).then(carts => { res.send(carts) })
        .catch(error => res.send(error))
})
//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
server.get('/:id', check.isAuth, (req, res) => {
    Cart.findOne({
        where: { id: req.params.id },
        include: [{ model: Order }]
    }).then((cart) => res.send(cart))
        .catch((e) => res.status(400).json(e))
})

// Traer una orden
// GET /orders/:id
server.get('/:id', check.isAuth, (req, res) => {
    Order.findOne({
        where: { id: req.params.id }
    }).then((order) => res.send(order))
        .catch((e) => res.status(400).json(e))
})

//S47 : Crear Ruta para modificar una Orden
// PUT /orders/:id
server.put("/:id", check.isAuth, check.isAdmin, (req, res) => {
    console.log(req.body.state)
    Cart.findOne({ where: { id: req.params.id } })
    .then(cart => {
      cart.update({
       state:req.body.state
      }).then((c) => res.status(200).json(c))
    })
    .catch((error) => { res.status(400).json(error); })
})
//SXX : Crear Ruta para Cerrar un Carrito
// PATCH /orders/:id
server.patch("/:id", check.isAuth, (req, res) => {
    Cart.update({
        state: "completa",
    }, { where: { id: req.params.id } }
    ).then((order) => res.status(200).send(order))
        .catch((err) => { res.status(400).json({ err }); })
})

// Eliminar una orden del carrito
// DELETE /orders/:id
server.delete("/:orderId", check.isAuth, (req, res) => {
    Order.destroy({
        where: { id: req.params.orderId }
    }).then((deletedRecord) => {
        if (deletedRecord === 1) res.status(200).json({ message: "Se eliminó su orden del carrito" });
        else res.status(400).json({ message: "Orden no encontrada" });
    });
});

module.exports = server;