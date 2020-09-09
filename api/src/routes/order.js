const server = require("express").Router();
const { Order,Orderproduct } = require("../../db.js");
const { Op } = require("sequelize");
const Orderproduct = require("../models/Orderproduct.js");

//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
server.get ('/:id', (req, res) => {
    Order.findOne({
        where: {id: req.params.id},
        include: [{model: Orderproduct}]
    }) 
    .then((orders) => res.send(orders))
    .catch((e) => res.status(400).json(e))
})