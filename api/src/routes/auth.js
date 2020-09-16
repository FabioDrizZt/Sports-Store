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
// S64 : Crear ruta de logout
// POST /auth/logout
server.get("/logout", (req, res) => {
  req.logout();
  res.send("deslogueado");
});
  /*S65 : Crear ruta /me
  GET /auth/me 
  Esta ruta tiene que devolver el usuario que está logeado, 
  o 401 si no está logeado. */
  server.get("/me",(req,res)=>{
    return res.json(req.user);
  });


  module.exports = server;
