//Middleware para autenticar si el usuario esta logeado
const isAuth = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.send('Tiene que iniciar sesion para acceder a esta ruta');
        res.redirect('/login');
    }
}
//Middleware para autenticar si el usuario es Administrador
const isAdmin = function (req, res, next) {
    if(req.user.role === "admin"){
      next();
    } else {
      res.send('Tiene que ser administrador para acceder a esta ruta');
      res.redirect('/login');
    }
  }

  module.exports = { isAdmin, isAuth };