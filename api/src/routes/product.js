const server = require("express").Router();
const { Product, Category, ProductCategory } = require("../db.js");
const { json } = require("body-parser");


server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});


server.post("/",(req,res) => {
	// if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.stock || !req.body.image) {
	// 	res.sendStatus(404);
	// }
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
})
server.post("/:idProducto/category/:idCategoria", (req, res) => {
  const id = req.params.idProducto;
  const idCategoria = req.params.idCategoria;
  product_category.create({ ProductId: id, CategoryId: idCategoria })
    .then((pc) => res.send(pc))
    .catch((err) => res.send(err));

});

server.delete("/:idProducto/category/:idCategoria", (req, res) => {
  product_category.destroy({
    where: { ProductId: req.params.id, CategoryId: req.params.idCategoria },
  }).then((deletedRecord) => {
    if (deletedRecord === 1) {
      res.status(200).json({ message: "Review cleared successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  });
});

server.post("/category", (req, res) => {
  //suponemos que la data viene por body
  Category.create({ name: req.body.name, description: req.body.description })
    .then((category) => res.send(category))
    .catch((err) => res.send(err));
});

server.post("/category",(req,res) => {
	//suponemos que la data viene por body
Category.create({name:req.body.name,description:req.body.description})
.then(category=>res.send(category))
.catch(err=>res.send(err))
})
//S19 : Crear Ruta para eliminar Categoria
server.delete("/category/:id", (req, res, next) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((deletedRecord) => {
      if (deletedRecord === 1) {
        res
          .status(200)
          .json({ message: "Su categoria fue eliminado satisfactoriamente." });
      } else {
        res.status(404).json({ message: "categoria no encontrado." });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });

});

//S20 : Crear ruta para Modificar Categoria
server.put("/category/:id", (req, res, next) => {
  Category.FindOne({
    where: { id: req.params.id },
  }).then((category) => {
    category
      .update({
        name: req.body.name,
        description: req.body.description,
      })
      .then((category) => {
        res.status(200).json({ category });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
});

//S22 : Crear Ruta que devuelva los productos de X categoria
server.get ('/category/:nombreCat', (req,res) => {  
  Category.FindOne({    
    where: {name: req.params.nombreCat},
  })
  .then((category) => {
    product_category.FindAll({      
      where: {CategoryId: category.id},
        include: [{ model: Product }, {model: Category}]
    }).then (productCategory => res.status(200).json(productCategory))    
  })
  .catch((error) => {
    res.status(400).json({ error });
  });
})

module.exports = server;
