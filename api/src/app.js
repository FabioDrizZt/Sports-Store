const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const server = express();
// const cors = require ('cors');
// Importamos passport para autenticar
const passport = require('passport');
const { User } = require('./db.js');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
// Definimos la estrategia para autenticar
passport.use(new Strategy(
  function(username, password, done) {
    User.findOne({
      where: { email: username }
  }).then((user) => {
    if(!user){
      return done(null, false, { message: 'Incorrect email.' });
    }
    if(user.validPassword(password)===false) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
  .catch(err => {
    return done(err);
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: { id: id }
  }).then((user) => {
    done(null, user);
  })
  .catch(err => {
    return done(err);
  })
});

// La cookie con una semana de duración 
server.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesion y para debuggear 
server.use((req, res, next) => {
  console.log(req.session);
  console.log(req.sessionStore.sessions);
  next();
});


server.name = 'API';
// server.use (cors ());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
server.use('/', routes);
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
