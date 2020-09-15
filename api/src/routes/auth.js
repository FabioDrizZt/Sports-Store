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

  module.exports = server;

  /*S65 : Crear ruta /me
  GET /auth/me 
  Esta ruta tiene que devolver el usuario que está logeado, 
  o 401 si no está logeado. */
  server.get("/me",(req,res)=>{
    return res.json(req.user);
  });