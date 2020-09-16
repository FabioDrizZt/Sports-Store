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

  //S63 : Crear ruta de Login
  //POST /auth/login
  server.post('/login', (req,res) => {
    User.create({
      email: req.body.email,
      password: req.body.password
    }).then(() => res.status(200))
    .catch((err) => res.send(err));
  })


  module.exports = server;