const server = require("express").Router();
const { User} = require("../db");

server.put("/promote/:id", (req, res) => {
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

  module.exports = server;