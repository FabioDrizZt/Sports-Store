const server = require("express").Router();

server.get("/", (req, res, next) => {
    res.send(req.user);
    next();
  });


module.exports = server;