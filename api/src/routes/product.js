const server = require('express').Router();
const { Product,Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post("/category",(req,res)=>{
	//suponemos que la data viene por body
Category.create({name:req.body.name,description:req.body.description})
.then(category=>res.send(category))
.catch(err=>res.send(err))
})

module.exports = server;
