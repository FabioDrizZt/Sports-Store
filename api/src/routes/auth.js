const server = require("express").Router();
const { User} = require("../db");


// S67 : Crear ruta /promote
// POST /auth/promote/:id
// Promote convierte al usuario con ID: id a Admin.
server.put("/promote/:id", (req, res) => {
    User.update(
      {
        role: "admin",
      },
      { where: { id: req.params.id } }
    ).then(() => res.status(200).send("Usuario id: " + req.params.id + " actualizado satisfactoriamente")
    ).catch((err) => res.send(err));
  });

  //S63 : Crear ruta de Login
  //POST /auth/login
  server.post('/login', (req,res) => {
    User.create({
      email: req.body.email,
      password: req.body.password
    }).then(() => res.status(200))
    .catch((err) => res.send(err));
  })
// S64 : Crear ruta de logout
// POST /auth/logout
server.get("/logout", (req, res) => {
  req.logout();
  res.send("deslogueado");
});


  module.exports = server;