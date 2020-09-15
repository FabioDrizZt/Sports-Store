const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const userRouter = require("./users.js");
const orderRouter = require("./order.js");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);


// S67 : Crear ruta /promote
// POST /auth/promote/:id
// Promote convierte al usuario con ID: id a Admin.
router.put("/auth/promote/:id", (req, res) => {
    User.update(
      {
        role: "admin",
      },
      { where: { id: req.params.id } }
    ).then(() => res.status(200).send("Usuario id: " + req.params.id + " actualizado satisfactoriamente")
    ).catch((err) => res.send(err));
  });

// S64 : Crear ruta de logout
// POST /auth/logout
server.get("/auth/logout", (req, res) => {
  req.logout();
  res.send("deslogueado");
});

module.exports = router;
