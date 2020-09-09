const server = require("express").Router();
const { Order,Orderproduct } = require("../db");
const { Op } = require("sequelize");


//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
server.get ('/:id', (req, res) => {
    Order.findOne({
        where: {id: req.params.id},
        include: [{model: Orderproduct}]
    }) 
    .then((orders) => res.send(orders))
    .catch((e) => res.status(400).json(e))
})

module.exports = server;