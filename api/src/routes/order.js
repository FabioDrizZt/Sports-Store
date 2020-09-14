const server = require("express").Router();
const { Cart, Order } = require("../db");

// S44 : Crear ruta que retorne todas las ordenes
// Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. 
server.get("/", (req, res) => {
    const status = req.query.status;
    Cart.findAll({
        where: { state: status },
        include: [{ model: Order }]
    }).then(carts => { res.send(carts) })
        .catch(error => res.send(error))
})
//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
server.get('/:id', (req, res) => {
    Cart.findOne({
        where: { id: req.params.id },
        include: [{ model: Order }]
    }).then((cart) => res.send(cart))
        .catch((e) => res.status(400).json(e))
})

// Traer una orden
// GET /orders/:id
server.get('/order/:id', (req, res) => {
    Order.findOne({
        where: { id: req.params.id }
    }).then((order) => res.send(order))
        .catch((e) => res.status(400).json(e))
})

//S47 : Crear Ruta para modificar una Orden
// PUT /orders/:id
server.put("/:id", (req, res) => {
    Order.update({
        amount: req.body.amount,
        price: req.body.price
    }, { where: { id: req.params.id } }
    ).then((order) => res.status(200).send(order))
        .catch((err) => { res.status(400).json({ err }); })
})
//SXX : Crear Ruta para Cerrar un Carrito
// PATCH /orders/:id
server.patch("/:id", (req, res) => {
    Cart.update({
        state: "closed",
    }, { where: { id: req.params.id } }
    ).then((order) => res.status(200).send(order))
        .catch((err) => { res.status(400).json({ err }); })
})

// Eliminar una orden del carrito
// DELETE /orders/:id
server.delete("/:orderId", (req, res) => {
    Order.destroy({
        where: { id: req.params.orderId }
    }).then((deletedRecord) => {
        if (deletedRecord === 1) res.status(200).json({ message: "Se eliminó su orden del carrito" });
        else res.status(400).json({ message: "Orden no encontrada" });
    });
});

module.exports = server;