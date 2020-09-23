const server = require("express").Router();

server.get("/",(req, res) => {
    res.send(req.user)
  });


module.exports = server;