const server = require("express").Router();
const { User, Order } = require("../db");
const passport = require("passport");
const check = require("./check.js");

/* S67 : Crear ruta /promote
 POST /auth/promote/:id
 Promote convierte al usuario con ID: id a Admin*/
 server.put("/promote/:id", check.isAuth, check.isAdmin, (req, res) => {
  User.update({ role: "admin" }, { where: { id: req.params.id } })
    .then((res) => res.status(200).send(res))
    .catch((err) => res.send(err));
});

/*S63 : Crear ruta de Login
POST /auth/login*/
server.post("/login", passport.authenticate("local"), function (req, res) {
  res.send(req.user);
});

/*S75 : Crear ruta de Login con Google
POST /auth/login/google*/
server.post('/login/google', (req, res) => {
  const { name, lastName, email, password, role } = req.body;
  User.findOrCreate({
    where: { email },
    defaults: { name, lastName, email, password, role }
  }).then(user => res.send(user[0]))
    .catch(err => res.send(err))
})

/* S64 : Crear ruta de logout
 POST /auth/logout*/
server.post("/logout", (req, res) => {
  req.logout();
  res.send("deslogueado");
});

/*S65 : Crear ruta /me
GET /auth/me 
Esta ruta tiene que devolver el usuario que está logeado, 
o 401 si no está logeado. */
server.get("/me", check.isAuth, function (req, res) {
  User.findOne({
    where: { id: req.user.id },
  })
    .then((usuario) => res.json(usuario))
    .catch((err) => res.status(401).json({ err }));
});

module.exports = server;
