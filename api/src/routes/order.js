const server = require("express").Router();
const { Order,Orderproduct } = require("../db");
const { Op } = require("sequelize");


/**S44 S44 : Crear ruta que retorne todas las ordenes
Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. */
server.get("/orders",(req,res)=>{
    const status = req.query.status;
    Order.findAll({where:{state:status}})
    .then(orders=>{res.send(orders)})
    .catch(error=>res.send(error))
  })  


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