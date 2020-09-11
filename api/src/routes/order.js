const server = require("express").Router();
const { Cart,Order } = require("../db");

/**S44 S44 : Crear ruta que retorne todas las ordenes
Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status. */
server.get("/",(req,res)=>{
    const status = req.query.status;
    if(status===undefined){
        Order.findAll({   
            include: [{ model: Cart, where: { cartId: Order.id } }],
        // where:{id:Cart.cartId} //no funciona el include
        })
        .then(carts=>{res.send(carts)})
        .catch(error=>res.send(error))
    }else{
    Order.findAll({
        include: [{ model: Cart, where: { status: status } }]
    })
    .then(carts=>{res.send(carts)})
    .catch(error=>res.send(error))
}
  })  
//S46 : Crear Ruta que retorne una orden en particular. GET /orders/:id
server.get ('/:id', (req, res) => {
    Cart.findOne({
        where: {id: req.params.id},
        include: [{model: Order}]
    }) 
    .then((cart) => res.send(cart))
    .catch((e) => res.status(400).json(e))
})
//S47 : Crear Ruta para modificar una Orden
// PUT /orders/:id
server.put("/:id", (req,res) => {
    Order.update({ 
      amount: req.body.amount,
      price: req.body.price
    }, { where: { id: req.params.id } })
    .then( (order) => res.status(200).send(order))
    .catch((err) => {
        res.status(400).json({ err });
    })
})

module.exports = server;