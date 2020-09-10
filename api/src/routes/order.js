const server = require("express").Router();
const { Order,Orderproduct } = require("../db");
const { Op } = require("sequelize");


/**S44 S44 : Crear ruta que retorne todas las ordenes
Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. */
server.get("/",(req,res)=>{
    const status = req.query.status;
    Order.findAll({
        where:{state:status},
        include: [{model: Orderproduct}]
    })
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

//S47 : Crear Ruta para modificar una Orden
// PUT /orders/:id
server.put("/:id", (req,res) => {
    Order.update({ 
      id: req.body.id,
      cantidad: req.body.cantidad
    }, { where: { id: req.params.id } })
    .then( () => res.status(200)
    .send("Orden id " + req.params.id + "actualizado satisfactoriamente"))
    .catch((err) => {
        res.status(400).json({ err });
    })
})

module.exports = server;