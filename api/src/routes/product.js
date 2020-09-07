const server = require("express").Router();
const { Product, Category, Product_category } = require("../db.js");
const { Op } = require("sequelize");

// S21 : Crear ruta que devuelva todos los productos
server.get("/", (req, res, next) => {
  Product_category.findAll({
    include: [{ model: Category }, { model: Product }]
  }).then((product_category) => { res.send(product_category); })
    .catch(err => res.send(err))
});
// S21 : Crear ruta que devuelva todas las categories
server.get("/categories", (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories);
    }).catch(err => res.send(err))
});
//S22 : Crear Ruta que devuelva los productos de X categoria    *******Falla*********
// "GET /products/categoria/:nombreCat
// Retorna todos los productos de {nombreCat} Categoría."
server.get("/category/:nombreCat", (req, res) => {
  Category.findOne({
    where: { name: req.params.nombreCat },
  }).then((category) => {
    Product_category.findAll({
      where: { categoryId: category.id },
      include: [{ model: Category }, { model: Product }]
    }).then((pc) => res.status(200).json(pc));
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

//S23: Crear ruta que retorne productos segun el keyword de búsqueda
// /search?query=valor
server.get("/search", (req, res) => {
  Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + req.query.query.toLowerCase() + "%" } },
        { description: { [Op.like]: "%" + req.query.query.toLowerCase() + "%" } },
      ],
    },
  }).then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});
//S24 : Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
//GET /products/:id
//Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).
server.get("/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
  }).then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});
// S17 : Crear ruta para agregar categorias de un producto.
// POST /products/:idProducto/category/:idCategoria
// Agrega la categoria al producto.
server.post("/", (req, res) => {
  Product.create({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image
  }).then(product => {
    res.status(201).send(product); // hola victor
  }).catch(err => res.send(err))
});
// S18 : Crear ruta para crear/agregar Categoria
// POST /products/category/
server.post("/category", (req, res) => {
  Category.create({ name: req.body.name, description: req.body.description })
    .then((category) => res.send(category))
    .catch((err) => res.send(err));
});
// S17 : Crear ruta para agregar categorias de un producto.
// POST /products/:idProducto/category/:idCategoria
// Agrega la categoria al producto.
server.post("/:idProducto/category/:idCategoria", (req, res) => {
  const id = req.params.idProducto;
  const idCategoria = req.params.idCategoria;
  Product_category.create({ productId: id, categoryId: idCategoria })
    .then((pc) => res.send(pc))
    .catch((err) => res.send(err));
});
//S26 : Crear ruta para Modificar Producto
// PUT /products/:id
// Modifica el producto con id: id. Retorna 400 si los campos enviados no son correctos.
// Retorna 200 si se modificó con exito, y retorna los datos del producto modificado.
server.put("/:id", (req, res) => {
  console.log(req.body)
  Product.update({
    name: req.body.name,
    size: req.body.size,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image},{where:{ id: req.params.id }})
  .then(()=>res.status(201).send("Producto id "+req.params.id+" actualizado"))
  .catch((error) => {res.status(400).json( error );    
  });
});
//S20 : Crear ruta para Modificar Categoria
// PUT /products/category/:id
server.put("/category/:id", (req, res, next) => {
  Category.findOne({
    where: { id: req.params.id },
  }).then((category) => {
    category.update({
      name: req.body.name,
      description: req.body.description,
    }).then((category) => { res.status(200).json({ category }); })
      .catch((error) => { res.status(400).json({ error }); });
  });
});
// S17 : Crear ruta para sacar categorias de un producto.
// DELETE /products/:idProducto/category/:idCategoria
// Elimina la categoria al producto.
server.delete("/:idProducto/category/:idCategoria", (req, res) => {
  Product_category.destroy({
    where: {
      productId: req.params.idProducto,
      categoryId: req.params.idCategoria,
    },
  }).then((deletedRecord) => {
    if (deletedRecord === 1) res.status(200).json({ message: "Se elimino la categoria al producto" });
    else res.status(404).json({ message: "Categoria no encontrada" });
  });
});
// S27 eliminar un producto DELETE /products/:id
// Retorna 200 si se elimino con exito.
server.delete("/:id", (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(deletedRecord => {
      if (deletedRecord === 1) res.status(200).json({ message: "Se elimino el producto" });
      else res.status(404).json({ message: "Producto no encontrado" });
    })
})
//S19 : Crear Ruta para eliminar Categoria
// DELETE /products/category/:id
server.delete("/category/:id", (req, res, next) => {
  Category.destroy({
    where: { id: req.params.id },
  }).then((deletedRecord) => {
    if (deletedRecord === 1) res.status(200).json({ message: "Su categoria fue eliminado satisfactoriamente." });
    else res.status(404).json({ message: "categoria no encontrado." });
  }).catch((error) => { res.status(500).json(error); });
});

module.exports = server;
