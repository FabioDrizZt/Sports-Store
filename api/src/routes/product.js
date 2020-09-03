const server = require('express').Router();
const { Product,Category,ProductCategory } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		}).catch(next);
});

server.post("/",(req,res) => {
	if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.stock || !req.body.image) {
		res.sendStatus(404);
	}
	Product.create({
		name: req.body.name,
		size: req.body.size,
		description: req.body.description,
		price: req.body.price,
		stock: req.body.stock,
		image: req.body.image
	})
	.then(product => {
		res.status(201).send(product);
	})
	.catch(err => res.send(err))
});

server.post("/:idProducto/category/:idCategoria",(req,res) => {
	const id = req.params.idProducto;
	const idCategoria = req.params.idCategoria;
	ProductCategory.create({ProductId:id,CategoryId:idCategoria})
	.then(pc => res.send(pc))
	.catch(err => res.send(err))
})

server.delete("/:idProducto/category/:idCategoria",(req,res) => {
	ProductCategory.destroy({where:{ProductId:req.params.id,CategoryId:req.params.idCategoria}})
	.then(deletedRecord => {
		if (deletedRecord === 1) { res.status(200).json({ message: "Review cleared successfully" }); }
		else { res.status(404).json({ message: "Review not found" }); }
	})
})

server.post("/category",(req,res) => {
	//suponemos que la data viene por body
Category.create({name:req.body.name,description:req.body.description})
.then(category=>res.send(category))
.catch(err=>res.send(err))
});


module.exports = server;
