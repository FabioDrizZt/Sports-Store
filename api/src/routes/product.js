const server = require("express").Router();
const { Product, Category, product_category } = require("../db.js");
const { json } = require("body-parser");
const { Op } = require("sequelize");

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

server.get("/categories", (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories);
    })
    .catch(next);
});

server.post("/", (req, res) => {
  Product.create({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image,
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => res.send(err));
});

//S26 : Crear ruta para Modificar Producto
server.put("/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
  }).then((product) => {
    product
      .update({
        name: req.body.name,
        size: req.body.size,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
      })
      .then((category) => {
        res.status(200).json({ category });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
});

server.post("/:idProducto/category/:idCategoria", (req, res) => {
  const id = req.params.idProducto;
  const idCategoria = req.params.idCategoria;
  product_category
    .create({ productId: id, categoryId: idCategoria })
    .then((pc) => res.send(pc))
    .catch((err) => res.send(err));
});

server.delete("/:idProducto/category/:idCategoria", (req, res) => {
  product_category
    .destroy({
      where: {
        productId: req.params.idProducto,
        categoryId: req.params.idCategoria,
      },
    })
    .then((deletedRecord) => {
      if (deletedRecord === 1) {
        res
          .status(200)
          .json({ message: "Se elimino la categoria al producto" });
      } else {
        res.status(404).json({ message: "Categoria no encontrada" });
      }
    });
});

server.post("/category", (req, res) => {
  //suponemos que la data viene por body
  Category.create({ name: req.body.name, description: req.body.description })
    .then((category) => res.send(category))
    .catch((err) => res.send(err));
});

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
  Category.findOne({
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

//S22 : Crear Ruta que devuelva los productos de X categoria    *******Falla*********
server.get("/category/:nombreCat", (req, res) => {
  Category.findOne({
    where: { name: req.params.nombreCat },
  })
    .then((category) => {
      product_category
        .findAll({
          where: { categoryId: category.id },
          //  include: [{ model: Category }]
        })
        .then((productCategory) => res.status(200).json(productCategory));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

//S23: Crear ruta que retorne productos segun el keyword de búsqueda
// /search?query=valor
server.get("/search", (req, res) => {
  Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + req.query.query + "%" } },
        { description: { [Op.like]: "%" + req.query.query + "%" } },
      ],
    },
  })
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});

//S24 : Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
//GET /products/:id
//Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).
server.get("/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
  })
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = server;
